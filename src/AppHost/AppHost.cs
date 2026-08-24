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
    .WithEndpoint("http", endpoint => endpoint.Port = 3000)
    .WithReference(api)
    .WithEnvironment("API_HTTP", api.GetEndpoint("http"))
    .WithExternalHttpEndpoints()
    .WaitFor(api);

builder.Build().Run();
