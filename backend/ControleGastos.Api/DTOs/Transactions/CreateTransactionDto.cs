namespace ControleGastos.Api.DTOs.Transactions;

using ControleGastos.Api.Enums;

public class CreateTransactionDto
{
    public string Description { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public TransactionType Type { get; set; }
    public int PersonId { get; set; }
}