using WorkRequestTracker.Data.Entities;

namespace WorkRequestTracker.Data.Models
{
    public class WorkRequestListViewModel
    {
        public WorkRequestListViewModel(WorkRequest workRequest)
        {
            Id = workRequest.Id;
            Title = workRequest.Title;
            ClientName = workRequest.ClientName;
            Priority = workRequest.Priority;
            Status = workRequest.Status;
            DueDate = workRequest.DueDate;
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string ClientName { get; set; }

        public PriorityEnum Priority { get; set; }
        
        public StatusEnum Status { get; set; }

        public DateTime DueDate { get; set; }
    }
}
