using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WorkRequestTracker.Data.Entities;
using WorkRequestTracker.Data.Models;
using WorkRequestTracker.Data.Services.Interfaces;

namespace WorkRequestTracker.Data.Services
{
    public class WorkRequestService : IWorkRequestService
    {
        private readonly WorkRequestDbContext dbContext;
        private readonly ILogger<WorkRequestService> logger;

        public WorkRequestService(WorkRequestDbContext context, ILogger<WorkRequestService> logger)
        {
            this.dbContext = context;
            this.logger = logger;
        }

        private static bool IsWorkRequestValid(WorkRequestDto workRequest)
        {
            return !string.IsNullOrWhiteSpace(workRequest.Title) &&
                          !string.IsNullOrWhiteSpace(workRequest.ClientName) &&
                          !string.IsNullOrWhiteSpace(workRequest.Description) &&
                          workRequest.DueDate != null &&
                          workRequest.Priority != null &&
                          workRequest.Status != null;
        }

        private Expression<Func<WorkRequest, bool>> GetStatusFilter(int? status)
        {
            Expression<Func<WorkRequest, bool>> statusFilter = w => true;

            if (status.HasValue)
            {
                if (int.TryParse(status.ToString(), out int statusValue))
                {
                    statusFilter = w => w.Status == (StatusEnum)statusValue;
                }
            }

            return statusFilter;
        }

        private Expression<Func<WorkRequest, bool>> GetSearchFilter(string? search)
        {
            Expression<Func<WorkRequest, bool>> searchFilter = w => true;

            if (!string.IsNullOrWhiteSpace(search))
            {
                searchFilter = w => w.Title.Contains(search) || w.ClientName.Contains(search);
            }

            return searchFilter;
        }

        /// <summary>
        /// Creates a new work request in the database
        /// </summary>  
        public async Task<WorkRequestViewModel> CreateAsync(WorkRequestDto workRequest, CancellationToken cancellationToken)
        {
            try
            {
                this.logger.LogInformation("Creating new work request: {Title}", workRequest.Title);

                if (!IsWorkRequestValid(workRequest))
                {
                    this.logger.LogWarning("Invalid work request data for creation: {Title}", workRequest.Title);
                    throw new InvalidOperationException($"Invalid work request data for creation: {workRequest.Title}");
                }

#pragma warning disable CS8601 // Possible null reference assignment.
#pragma warning disable CS8629 // Nullable value type may be null.
                var entity = new WorkRequest
                {
                    Title = workRequest.Title,
                    ClientName = workRequest.ClientName,
                    DueDate = workRequest.DueDate.Value,
                    Priority = workRequest.Priority.Value,
                    Description = workRequest.Description,
                    Status = workRequest.Status.Value,
                    CreatedDate = DateTime.UtcNow,
                };
#pragma warning restore CS8629 // Nullable value type may be null.
#pragma warning restore CS8601 // Possible null reference assignment.

                this.dbContext.WorkRequests.Add(entity);
                await this.dbContext.SaveChangesAsync(cancellationToken);

                this.logger.LogInformation("Work request created successfully with ID: {Id}", entity.Id);
                return new WorkRequestViewModel(entity);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "Error creating work request: {Title}", workRequest.Title);
                throw;
            }
        }

        /// <summary>
        /// Retrieves a work request by its ID
        /// </summary>
        public async Task<WorkRequestViewModel?> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            try
            {
                this.logger.LogInformation("Retrieving work request with ID: {Id}", id);

                var workRequest = await this.dbContext.WorkRequests.FirstOrDefaultAsync(w => w.Id == id, cancellationToken);

                if (workRequest == null)
                {
                    this.logger.LogWarning("Work request not found with ID: {Id}", id);
                    return null;
                }
                else
                {
                    this.logger.LogInformation("Work request retrieved successfully: {Title}", workRequest.Title);
                }

                return new WorkRequestViewModel(workRequest);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "Error retrieving work request with ID: {Id}", id);
                throw;
            }
        }

        /// <summary>
        /// Retrieves all work requests from the database
        /// </summary>
        public async Task<IEnumerable<WorkRequestListViewModel>> GetListAsync(
            int? status,
            string? search,
            int? page,
            int? pageSize,
            CancellationToken cancellationToken)
        {
            try
            {
                this.logger.LogInformation("Retrieving work requests");

                var pageSizeToUse  = pageSize ?? 10; // Default page size to 10 if not provided

                var statusFilter = this.GetStatusFilter(status);
                var searchFilter = this.GetSearchFilter(search);

                var workRequestsQuery = this.dbContext.WorkRequests
                    .Where(statusFilter)
                    .Where(searchFilter)
                    .OrderBy(w => w.Id)
                    .Skip(((page ?? 1) - 1) * pageSizeToUse)
                    .Take(pageSizeToUse);

                var workRequests = await workRequestsQuery
                    .Select(w => new WorkRequestListViewModel(w))
                    .ToListAsync(cancellationToken);

                this.logger.LogInformation("Retrieved {Count} work requests", workRequests.Count);
                return workRequests;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "Error retrieving all work requests");
                throw;
            }
        }

        /// <summary>
        /// Updates an existing work request
        /// </summary>
        public async Task<WorkRequestViewModel> UpdateStatusAsync(
            int id,
            StatusUpdateDto updateDto,
            CancellationToken cancellationToken)
        {
            try
            {
                this.logger.LogInformation("Updating status for work request with ID: {Id}", id);

                var existingRequest = await this.dbContext.WorkRequests.FirstOrDefaultAsync(w => w.Id == id, cancellationToken);
                if (existingRequest == null)
                {
                    this.logger.LogWarning("Work request not found for update with ID: {Id}", id);
                    throw new InvalidOperationException($"Work request with ID {id} not found");
                }

                existingRequest.Status = updateDto.Status;
                existingRequest.UpdatedDate = DateTime.UtcNow;

                this.dbContext.WorkRequests.Update(existingRequest);
                await this.dbContext.SaveChangesAsync(cancellationToken);

                this.logger.LogInformation("Status updated successfully for work request with ID: {Id}", id);
                return new WorkRequestViewModel(existingRequest);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "Error updating work request with ID: {Id}", id);
                throw;
            }
        }

        /// <summary>
        /// Updates an existing work request
        /// </summary>
        public async Task<WorkRequestViewModel> UpdateNotesAsync(
            int id,
            NotesUpdateDto updateDto,
            CancellationToken cancellationToken)
        {
            try
            {
                this.logger.LogInformation("Updating notes for work request with ID: {Id}", id);

                var existingRequest = await this.dbContext.WorkRequests.FirstOrDefaultAsync(w => w.Id == id, cancellationToken);
                if (existingRequest == null)
                {
                    this.logger.LogWarning("Work request not found for update with ID: {Id}", id);
                    throw new InvalidOperationException($"Work request with ID {id} not found");
                }

                existingRequest.Notes = updateDto.Notes;
                existingRequest.UpdatedDate = DateTime.UtcNow;

                this.dbContext.WorkRequests.Update(existingRequest);
                await this.dbContext.SaveChangesAsync(cancellationToken);

                this.logger.LogInformation("Notes updated successfully for work request with ID: {Id}", id);
                return new WorkRequestViewModel(existingRequest);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "Error updating work request with ID: {Id}", id);
                throw;
            }
        }
    }
}
