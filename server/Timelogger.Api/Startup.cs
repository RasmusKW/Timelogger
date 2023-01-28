using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Timelogger.Entities;
using System.Collections.Generic;

namespace Timelogger.Api
{
	public class Startup
	{
		private readonly IWebHostEnvironment _environment;
		public IConfigurationRoot Configuration { get; }

		public Startup(IWebHostEnvironment env)
		{
			_environment = env;

			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();
			Configuration = builder.Build();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// Add framework services.
			services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("e-conomic interview"));
			services.AddLogging(builder =>
			{
				builder.AddConsole();
				builder.AddDebug();
			});

			services.AddMvc(options => options.EnableEndpointRouting = false);

			if (_environment.IsDevelopment())
			{
				services.AddCors();
			}
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseCors(builder => builder
					.AllowAnyMethod()
					.AllowAnyHeader()
					.SetIsOriginAllowed(origin => true)
					.AllowCredentials());
			}

			app.UseMvc();


			var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
			using (var scope = serviceScopeFactory.CreateScope())
			{
				SeedDatabase(scope);
			}
		}

		private static void SeedDatabase(IServiceScope scope)
		{
			var context = scope.ServiceProvider.GetService<ApiContext>();
			var p1 = new Project
			{
				ID = 1,
				Name = "e-conomic Interview",
				Description = "This project incases the assignements for the interview",
				Client = "Visma e-conomic",
				ContributorName = "Rasmus",
				TimeSpent = 180,
				StartDate = "2023-01-23",
				EndDate = "2020-01-28",
				Completed = true,
				// TimeRegistrations = new List<TimeRegistration>()
			};

			var p2 = new Project
			{
				ID = 2,
				Name = "todo app",
				Description = "A todo app to keep track of various tasks",
				Client = "Inhouse Technologies",
				ContributorName = "Martin",
				TimeSpent = 30,
				StartDate = "2023-01-28",
				EndDate = "2020-02-02",
				Completed = false,
				// TimeRegistrations = new List<TimeRegistration>()

			};
			context.Projects.Add(p1);
			context.Projects.Add(p2);
			context.SaveChanges();
		}
	}
}