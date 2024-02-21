namespace IGarro.Addresses.Domain;

public class Address
{
    public Address()
    {
        
    }

    public Address(
        Guid correlationId)
    {
        this.CorrelationId = correlationId;
    }
    
    /// <summary>
    /// An Id that correlates to a specific address.
    /// </summary>
    public Guid CorrelationId { get; set; }
    
    /// <summary>
    /// The address city.
    /// </summary>
    public string City { get; private set; } = null!;
    
    /// <summary>
    /// The address street.
    /// </summary>
    public string Street { get; private set; } = null!;
    
    /// <summary>
    /// The address number.
    /// </summary>
    public int Number { get; private set; }
    
    /// <summary>
    /// The address department.
    /// </summary>
    public string? Department { get; private set; }

    public void SetCity(string city)
    {
        if (string.IsNullOrEmpty(city))
        {
            throw new ArgumentNullException(nameof(city),"The city cannot be null or empty");
        }

        this.City = city;
    }

    public void SetStreet(string street)
    {
        if (string.IsNullOrEmpty(street))
        {
            throw new ArgumentNullException(nameof(street),"The street cannot be null or empty");
        }

        this.Street = street;
    }

    public void SetNumber(int number)
    {
        this.Number = number;
    }

    public void SetDepartment(string? department)
    {
        this.Department = department;
    }

    /// <summary>
    /// Whether the address is a department address or not.
    /// </summary>
    /// <returns>True whether the address is a department address. False if not.</returns>
    public bool IsDepartment()
    {
        return !string.IsNullOrEmpty(this.Department);
    }
}