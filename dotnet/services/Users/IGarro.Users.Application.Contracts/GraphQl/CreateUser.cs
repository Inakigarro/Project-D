namespace IGarro.Users.Application.Contracts;

/// <summary>
/// GraphQL dto used to create a User.
/// </summary>
public class CreateUser
{
    /// <summary>
    /// Gets or sets the User Display Name.
    /// </summary>
    public string DisplayName { get; set; } = null!;

    /// <summary>
    /// Gets or sets the User Email.
    /// </summary>
    public string Email { get; set; } = null!;
}