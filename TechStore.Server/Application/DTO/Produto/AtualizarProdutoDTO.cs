namespace TechStore.Server.Application.DTO.Produto;

public class AtualizarProdutoDTO
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required string Descricao { get; set; }
    public required decimal Preco { get; set; }
    public required int CategoriaId { get; set; }
}
