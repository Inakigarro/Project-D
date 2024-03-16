namespace Project_D.Api.GraphQl;

public class UserResponse : ObjectType
{
    /// <summary>
    /// Gets or sets the User Correlation Id.
    /// </summary>
    public Guid CorrelationId { get; set; }

    /// <summary>
    /// Gets or sets the User Display Name.
    /// </summary>
    public string DisplayName { get; set; } = null!;

    /// <summary>
    /// Gets or sets the User Email.
    /// </summary>
    public string Email { get; set; } = null!;
}