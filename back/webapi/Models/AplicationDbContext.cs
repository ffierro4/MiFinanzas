using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class AplicationDbContext: DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext>options): base(options)
        { 
            
        }
        public DbSet<Match> Matches { get; set; }
    }
}
