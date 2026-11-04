using Humanizer;

var app = WebApplication.CreateBuilder(args).Build();

this does not compile;
app.MapGet("/", () => Results.Text("e2e:dotnet:v3-broken"));

app.Run();
