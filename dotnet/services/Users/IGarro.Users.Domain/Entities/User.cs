using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace IGarro.Users.Domain;

public class User
{
    public User()
    {
    }

    public User(Guid correlationId)
    {
        this.CorrelationId = correlationId;
    }

    /// <summary>
    /// Gets or sets the User Correlation Id.
    /// </summary>
    public Guid CorrelationId { get; set; }

    /// <summary>
    /// Gets the User DisplayName.
    /// </summary>
    public string DisplayName { get; private set; } = null!;

    /// <summary>
    /// Gets the User Email.
    /// </summary>
    public string Email { get; private set; } = null!;

    public void SetDisplayName(string displayName)
    {
        if (string.IsNullOrEmpty(displayName))
        {
            throw new ArgumentNullException(nameof(displayName), "The provided display name is null or empty");
        }

        this.DisplayName = displayName;
    }

    public void SetEmail(string email)
    {
        if (string.IsNullOrEmpty(email))
        {
            throw new ArgumentNullException(nameof(email), "The provided email is null or empty");
        }

        const string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";

        if (!Regex.IsMatch(
                email,
                emailPattern))
        {
            throw new InvalidOperationException("The provided email has an invalid format");
        }
        
        this.Email = email;
    }
}