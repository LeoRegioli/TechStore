using Microsoft.EntityFrameworkCore;
using TechStore.Server.Domain.Entities;

namespace TechStore.Server.Context;

public class TechStoreDbContext : DbContext
{
    public TechStoreDbContext(DbContextOptions<TechStoreDbContext> opt) : base(opt) { }

    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Produto> Produtos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Categoria>().HasKey(x => x.Id);
        modelBuilder.Entity<Produto>().HasKey(x => x.Id);
        modelBuilder.Entity<Produto>().Property(x => x.Preco).HasPrecision(18,2);
    }
}