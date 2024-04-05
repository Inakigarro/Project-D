namespace IGarro.Sports.Application.Contracts;

public record CreateSport
{
    /// <summary>
    /// Gets or sets the Sport Display Name.
    /// </summary>
    public string DisplayName { get; set; } = null!;
}