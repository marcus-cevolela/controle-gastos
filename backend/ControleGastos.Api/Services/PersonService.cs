namespace ControleGastos.Api.Services;

using ControleGastos.Api.DTOs.People;
using ControleGastos.Api.Models;
using ControleGastos.Api.Data;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Responsável pelas regras de negócio das pessoas.
/// </summary>
public class PersonService : IPersonService
{
    private readonly AppDbContext _context;

    public PersonService (AppDbContext context)
    {
        _context = context;
    }


    /// <summary>
    /// Cria uma nova pessoa
    /// </summary>
    public async Task<Person> CreateAsync(CreatePersonDto createPerson)
    {
        // Converte o DTO recebido em uma entidade.
        Person person = new Person
        {
            Name=createPerson.Name,
            Age=createPerson.Age
        };

        _context.People.Add(person);
        await _context.SaveChangesAsync();
        return person;
    }

    /// <summary>
    /// Retorna todas as pessoas cadastradas.
    /// </summary>
    public async Task<List<Person>> GetAllAsync()
    {
        var people = await _context.People.ToListAsync();
        return people;
    }

    /// <summary>
    /// Remove uma pessoa pelo identificador.
    /// </summary>
    public async Task DeleteAsync(int id)
    {
        var person = await _context.People.FindAsync(id);

        if (person is null)
        {
            throw new KeyNotFoundException ("Pessoa não encontrada");
        }
        
        _context.People.Remove(person);
        await _context.SaveChangesAsync();
    }
}