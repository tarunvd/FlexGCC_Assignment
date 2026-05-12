using Microsoft.AspNetCore.Mvc;
using WorkRequestTracker.Data.Models;

namespace WorkRequestTracker.Controllers
{
    [ApiController]
    [Route("api/work-requests")]
    public class WorkRequestController : ControllerBase
    {
        private readonly ILogger<WorkRequestController> _logger;

        public WorkRequestController(ILogger<WorkRequestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WorkRequestListViewModel> GetWorkRequests(
            [FromQuery] int? status,
            [FromQuery] string? search,
            [FromQuery] int? page,
            [FromQuery] int? pageSize,
            CancellationToken cancellationToken)
        {
            return Enumerable.Empty<WorkRequestListViewModel>();
        }

        [HttpGet("{id}")]
        public WorkRequestViewModel? GetWorkRequestById(int id, CancellationToken cancellationToken)
        {
            return null;
        }

        [HttpPost]
        public int? CreateWorkRequest(WorkRequestDto workRequest, CancellationToken cancellationToken)
        {
            return null;
        }

        [HttpPatch("{id}/status")]
        public int? UpdateWorkRequestStatus(int id, [FromBody] StatusUpdateDto status, CancellationToken cancellationToken)
        {
            return null;
        }

        [HttpPatch("{id}/notes")]
        public int? UpdateWorkRequestNotes(int id, [FromBody] NotesUpdateDto notes, CancellationToken cancellationToken)
        {
            return null;
        }
    }
}
