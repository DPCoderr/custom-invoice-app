var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithPgAdmin()
    .WithDataVolume();

var database = postgres.AddDatabase("appdb");

var api = builder.AddProject<Projects.MyApp_Api>("webapi")
    .WithEndpoint("http", endpoint => endpoint.Port = 5050)
    .WithReference(database)
    .WaitFor(database);

var frontend = builder.AddViteApp("frontend", "../frontend")
    .WithReference(api)
    .WithEnvironment("API_HTTP", api.GetEndpoint("http"))
    .WithExternalHttpEndpoints()
    .WaitFor(api);

api.WithEnvironment("Frontend__BaseUrl", frontend.GetEndpoint("http"));

builder.Build().Run();
