namespace IGarro.Addresses.Application.Contracts;

public record AddressUpdated
{
    /// <summary>
    /// Gets or sets the Address Correlation Id.
    /// </summary>
    public Guid CorrelationId { get; set; }
    
    /// <summary>
    /// Gets or sets the address city.
    /// </summary>
    public string City { get; set; } = null!;
    
    /// <summary>
    /// Gets or sets the address street.
    /// </summary>
    public string Street { get; set; } = null!;
    
    /// <summary>
    /// Gets or sets the address number.
    /// </summary>
    public int Number { get; set; }
    
    /// <summary>
    /// Gets or sets the address department.
    /// </summary>
    public string? Department { get; set; }
}