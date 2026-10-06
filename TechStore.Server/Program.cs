using Azure.Identity;
using Microsoft.EntityFrameworkCore;
using TechStore.Server.Application.Services;
using TechStore.Server.Context;
using TechStore.Server.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<CategoriaRepository>();
builder.Services.AddScoped<CategoriaService>();
builder.Services.AddScoped<ProdutoRepository>();
builder.Services.AddScoped<ProdutoService>();
builder.Services.AddDbContext<TechStoreDbContext>(opt => opt.UseAzureSql(builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING")));

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("https://localhost:52351", "https://purple-ocean-0a457f80f.4.azurestaticapps.net").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Configuration.AddAzureKeyVault(new Uri("https://kv-techstore.vault.azure.net/"), new DefaultAzureCredential());

var app = builder.Build();
app.UseCors("ReactApp");

//app.UseDefaultFiles();
//app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
    //app.UseSwagger();
    //app.UseSwaggerUI();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//app.MapFallbackToFile("/index.html");


app.Run();
