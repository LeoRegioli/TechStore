namespace TechStore.Server.Application.DTO.Produto;

public class ProdutoDTO
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required string Descricao { get; set; }
    public decimal Preco { get; set; }
    public DateTime DataCriacao { get; set; }
    public DateTime DataAlteracao { get; set; }

    public int CategoriaId { get; set; }
    public required string CategoriaNome { get; set; }
}
