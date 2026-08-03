namespace ControleGastos.Api.DTOs.Reports;

/// <summary>
/// Representa o resumo financeiro de uma pessoa.
/// </summary>
public class PersonSummaryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}