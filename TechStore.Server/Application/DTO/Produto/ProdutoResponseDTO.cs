namespace TechStore.Server.Application.DTO.Produto;

public class ProdutoResponseDTO
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required string Descricao { get; set; }
}
