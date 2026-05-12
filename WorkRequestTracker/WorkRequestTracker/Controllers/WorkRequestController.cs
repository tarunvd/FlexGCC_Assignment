using Microsoft.AspNetCore.Mvc;
using WorkRequestTracker.Data.Models;
using WorkRequestTracker.Data.Services.Interfaces;

namespace WorkRequestTracker.Controllers
{
    [ApiController]
    [Route("api/work-requests")]
    public class WorkRequestController : ControllerBase
    {
        private readonly IWorkRequestService workRequestService;

        public WorkRequestController(IWorkRequestService workRequestService)
        {
            this.workRequestService = workRequestService;
        }

        [HttpGet]
        public async Task<IEnumerable<WorkRequestListViewModel>> GetWorkRequests(
            [FromQuery] int? status,
            [FromQuery] string? search,
            [FromQuery] int? page,
            [FromQuery] int? pageSize,
            CancellationToken cancellationToken)
        {
            return await this.workRequestService.GetListAsync(status, search, page, pageSize, cancellationToken);
        }

        [HttpGet("{id}")]
        public async Task<WorkRequestViewModel?> GetWorkRequestById(int id, CancellationToken cancellationToken)
        {
            return await this.workRequestService.GetByIdAsync(id, cancellationToken);
        }

        [HttpPost]
        public async Task<WorkRequestViewModel> CreateWorkRequest(WorkRequestDto workRequest, CancellationToken cancellationToken)
        {
            return await this.workRequestService.CreateAsync(workRequest, cancellationToken);
        }

        [HttpPatch("{id}/status")]
        public async Task<WorkRequestViewModel> UpdateWorkRequestStatus(int id, [FromBody] StatusUpdateDto status, CancellationToken cancellationToken)
        {
            return await this.workRequestService.UpdateStatusAsync(id, status, cancellationToken);
        }

        [HttpPatch("{id}/notes")]
        public async Task<WorkRequestViewModel> UpdateWorkRequestNotes(int id, [FromBody] NotesUpdateDto notes, CancellationToken cancellationToken)
        {
            return await this.workRequestService.UpdateNotesAsync(id, notes, cancellationToken);
        }
    }
}
