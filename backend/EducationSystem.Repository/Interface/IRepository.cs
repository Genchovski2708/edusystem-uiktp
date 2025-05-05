using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EducationSystem.Domain.Models;

namespace EducationSystem.Repository.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(Guid id);
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(Guid id);
    }
}
