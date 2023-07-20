using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public PlayersController(AplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Match players)
        {
            try
            {
                players.CreatedAt = DateTime.Now;
                _context.Add(players);
                await _context.SaveChangesAsync();
                return CreatedAtAction("Get", new { id = players.Id }, players);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listPlayers = await _context.Matches.ToListAsync();
                return Ok(listPlayers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("last-winners")]
        public async Task<IActionResult> GetLastWinners()
        {
            try
            {
                var lastWinners = await _context.Matches
                    .Where(m => m.Winner != null)
                    .OrderByDescending(m => m.CreatedAt)
                    .Take(5)
                    .Select(m => m.Winner)
                    .ToListAsync();

                return Ok(lastWinners);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("save-winner")]
        public async Task<IActionResult> SaveWinner([FromBody] WinnerUpdateDto dto)
        {
            try
            {
                var match = await _context.Matches.FirstOrDefaultAsync(m => m.Winner == null);
                if (match == null)
                {
                    return BadRequest("No hay partidos sin ganador");
                }

                match.Winner = dto.Winner;
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public class WinnerUpdateDto
        {
            public string Winner { get; set; }
        }
    }
}
