using TechStore.Server.Application.DTO.Produto;

namespace TechStore.Server.Application.DTO.Categoria;

public class CategoriaResponseDTO
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public List<ProdutoResponseDTO> Produtos { get; set; }
}
