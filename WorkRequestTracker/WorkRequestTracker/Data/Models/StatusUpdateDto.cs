using WorkRequestTracker.Data.Entities;

namespace WorkRequestTracker.Data.Models
{
    public class StatusUpdateDto
    {
        public required StatusEnum Status { get; set; }
    }
}
