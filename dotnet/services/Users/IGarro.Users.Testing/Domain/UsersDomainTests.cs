using IGarro.Users.Domain;
using MassTransit;

namespace IGarro.Users.Testing.Domain;

public class UsersDomainTests
{
    [Fact]
    public void CreateUser_WithValidDisplayName_ShouldSetDisplayName()
    {
        // Arrange.
        Guid userId = NewId.NextGuid();
        string displayName = "Pepito pescado";
        User testUser = new User(userId);
        
        // Act.
        testUser.SetDisplayName(displayName);
        
        // Assert.
        Assert.Equal(displayName, testUser.DisplayName);
    }

    [Fact]
    public void CreateUser_WithInvalidDisplayName_ShouldThrow()
    {
        // Arrange.
        Guid userId = NewId.NextGuid();
        string invalidDisplayName = "";
        User testUser = new User(userId);
        
        // Act.
        var exception = Record.Exception(() => testUser.SetDisplayName(invalidDisplayName));
        
        // Assert.
        Assert.NotNull(exception);
        Assert.IsType<ArgumentNullException>(exception);
    }

    [Fact]
    public void CreateUser_WithValidEmail_ShouldCreate()
    {
        // Arrange.
        Guid userId = NewId.NextGuid();
        string email = "email@email.com";
        User testUser = new User(userId);
        
        // Act.
        testUser.SetEmail(email);
        
        // Assert.
        Assert.Equal(email, testUser.Email);
    }

    [Fact]
    public void CreateUser_WithNullOrEmptyEmail_ShouldThrow()
    {
        // Arrange.
        Guid userId = NewId.NextGuid();
        string invalidEmail = "";
        User testUser = new User(userId);
        
        // Act.
        var exception = Record.Exception(() => testUser.SetEmail(invalidEmail));
        
        // Assert.
        Assert.NotNull(exception);
        Assert.IsType<ArgumentNullException>(exception);
    }

    [Fact]
    public void CreateUser_WithInvalidEmail_ShouldThrown()
    {
        // Arrange.
        Guid userId = NewId.NextGuid();
        string invalidEmail = "e@.com";
        User testUser = new User(userId);
        
        // Act.
        var exception = Record.Exception(() => testUser.SetEmail(invalidEmail));
        
        // Assert.
        Assert.NotNull(exception);
        Assert.IsType<InvalidOperationException>(exception);
    }
}