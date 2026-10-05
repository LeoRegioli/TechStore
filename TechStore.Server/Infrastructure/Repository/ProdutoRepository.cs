using Microsoft.EntityFrameworkCore;
using TechStore.Server.Application.DTO.Produto;
using TechStore.Server.Context;
using TechStore.Server.Domain.Entities;

namespace TechStore.Server.Infrastructure.Repository;

public sealed class ProdutoRepository(TechStoreDbContext _context)
{
    public async Task<bool> CriarProduto(Produto Produto)
    {
        await _context.Produtos.AddAsync(Produto);
        var registroSalvo = await _context.SaveChangesAsync();
        return registroSalvo > 0;
    }

    public async Task<IReadOnlyList<ProdutoDTO>> BuscarProdutos()
    {
        var listasProdutos = await _context.Produtos.AsNoTracking().Select(p => new ProdutoDTO
        {
            Id = p.Id,
            Nome = p.Nome,
            Descricao = p.Descricao,
            Preco = p.Preco,
            CategoriaId = p.CategoriaId,
            CategoriaNome = p.Categoria.Nome,
            DataAlteracao = p.DataAlteracao,
            DataCriacao = p.DataCriacao
        }).ToListAsync();

        return listasProdutos;
    }

    public async Task<ProdutoDTO?> BuscaProdutoPorId(int id)
    {
        var Produto = await _context.Produtos.Select(p => new ProdutoDTO
        {
            Id = p.Id,
            Nome = p.Nome,
            Descricao = p.Descricao,
            Preco = p.Preco,
            CategoriaId = p.CategoriaId,
            CategoriaNome = p.Categoria.Nome,
            DataAlteracao = p.DataAlteracao,
            DataCriacao = p.DataCriacao
        }).FirstOrDefaultAsync(x => x.Id == id);
        return Produto;
    }

    public async Task<bool> DeletarProduto(int id)
    {
        var Produto = await _context.Produtos.FirstOrDefaultAsync(x => x.Id == id);
        if (Produto is null) return false;

        _context.Produtos.Remove(Produto);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task AtualizarProduto(AtualizarProdutoDTO prod)
    {
        var produto = await _context.Produtos.FindAsync(prod.Id);
        if (produto is null)
            return;

        produto.Nome = prod.Nome;
        produto.Descricao = prod.Descricao;
        produto.Preco = prod.Preco;
        produto.CategoriaId = prod.CategoriaId;
        produto.AtualizarUltimaDataAlteracao();

        await _context.SaveChangesAsync();
    }
}
