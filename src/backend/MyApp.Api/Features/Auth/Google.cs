using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using MyApp.Api.Data;

namespace MyApp.Api.Features.Auth;

public static class Google
{
    public static IResult RedirectToGoogleLogin(
        string? returnUrl,
        LinkGenerator links,
        SignInManager<AppUser> signInManager)
    {
        var redirectUri = links.GetPathByName("google-callback", new { returnUrl })
            ?? throw new InvalidOperationException("The Google callback endpoint is not registered.");
        var props = signInManager.ConfigureExternalAuthenticationProperties(
            GoogleDefaults.AuthenticationScheme,
            redirectUri);

        return TypedResults.Challenge(props, [GoogleDefaults.AuthenticationScheme]);
    }

    public static async Task<IResult> CallbackGoogle(
        string? returnUrl,
        HttpContext ctx,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        IConfiguration configuration)
    {
        var externalInfo = await signInManager.GetExternalLoginInfoAsync();
        if (externalInfo is null)
        {
            return TypedResults.Problem(
                title: "Google authentication failed",
                detail: "The external login could not be completed. Please try again.",
                statusCode: StatusCodes.Status401Unauthorized);
        }

        var principal = externalInfo.Principal;

        var email = principal.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrWhiteSpace(email))
        {
            return TypedResults.Problem(
                title: "Google authentication failed",
                detail: "Google did not provide the email address required to create an account.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        var firstName = principal.FindFirstValue(ClaimTypes.GivenName) ?? string.Empty;
        var lastName = principal.FindFirstValue(ClaimTypes.Surname) ?? string.Empty;

        var user = await userManager.FindByEmailAsync(email);

        if (user is null)
        {
            user = new AppUser
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                UserName = email,
            };

            var resultCreateUser = await userManager.CreateAsync(user);

            if (!resultCreateUser.Succeeded)
            {
                return TypedResults.BadRequest(resultCreateUser.Errors.Select(e => e.Description));
            }

            await userManager.AddToRoleAsync(user, Roles.Member);
        }

        await signInManager.SignInAsync(user, isPersistent: false);
        await ctx.SignOutAsync(IdentityConstants.ExternalScheme);

        return TypedResults.Redirect(GetFrontendRedirect(configuration, returnUrl));
    }

    private static string GetFrontendRedirect(IConfiguration configuration, string? returnUrl)
    {
        // The Google callback runs on the API origin (localhost:5050), but the user must
        // return to the frontend origin (localhost:3000 locally, or the configured domain).
        var configuredBaseUrl = configuration["Frontend:BaseUrl"];

        // Configuration values are nullable strings. Validate the value so a missing URL,
        // a relative URL, or an unexpected scheme fails with a clear configuration error.
        if (!Uri.TryCreate(configuredBaseUrl, UriKind.Absolute, out var frontendBaseUrl)
            || frontendBaseUrl.Scheme is not ("http" or "https"))
        {
            throw new InvalidOperationException(
                "Frontend:BaseUrl must be configured as an absolute HTTP or HTTPS URL before Google authentication can be used.");
        }

        // returnUrl comes from the query string, so it is user-controlled. Accept only a
        // local path such as /dashboard; values such as //malicious.example fall back to /.
        var path = RedirectHttpResult.IsLocalUrl(returnUrl) ? returnUrl! : "/";

        // Combine the environment-specific frontend origin with the safe local path.
        return new Uri(frontendBaseUrl, path).AbsoluteUri;
    }
}
