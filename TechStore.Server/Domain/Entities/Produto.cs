using TechStore.Server.Domain.Enums;

namespace TechStore.Server.Domain.Entities;

public class Produto
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required string Descricao { get; set; }
    public required decimal Preco { get; set; }
    public StatusEnum Status { get; set; } = StatusEnum.Ativo;
    public DateTime DataCriacao { get; set; } = DateTime.Now;
    public DateTime DataAlteracao { get; set; } = DateTime.Now;

    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; }

    public void AtualizarUltimaDataAlteracao()
    {
       DataAlteracao = DateTime.Now;
    }
}