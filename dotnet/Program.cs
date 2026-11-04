using Humanizer;

var app = WebApplication.CreateBuilder(args).Build();

app.MapGet("/", () => Results.Text("e2e:dotnet:" + "V2".Transform(To.LowerCase)));

app.Run();
