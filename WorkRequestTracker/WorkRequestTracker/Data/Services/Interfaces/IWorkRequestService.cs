using WorkRequestTracker.Data.Models;

namespace WorkRequestTracker.Data.Services.Interfaces
{
    public interface IWorkRequestService
    {
        Task<WorkRequestViewModel> CreateAsync(WorkRequestDto workRequest, CancellationToken cancellationToken);

        Task<WorkRequestViewModel?> GetByIdAsync(int id, CancellationToken cancellationToken);
        
        Task<IEnumerable<WorkRequestListViewModel>> GetListAsync(
            int? status,
            string? search,
            int? page,
            int? pageSize,
            CancellationToken cancellationToken);
        
        Task<WorkRequestViewModel> UpdateStatusAsync(int id, StatusUpdateDto updateDto, CancellationToken cancellationToken);

        Task<WorkRequestViewModel> UpdateNotesAsync(int id, NotesUpdateDto updateDto, CancellationToken cancellationToken);
    }
}
