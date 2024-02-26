namespace IGarro.Users.Application.Contracts;

public record GetAllUsersReponse
{
    /// <summary>
    /// Gets or sets the CorrelationId.
    /// </summary>
    public Guid CorrelationId { get; set; }

    /// <summary>
    /// Gets or sets a list of users.
    /// </summary>
    public IEnumerable<UserUpdated> Users { get; set; } = new List<UserUpdated>();
}