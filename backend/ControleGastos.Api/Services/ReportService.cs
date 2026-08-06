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

        //calcula os totais gerais do relatório
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

    /// <summary>
    /// Gera o relatório financeiro detalhado de uma pessoa.
    /// </summary>
    public async Task<PersonReportDto> GetPersonReportAsync(int personId)
    {
        //busca a pessoa junto com todas as suas transações
        var person = await _context.People
        .Include(person => person.Transactions)
        .FirstOrDefaultAsync(p => p.Id == personId);

        //verifica se a pessoa existe antes de gerar o relatório
        if (person is null)
        {
            throw new KeyNotFoundException("Pessoa não encontrada.");
        }

        //calcula o total de receitas da pessoa
        var totalReceitas = person.Transactions
            .Where(transaction => transaction.Type == TransactionType.Receita)
            .Sum(transaction => transaction.Value);

        //calcula o total de despesas da pessoa
        var totalDespesas = person.Transactions
            .Where(transaction => transaction.Type == TransactionType.Despesa)
            .Sum(transaction => transaction.Value);
            
        //calcula o saldo final da pessoa
        var saldoLiquido = totalReceitas - totalDespesas;

        //converte as transações da entidade para o DTO utilizado no relatório
        var transactionReports = person.Transactions
        .Select(transaction =>
        {
            return new TransactionReportDto
            {
                Description = transaction.Description,
                Value = transaction.Value,
                Type= transaction.Type, 
            };
        })
        .ToList();

        //monta e retorna o relatório completo da pessoa
        return new PersonReportDto
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age,
            TotalReceitas = totalReceitas,
            TotalDespesas = totalDespesas ,
            Saldo = saldoLiquido ,
            Transactions = transactionReports
        };
    }
}