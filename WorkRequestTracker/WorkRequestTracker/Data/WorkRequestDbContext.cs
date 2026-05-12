using Microsoft.EntityFrameworkCore;
using WorkRequestTracker.Data.Entities;

namespace WorkRequestTracker.Data
{
    public class WorkRequestDbContext : DbContext
    {
        public WorkRequestDbContext(DbContextOptions<WorkRequestDbContext> options) : base(options)
        {
        }

        public DbSet<WorkRequest> WorkRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure WorkRequest entity
            modelBuilder.Entity<WorkRequest>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ClientName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(e => e.Priority)
                    .IsRequired()
                    .HasConversion<int>();

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasConversion<int>();

                entity.Property(e => e.DueDate)
                    .IsRequired();

                entity.Property(e => e.CreatedDate)
                    .IsRequired();

                entity.Property(e => e.UpdatedDate);

                entity.Property(e => e.Notes)
                    .HasMaxLength(2000);

                // Create indexes for better query performance
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.Title);
                entity.HasIndex(e => e.ClientName);
            });
        }
    }
}
