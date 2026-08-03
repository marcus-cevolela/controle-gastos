namespace ControleGastos.Api.Services;

using ControleGastos.Api.DTOs.Reports;
using System.Threading.Tasks;

public interface IReportService
{
    Task<ReportDto> GetReportAsync();
}