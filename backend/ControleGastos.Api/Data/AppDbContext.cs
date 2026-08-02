namespace ControleGastos.Api.Data;

using Microsoft.EntityFrameworkCore;

using ControleGastos.Api.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {  
    }

    public DbSet<Person> People { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
}