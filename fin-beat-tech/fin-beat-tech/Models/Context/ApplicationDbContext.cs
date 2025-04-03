using fin_beat_tech.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace fin_beat_tech.Models.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<DataItem> DataItems { get; set; }
    }
}
