using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteService.Models;

namespace NoteService.Controllers
{
    [Produces("application/json")]
    public class NotesController : Controller
    {
        private readonly NotesContext _context;

        public NotesController(NotesContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("api/Notes/Index")]
        public IEnumerable<Note> Get()
        {
            return _context.Notes;
        }

        [HttpGet]
        [Route("api/Notes/Details/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var note = await _context.Notes.SingleOrDefaultAsync(m => m.ID == id);

            if (note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }

        [HttpPut]
        [Route("api/Notes/Edit")]
        public async Task<IActionResult> Put([FromBody]Note note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        [HttpPost]
        [Route("api/Notes/Create")]
        public async Task<IActionResult> Post([FromBody]Note note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = note.ID }, note);
        }

        [HttpDelete]
        [Route("api/Notes/Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var note = await _context.Notes.SingleOrDefaultAsync(m => m.ID == id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return Ok(note);
        }
    }
}