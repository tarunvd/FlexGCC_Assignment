using WorkRequestTracker.Data.Entities;

namespace WorkRequestTracker.Data.Models
{
    public class WorkRequestListViewModel
    {
        public required int Id { get; set; }

        public required string Title { get; set; }

        public required string ClientName { get; set; }

        public required PriorityEnum Priority { get; set; }
        
        public required StatusEnum Status { get; set; }

        public required DateTime DueDate { get; set; }
    }
}
