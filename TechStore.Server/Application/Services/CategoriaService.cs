using TechStore.Server.Application.DTO.Categoria;
using TechStore.Server.Domain.Entities;
using TechStore.Server.Infrastructure.Repository;

namespace TechStore.Server.Application.Services;

public sealed class CategoriaService(CategoriaRepository _repository)
{
    public async Task<CategoriaDTO> CriarCategoria(Categoria categoria)
    {
        await _repository.CriarCategoria(categoria);
        return new CategoriaDTO
        {
            Id = categoria.Id,
            Nome = categoria.Nome,
            Descricao = categoria.Descricao
        };
    }

    public async Task<IReadOnlyList<Categoria>> BuscarCategorias()
    {
        return await _repository.BuscarCategorias();
    }

    public async Task<Categoria?> BuscaCategoriaPorId(int id)
    {
        return await _repository.BuscaCategoriaPorId(id);
    }

    public async Task<CategoriaDTO?> AtualizarCategoria(Categoria categoria)
    {
        return await _repository.AtualizarCategoria(categoria);
    }

    public async Task<bool> DeletarCategoria(int id)
    {
        return await _repository.DeletarCategoria(id);
    }
}
