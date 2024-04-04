namespace IGarro.Sports.Application.Contracts;

public class CreateOrUpdateSport
{
    /// <summary>
    /// Gets or sets the Sport correlation id.
    /// </summary>
    public Guid CorrelationId { get; set; }

    /// <summary>
    /// Gets or sets the Sport display name.
    /// </summary>
    public string DisplayName { get; set; } = null!;
}