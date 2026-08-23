var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithPgAdmin()
    .WithDataVolume();

var database = postgres.AddDatabase("appdb");

var api = builder.AddProject<Projects.MyApp_Api>("webapi")
    .WithReference(database)
    .WaitFor(database);

builder.AddViteApp("frontend", "../frontend")
    .WithReference(api)
    .WithEnvironment("API_HTTP", api.GetEndpoint("http"))
    .WithExternalHttpEndpoints()
    .WaitFor(api);

builder.Build().Run();
