using WorkRequestTracker.Data.Entities;

namespace WorkRequestTracker.Data.Models
{
    public class WorkRequestViewModel
    {
        public WorkRequestViewModel(WorkRequest workRequest)
        {
            Id = workRequest.Id;
            Title = workRequest.Title;
            ClientName = workRequest.ClientName;
            Description = workRequest.Description;
            Priority = workRequest.Priority;
            Status = workRequest.Status;
            DueDate = workRequest.DueDate;
            Notes = workRequest.Notes;
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string ClientName { get; set; }

        public string Description { get; set; }

        public PriorityEnum Priority { get; set; }
        
        public StatusEnum Status { get; set; }

        public DateTime DueDate { get; set; }

        public string? Notes { get; set; }
    }
}
