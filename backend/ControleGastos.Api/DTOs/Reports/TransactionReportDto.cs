using ControleGastos.Api.Enums;

namespace ControleGastos.Api.DTOs.Reports;

/// <summary>
/// Representa uma transação dentro de um relatório.
/// </summary>
public class TransactionReportDto
{
    public string Description { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public TransactionType Type { get; set; }
    public int Id { get; set; }

}