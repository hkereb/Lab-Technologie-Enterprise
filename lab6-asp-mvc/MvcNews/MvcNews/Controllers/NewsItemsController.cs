using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MvcNews.Data;
using MvcNews.Models;

namespace MvcNews.Controllers
{
    public class NewsItemsController : Controller
    {
        private readonly NewsDbContext _context;

        public NewsItemsController(NewsDbContext context)
        {
            _context = context;
        }

        // GET: NewsItems
        public async Task<IActionResult> Index()
        {
            return View(await _context.News.ToListAsync());
        }

        // GET: NewsItems/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var newsItem = await _context.News
                .FirstOrDefaultAsync(m => m.Id == id);
            if (newsItem == null)
            {
                return NotFound();
            }

            return View(newsItem);
        }

        // GET: NewsItems/Create
        public IActionResult Create()
        {
            var newsItem = new NewsItem();
            newsItem.TimeStamp = System.DateTime.Now;
            return View(newsItem);
        }

        // POST: NewsItems/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,TimeStamp,Text")] NewsItem newsItem)
        {
            if (ModelState.IsValid)
            {
                _context.Add(newsItem);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(newsItem);
        }

        // GET: NewsItems/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var newsItem = await _context.News.FindAsync(id);
            if (newsItem == null)
            {
                return NotFound();
            }
            return View(newsItem);
        }

        // POST: NewsItems/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,TimeStamp,Text,RowVersion")] NewsItem newsItem)
        {
            if (id != newsItem.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(newsItem);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    if (!NewsItemExists(newsItem.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Dane zostały w międzyczasie zmodyfikowane");

                        var entry = ex.Entries.Single();
                        var databaseEntry = entry.GetDatabaseValues();

                        if (databaseEntry == null)
                        {
                            ModelState.AddModelError(string.Empty, "Zapis nieudany. Rekord został usunięty z bazy.");
                        }
                        else
                        {
                            var databaseEntity = (NewsItem)databaseEntry.ToObject();

                            ModelState.AddModelError("TimeStamp", $"Wartość w bazie: {databaseEntity.TimeStamp}");
                            ModelState.AddModelError("Text", $"Wartość w bazie: {databaseEntity.Text}");

                            newsItem.RowVersion = databaseEntity.RowVersion;
                            ModelState.Remove("RowVersion");
                        }
                    }
                }
                return View(newsItem);
            }
            return View(newsItem);
        }

        // GET: NewsItems/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var newsItem = await _context.News
                .FirstOrDefaultAsync(m => m.Id == id);
            if (newsItem == null)
            {
                return NotFound();
            }

            return View(newsItem);
        }

        // POST: NewsItems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id, NewsItem newsItem)
        {
            try
            {
                _context.News.Remove(newsItem);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!NewsItemExists(newsItem.Id))
                {
                    return NotFound();
                }
                else
                {
                    ModelState.AddModelError("", "Usunięcie nieudane, ktoś inny zmodyfikował ten rekord.");

                    var entry = ex.Entries.Single();
                    var databaseEntry = entry.GetDatabaseValues();

                    if (databaseEntry == null)
                    {
                        return NotFound();
                    }

                    var databaseEntity = (NewsItem)databaseEntry.ToObject();
                    ModelState.Remove("RowVersion");

                    return View(databaseEntity);
                }
            }
        }
        private bool NewsItemExists(int id)
        {
            return _context.News.Any(e => e.Id == id);
        }
    }
}
