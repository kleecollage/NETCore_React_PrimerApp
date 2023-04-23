using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NETCore_React_PrimerApp.Models;
using System.Formats.Asn1;

namespace NETCore_React_PrimerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareasController : ControllerBase
    {

        private readonly NetcoreReactContext _dbContext;

        public TareasController(NetcoreReactContext context)
        {
            _dbContext = context;
        }


        [HttpGet]
        [Route("Lista")]     
        public async Task<IActionResult> Lista()
        {
            List<Tarea> lista = _dbContext.Tareas.OrderByDescending(t => t.IdTarea).ThenBy(t => t.FechaRegistro).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }


        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Tarea request)
        {
            await _dbContext.Tareas.AddAsync(request);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }


        [HttpDelete]
        [Route("Cerrar/{id:int}")]
        public async Task<IActionResult> Cerrar(int id)
        {
            Tarea tarea = _dbContext.Tareas.Find(id);

            _dbContext.Tareas.Remove(tarea);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }


    }
}
