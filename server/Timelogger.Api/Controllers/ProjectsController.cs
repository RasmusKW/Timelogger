using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;
		private readonly ILogger<ProjectsController> _logger;

		public ProjectsController(ApiContext context, ILogger<ProjectsController> logger)
		{
			_context = context;
			_logger = logger;
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
				StartDate = projectProps.StartDate,
				EndDate = projectProps.EndDate,
				Completed = projectProps.Completed,
				// TimeRegistrations = projectProps.TimeRegistrations
			};
			_context.Projects.Add(project);
			_context.SaveChanges();
			return Ok(project);
		}
		[HttpDelete("delete/{id}")]
		public IActionResult Delete(int id)
		{
			var project = _context.Projects.Find(id);
			if (project == null)
			{
				return NotFound();
			}

			_context.Projects.Remove(project);
			_context.SaveChanges();

			return Ok();
		}
		
		[HttpPut("update/{id}")]
		public IActionResult Update(int id, [FromBody]Project projectProps)
		{
			try{
			var project = _context.Projects.Find(id);
			if (project == null)
			{
				_logger.LogError("Project with id {id} not found", id);
				return NotFound();
			}

			project.Name = projectProps.Name;
			project.Description = projectProps.Description;
			project.Client = projectProps.Client;
			project.ContributorName = projectProps.ContributorName;
			project.TimeSpent = projectProps.TimeSpent;
			project.StartDate = projectProps.StartDate;
			project.EndDate = projectProps.EndDate;
			project.Completed = projectProps.Completed;
			// project.TimeRegistrations = projectProps.TimeRegistrations;

			_context.Projects.Update(project);
			_context.SaveChanges();

			_logger.LogInformation("Project with id {id} updated", id);
			return Ok(project);
			}
			catch(System.Exception ex)
			{
				_logger.LogError("Error while updating project with id {id}", id);
				return BadRequest(ex);
			}
		}
	}
}
