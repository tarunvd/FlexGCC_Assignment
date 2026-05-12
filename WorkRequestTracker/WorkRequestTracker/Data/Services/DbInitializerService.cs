using Microsoft.EntityFrameworkCore;

namespace WorkRequestTracker.Data.Services
{
    public interface IDbInitializerService
    {
        Task InitializeDatabaseAsync();
    }

    public class DbInitializerService : IDbInitializerService
    {
        private readonly WorkRequestDbContext _context;
        private readonly ILogger<DbInitializerService> _logger;

        public DbInitializerService(WorkRequestDbContext context, ILogger<DbInitializerService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task InitializeDatabaseAsync()
        {
            try
            {
                _logger.LogInformation("Starting database initialization...");

                // Apply any pending migrations
                var pendingMigrations = await _context.Database.GetPendingMigrationsAsync();
                if (pendingMigrations.Any())
                {
                    _logger.LogInformation("Applying {MigrationCount} pending migrations", pendingMigrations.Count());
                    await _context.Database.MigrateAsync();
                }

                // Ensure database is created
                bool created = await _context.Database.EnsureCreatedAsync();
                if (created)
                {
                    _logger.LogInformation("Database created successfully");
                }
                else
                {
                    _logger.LogInformation("Database already exists");
                }

                _logger.LogInformation("Database initialization completed successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initializing the database");
                throw;
            }
        }
    }
}
