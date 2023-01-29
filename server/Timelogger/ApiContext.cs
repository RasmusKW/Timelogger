using Microsoft.EntityFrameworkCore;
using Timelogger.Entities;

namespace Timelogger
{
	public class ApiContext : DbContext
	{
		public ApiContext(DbContextOptions<ApiContext> options)
			: base(options)
		{
		}
		// Unused, but kept for reference
		// public DbSet<TimeRegistration> TimeRegistrations { get; set; }
		public DbSet<Project> Projects { get; set; }
	}
}
