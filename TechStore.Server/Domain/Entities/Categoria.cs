namespace TechStore.Server.Domain.Entities;

public class Categoria
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public string? Descricao { get; set; }
    public List<Produto>? Produtos { get; set; }
}
