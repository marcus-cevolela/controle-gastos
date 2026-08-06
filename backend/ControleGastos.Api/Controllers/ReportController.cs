using ControleGastos.Api.DTOs.Reports;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;
        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        /// <summary>
        /// Gera o relatório com os totais de cada pessoa e o total geral.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetReportAsync()
        {
            var report = await _reportService.GetReportAsync();
            return Ok(report);
        }

        /// <summary>
        /// Retorna o relatório financeiro detalhado de uma pessoa.
        /// </summary>
        [HttpGet("person/{personId}")]
        public async Task<IActionResult> GetPersonReportAsync(int personId)
        {
            var personReport = await _reportService.GetPersonReportAsync(personId);
            return Ok(personReport);
        }

    }
}

