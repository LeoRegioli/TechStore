using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TechStore.Server.Application.DTO.Produto;
using TechStore.Server.Application.Services;
using TechStore.Server.Domain.Entities;

namespace TechStore.Server.Controllers;

[ApiController]
[Route("api/produtos")]
public class ProdutosController(ProdutoService _service) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CriarProduto(CriarProdutoDTO produto)
    {
        if (produto == null) return BadRequest("Dados incompletos.");

        var result = await _service.CriarProduto(produto);
        if (result is not null)
        {
            var buscaProdutoDTO = await _service.BuscaProdutoPorId(result.Id);
            return CreatedAtAction(nameof(BuscaProdutoPorId), new { id = result.Id }, buscaProdutoDTO);
        }

        return BadRequest("Não foi possível criar a Produto.");
    }

    [HttpGet]
    public async Task<IActionResult> BuscarProdutos()
    {
        var listaProdutos = await _service.BuscarProdutos();
        return Ok(listaProdutos);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProdutoDTO>> BuscaProdutoPorId(int id)
    {
        var produto = await _service.BuscaProdutoPorId(id);
        if (produto is null)
            return NotFound();

        return Ok(produto);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeletarProduto(int id)
    {
        var hasDeleted = await _service.DeletarProduto(id);
        if (hasDeleted)
            return NoContent();

        return NotFound();
    }

    [HttpPut]
    public async Task<IActionResult> AtualizarProduto(AtualizarProdutoDTO produto)
    {
        await _service.AtualizarProduto(produto);
        var buscaProdutoDTO = await _service.BuscaProdutoPorId(produto.Id);
        return Ok(buscaProdutoDTO);
    }
}
