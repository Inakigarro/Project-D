namespace IGarro.Sports.Domain;

public class Sport
{
    public Sport()
    {}

    public Sport(Guid correlationId)
    {
        this.CorrelationId = correlationId;
    }

    /// <summary>
    /// Gets or sets the Sport Correlation Id.
    /// </summary>
    public Guid CorrelationId { get; set; }

    public string DisplayName { get; private set; } = null!;

    public void SetDisplayName(string displayName)
    {
        if (string.IsNullOrEmpty(displayName))
        {
            throw new ArgumentNullException(nameof(displayName), "The provided display name is null or empty");
        }

        this.DisplayName = displayName;
    }
}