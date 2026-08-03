namespace ControleGastos.Api.Services;

using ControleGastos.Api.DTOs.Transactions;
using ControleGastos.Api.Models;
using System.Threading.Tasks;

public interface ITransactionService
{
    Task<Transaction> CreateAsync(CreateTransactionDto createTransaction);
    Task<List<Transaction>> GetAllAsync();
    Task DeleteAsync(int id);
}