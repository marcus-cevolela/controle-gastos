namespace ControleGastos.Api.DTOs.Reports;

/// <summary>
/// Representa o relatório geral de gastos.
/// </summary>
public class ReportDto
{
    public List<PersonSummaryDto> People { get; set; } = [];

    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal SaldoLiquido { get; set; }
}