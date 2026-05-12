using WorkRequestTracker.Data.Entities;

namespace WorkRequestTracker.Data.Models
{
    public class WorkRequestDto
    {
        public string? Title { get; set; }

        public string? ClientName { get; set; }

        public string? Description { get; set; }

        public PriorityEnum? Priority { get; set; }
        
        public StatusEnum? Status { get; set; }

        public DateTime? DueDate { get; set; }

        public string? Notes { get; set; }
    }
}
