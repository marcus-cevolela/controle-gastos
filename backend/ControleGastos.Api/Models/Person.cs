namespace ControleGastos.Api.Models;

/// <summary>
/// Representa uma pessoa cadastrada no sistema e suas transações.
/// </summary>
public class Person
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public List<Transaction> Transactions { get; set; } = [];
}

