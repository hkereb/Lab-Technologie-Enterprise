using WebApiAjax;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapGet("/math", (int x, int y) => new CalcResult()
{
    Sum = x + y,
    Difference = x - y,
    Product = x * y,
    Quotient = x / y
});

app.UseStaticFiles();
app.Run();
