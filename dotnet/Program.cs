var app = WebApplication.CreateBuilder(args).Build();

app.MapGet("/", () => Results.Text("e2e:dotnet:v1"));

app.Run();
