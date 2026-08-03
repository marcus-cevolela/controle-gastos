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

    // Configura os relacionamentos entre as entidades.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Person>()
    .HasMany(person => person.Transactions)
    .WithOne(transaction => transaction.Person)
    .HasForeignKey(transaction => transaction.PersonId)
    .OnDelete(DeleteBehavior.Cascade);
}
}