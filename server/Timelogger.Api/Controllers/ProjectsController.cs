using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;

		public ProjectsController(ApiContext context)
		{
			_context = context;
		}

		// GET api/projects
		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_context.Projects);
		}
		[HttpPost("create")]
		public IActionResult Create([FromBody]Project projectProps)
		{
			var project = new Project
			{
				Name = projectProps.Name,
				Description = projectProps.Description,
				Client = projectProps.Client,
				ContributorName = projectProps.ContributorName,
				TimeSpent = projectProps.TimeSpent,
				Completed = projectProps.Completed
			};
			_context.Projects.Add(project);
			_context.SaveChanges();
			return Ok(project);
		}
	}
}
