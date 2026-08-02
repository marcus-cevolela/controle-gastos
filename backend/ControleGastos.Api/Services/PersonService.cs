namespace ControleGastos.Api.Services;

using ControleGastos.Api.DTOs.People;
using ControleGastos.Api.Models;
using ControleGastos.Api.Data;
using Microsoft.EntityFrameworkCore;

public class PersonService : IPersonService
{
    private readonly AppDbContext _context;

    public PersonService (AppDbContext context)
    {
        _context = context;
    }

    public async Task<Person> CreateAsync(CreatePersonDto createPerson)
    {
        Person person = new Person
        {
            Name=createPerson.Name,
            Age=createPerson.Age
        };

        _context.People.Add(person);
        await _context.SaveChangesAsync();
        return person;
    }

    public async Task<List<Person>> GetAllAsync()
    {
        var people = await _context.People.ToListAsync();
        return people;
    }

    public async Task DeleteAsync(int id)
    {
        var person = await _context.People.FindAsync(id);

        if (person is null)
        {
            throw new KeyNotFoundException ("O id não foi encontrado");
        }
        
        _context.People.Remove(person);
        await _context.SaveChangesAsync();
    }
}