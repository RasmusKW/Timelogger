using System.Collections.Generic;

namespace Timelogger.Entities
{
	public class Project
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string Client { get; set; }
		public string ContributorName { get; set; }
		public double TimeSpent { get; set; }
		public string StartDate { get; set; }
		public string EndDate { get; set; }
		public bool Completed { get; set; }
		// public List<TimeRegistration> TimeRegistrations { get; set; }
	}
}
