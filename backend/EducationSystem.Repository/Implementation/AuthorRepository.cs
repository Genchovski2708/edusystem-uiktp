using EducationSystem.Domain.Models;
using EducationSystem.Repository;

public class AuthorRepository : Repository<Author>, IAuthorRepository
{
    public AuthorRepository(ApplicationDbContext context) : base(context)
    {
    }
}