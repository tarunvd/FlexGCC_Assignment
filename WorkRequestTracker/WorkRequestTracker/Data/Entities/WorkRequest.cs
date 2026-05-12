namespace WorkRequestTracker.Data.Entities
{
    public class WorkRequest
    {
        public int Id { get; set; }

        public required string Title { get; set; }

        public required string ClientName { get; set; }

        public required string Description { get; set; }

        public required PriorityEnum Priority { get; set; }
        
        public required StatusEnum Status { get; set; }

        public required DateTime DueDate { get; set; }

        public required DateTime CreatedDate { get; set; }
        
        public DateTime? UpdatedDate { get; set; }

        public string? Notes { get; set; }
    }
}
