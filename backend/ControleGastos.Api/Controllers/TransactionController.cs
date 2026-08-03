using ControleGastos.Api.DTOs.Transactions;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        public TransactionsController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var transactions = await _transactionService.GetAllAsync();
            return Ok(transactions);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateTransactionDto createTransaction)
        {
            var transaction = await _transactionService.CreateAsync(createTransaction);
            return Created($"{Request.Path}/{transaction.Id}", transaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await _transactionService.DeleteAsync(id);
            return NoContent();
        }
    }
}

