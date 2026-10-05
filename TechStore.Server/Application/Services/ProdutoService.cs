using TechStore.Server.Application.DTO.Produto;
using TechStore.Server.Domain.Entities;
using TechStore.Server.Infrastructure.Repository;

namespace TechStore.Server.Application.Services;

public sealed class ProdutoService(ProdutoRepository _repository)
{
    public async Task<Produto> CriarProduto(CriarProdutoDTO produtoDTO)
    {
        var produto = new Produto()
        {
            Id = produtoDTO.Id,
            Nome = produtoDTO.Nome,
            Descricao = produtoDTO.Descricao,
            Preco = produtoDTO.Preco,
            CategoriaId = produtoDTO.CategoriaId
        };
                
        await _repository.CriarProduto(produto);
        return produto;
    }

    public async Task<IReadOnlyList<ProdutoDTO>> BuscarProdutos()
    {
        return await _repository.BuscarProdutos();
    }

    public async Task<ProdutoDTO?> BuscaProdutoPorId(int id)
    {
        return await _repository.BuscaProdutoPorId(id);
    }

    public async Task AtualizarProduto(AtualizarProdutoDTO produto)
    {
        await _repository.AtualizarProduto(produto);
    }

    public async Task<bool> DeletarProduto(int id)
    {
        return await _repository.DeletarProduto(id);
    }
}
