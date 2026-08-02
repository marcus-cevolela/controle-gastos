namespace ControleGastos.Api.Services;

using ControleGastos.Api.DTOs.People;
using ControleGastos.Api.Models;
using System.Threading.Tasks;

public interface IPersonService
{
    Task<Person> CreateAsync(CreatePersonDto createPerson);
    Task<List<Person>> GetAllAsync();
    Task DeleteAsync(int id);
}