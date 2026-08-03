namespace ControleGastos.Api.Services;

using ControleGastos.Api.DTOs.Reports;
using ControleGastos.Api.Data;
using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Enums;

/// <summary>
/// Responsável por gerar o relatório geral de gastos.
/// </summary>
public class ReportService : IReportService
{
    private readonly AppDbContext _context;

    public ReportService(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Gera o relatório com os totais de cada pessoa e o total geral.
    /// </summary>
    public async Task<ReportDto> GetReportAsync()
    {
        var people = await _context.People
        .Include(person => person.Transactions)
        .ToListAsync();

        // Calcula os totais de cada pessoa a partir das transações cadastradas.
        var peopleSummary = people
        .Select(person =>
        {
            var totalReceitas = person.Transactions
                .Where(transaction => transaction.Type == TransactionType.Receita)
                .Sum(transaction => transaction.Value);

            var totalDespesas = person.Transactions
                .Where(transaction => transaction.Type == TransactionType.Despesa)
                .Sum(transaction => transaction.Value);

            return new PersonSummaryDto
            {
                Id = person.Id,
                Name = person.Name,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas   
            };
        })
        .ToList();

        var totalReceitas = peopleSummary.Sum(person => person.TotalReceitas);

        var totalDespesas = peopleSummary.Sum(person => person.TotalDespesas);

        var saldoLiquido = totalReceitas - totalDespesas;

        return new ReportDto
        {
            People = peopleSummary,
            TotalReceitas = totalReceitas,
            TotalDespesas = totalDespesas,
            SaldoLiquido = saldoLiquido
        };
    }
}