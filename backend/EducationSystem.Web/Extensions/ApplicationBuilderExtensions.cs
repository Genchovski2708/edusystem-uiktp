using EducationSystem.Web.Infrastructure;

namespace EducationSystem.Web.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        /// <summary>
        /// Seeds the database with initial data for testing and development purposes
        /// </summary>
        public static async Task<IApplicationBuilder> SeedDatabase(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                try
                {
                    await SeedData.Initialize(serviceProvider);
                    Console.WriteLine("Database seeded successfully!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred while seeding the database: {ex.Message}");
                }
            }

            return app;
        }
    }
}
