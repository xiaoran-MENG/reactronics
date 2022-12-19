using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionHandler
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionHandler> logger;
        private readonly IHostEnvironment env;

        public ExceptionHandler(
            RequestDelegate next, 
            ILogger<ExceptionHandler> logger,
            IHostEnvironment env)
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (System.Exception e)
            {
                logger.LogError(e, e.Message);

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;

                var response = JsonSerializer.Serialize(
                    new ProblemDetails
                    {
                        Status = 500,
                        Title = e.Message,
                        Detail = env.IsDevelopment() 
                            ? e.StackTrace.ToString()
                            : null
                    }, 
                    new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                    });

                await context.Response.WriteAsync(response);
            }
        }
    }
}