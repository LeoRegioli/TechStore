using Microsoft.EntityFrameworkCore;
using TechStore.Server.Application.DTO.Categoria;
using TechStore.Server.Context;
using TechStore.Server.Domain.Entities;

namespace TechStore.Server.Infrastructure.Repository;

public sealed class CategoriaRepository(TechStoreDbContext _context)
{
    public async Task<Categoria> CriarCategoria(Categoria categoria)
    {
        await _context.Categorias.AddAsync(categoria);
        await _context.SaveChangesAsync();
        return categoria;
    }

    public async Task<IReadOnlyList<Categoria>> BuscarCategorias()
    {
        var listasCategorias = await _context.Categorias.AsNoTracking().ToListAsync();
        return listasCategorias;
    }

    public async Task<Categoria?> BuscaCategoriaPorId(int id)
    {
        var categoria = await _context.Categorias.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        return categoria;
    }

    public async Task<bool> DeletarCategoria(int id)
    {
        var categoria = await _context.Categorias.FirstOrDefaultAsync(x => x.Id == id);
        if (categoria is null) return false;

        _context.Categorias.Remove(categoria);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<CategoriaDTO?> AtualizarCategoria(Categoria cat)
    {
        var categoria = await _context.Categorias.FindAsync(cat.Id);
        if (categoria is null)
            return null;

        categoria.Nome = cat.Nome;
        categoria.Descricao = cat.Descricao;

        await _context.SaveChangesAsync();

        return new CategoriaDTO
        {
            Id = categoria.Id,
            Nome = categoria.Nome,
            Descricao = categoria.Descricao
        };
    }
}
