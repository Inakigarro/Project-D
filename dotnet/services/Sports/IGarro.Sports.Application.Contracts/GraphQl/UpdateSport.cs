namespace IGarro.Sports.Application.Contracts;

public record UpdateSport
{
    /// <summary>
    /// Gets or sets the sport correlation id.
    /// </summary>
    public Guid CorrelationId { get; set; }

    /// <summary>
    /// Gets or sets the sport display name.
    /// </summary>
    public string DisplayName { get; set; } = null!;
}