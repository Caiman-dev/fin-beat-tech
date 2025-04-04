using fin_beat_tech.Models.Context;
using fin_beat_tech.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace fin_beat_tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DataController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SaveData([FromBody] List<Dictionary<string, string>> json)
        {
            if (json == null)
                return BadRequest("JSON is null");

            try
            {
                await _context.DataItems.ExecuteDeleteAsync();

                var items = json
                    .SelectMany(dict => dict.Select(kvp =>
                    {
                        if (!int.TryParse(kvp.Key, out var key))
                            throw new FormatException($"Unable to parse key: '{kvp.Key}'");

                        return new DataItem
                        {
                            Code = key,
                            Value = kvp.Value
                        };
                    }))
                    .OrderBy(e => e.Code)
                    .ToList();

                await _context.DataItems.AddRangeAsync(items);
                await _context.SaveChangesAsync();

                return Ok("Data saved successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetData([FromQuery] int? code)
        {
            var query = _context.DataItems.AsQueryable();

            if (code.HasValue)
                query = query.Where(e => e.Code == code.Value);

            var data = await query.ToListAsync();

            return Ok(data);
        }
    }
}
