namespace ControleGastos.Api.Models;

using ControleGastos.Api.Enums;
using System.Text.Json.Serialization;

/// <summary>
/// Representa uma transação financeira vinculada a uma pessoa.
/// </summary>
public class Transaction
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public TransactionType Type { get; set; }
    public int PersonId { get; set; }
    [JsonIgnore]
    public Person Person { get; set; } = null!;
}