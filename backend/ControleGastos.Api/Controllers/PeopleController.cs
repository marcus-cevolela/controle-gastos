using ControleGastos.Api.DTOs.People;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        private readonly IPersonService _personService;
        public PeopleController (IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var people = await _personService.GetAllAsync();
            return Ok(people);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreatePersonDto createPerson)
        {
            var person = await _personService.CreateAsync(createPerson);
            return Created($"/api/people/{person.Id}", person);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await _personService.DeleteAsync(id);
            return NoContent();
        }
    }
}

