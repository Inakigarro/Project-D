namespace IGarro.Sports.Application.Contracts;

public class GetAllSportsResponse
{
    /// <summary>
    /// Gets or sets the CorrelationId.
    /// </summary>
    public Guid CorrelationId { get; set; }

    /// <summary>
    /// Gets or sets a list of sports.
    /// </summary>
    public IEnumerable<SportUpdated> Sports { get; set; } = new List<SportUpdated>();
}