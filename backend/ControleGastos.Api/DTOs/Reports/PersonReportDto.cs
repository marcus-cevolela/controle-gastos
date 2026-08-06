namespace ControleGastos.Api.DTOs.Reports;

/// <summary>
/// Representa o relatório financeiro detalhado de uma pessoa.
/// </summary>
public class PersonReportDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
    public List<TransactionReportDto> Transactions { get; set; } = [];
}