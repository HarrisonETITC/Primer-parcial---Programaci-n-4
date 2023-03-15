using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd___primer_parcial.Models;

namespace BackEnd___primer_parcial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepuestosController : ControllerBase
    {
        private readonly TallerContext _context;

        public RepuestosController(TallerContext context)
        {
            _context = context;
        }

        // GET: api/Repuestoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Repuesto>>> GetRepuestos()
        {
            return await _context.Repuestos.ToListAsync();
        }

        // GET: api/Repuestoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Repuesto>> GetRepuesto(int id)
        {
            var repuesto = await _context.Repuestos.FindAsync(id);

            if (repuesto == null)
            {
                return NotFound();
            }

            return repuesto;
        }

        // PUT: api/Repuestoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRepuesto(int id, Repuesto repuesto)
        {
            if (id != repuesto.IdRepuestos)
            {
                return BadRequest();
            }

            _context.Entry(repuesto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RepuestoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Repuestoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Repuesto>> PostRepuesto(Repuesto repuesto)
        {
            _context.Repuestos.Add(repuesto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRepuesto", new { id = repuesto.IdRepuestos }, repuesto);
        }

        // DELETE: api/Repuestoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepuesto(int id)
        {
            var repuesto = await _context.Repuestos.FindAsync(id);
            if (repuesto == null)
            {
                return NotFound();
            }

            _context.Repuestos.Remove(repuesto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RepuestoExists(int id)
        {
            return _context.Repuestos.Any(e => e.IdRepuestos == id);
        }
    }
}
