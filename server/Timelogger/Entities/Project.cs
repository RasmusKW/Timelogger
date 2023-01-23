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
		public bool Completed { get; set; }
	}
}
