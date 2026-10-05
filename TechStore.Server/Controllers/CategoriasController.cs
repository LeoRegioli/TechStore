using Microsoft.AspNetCore.Mvc;
using TechStore.Server.Application.Services;
using TechStore.Server.Domain.Entities;

namespace TechStore.Server.Controllers;

[ApiController]
[Route("api/categorias")]
public class CategoriasController(CategoriaService _service) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CriarCategoria(Categoria categoria)
    {
       var result = await _service.CriarCategoria(categoria);
        if (result is not null)
            return CreatedAtAction(nameof(BuscaCategoriaPorId), new {id = result.Id}, result);

        return BadRequest("Não foi possível criar a categoria.");
    }

    [HttpGet]
    public async Task<IActionResult> BuscarCategorias()
    {
        var listaCategorias = await _service.BuscarCategorias();
        return Ok(listaCategorias);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Categoria>> BuscaCategoriaPorId(int id)
    {
        var categoria = await _service.BuscaCategoriaPorId(id);
        if (categoria is null)
            return NotFound();

        return Ok(categoria);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeletarCategoria(int id)
    {
        var hasDeleted = await _service.DeletarCategoria(id);
        if (hasDeleted)
            return NoContent();

        return NotFound();
    }

    [HttpPut]
    public async Task<IActionResult> AtualizarCategoria(Categoria categoria)
    {
        var categoriaAtualizada = await _service.AtualizarCategoria(categoria);
        return Ok(categoriaAtualizada);
    }
}
