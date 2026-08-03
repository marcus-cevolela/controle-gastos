namespace ControleGastos.Api.Services;

using ControleGastos.Api.DTOs.Transactions;
using ControleGastos.Api.Models;
using ControleGastos.Api.Data;
using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Enums;

/// <summary>   
/// Responsável pelas regras de negócio das transações.
/// </summary>
public class TransactionService : ITransactionService
{
    private readonly AppDbContext _context;

    public TransactionService (AppDbContext context)
    {
        _context = context;
    }
    
    /// <summary>
    /// Cria uma nova transação.
    /// </summary>
    public async Task<Transaction> CreateAsync(CreateTransactionDto createTransaction)
    {
        var person = await _context.People.FindAsync(createTransaction.PersonId);

        if (person is null)
        {
            throw new KeyNotFoundException ("Pessoa não encontrada.");
        }

        // Menores de idade só podem cadastrar despesas.
        if (person.Age < 18 && createTransaction.Type == TransactionType.Receita)
        {
            throw new InvalidOperationException("Menores de idade só podem cadastrar despesas.");
        }

        // Converte o DTO recebido em uma entidade.
        Transaction transaction = new Transaction
        {
            Description = createTransaction.Description,
            Value = createTransaction.Value,
            Type = createTransaction.Type,
            PersonId = person.Id
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }

    /// <summary>
    /// Retorna todas as transações cadastradas.
    /// </summary>
    public async Task<List<Transaction>> GetAllAsync()
    {
        var transactions = await _context.Transactions.ToListAsync();
        return transactions;
    }

    /// <summary>
    /// Remove uma transação pelo identificador.
    /// </summary>
    public async Task DeleteAsync(int id)
    {
        var transaction = await _context.Transactions.FindAsync(id);

        if (transaction is null)
        {
            throw new KeyNotFoundException("Transação não encontrada.");
        }
        
        _context.Transactions.Remove(transaction);
        await _context.SaveChangesAsync();
    }

}