import { ApiError } from "#/lib/api/client";
import { describe, expect, it } from "vitest";
import { projectAuthErrors } from "./api-errors";

describe("projectAuthErrors", () => {
  it("projects known fields case-insensitively and keeps unknown errors at root", () => {
    const result = projectAuthErrors(
      new ApiError("Validation failed", 400, {
        Email: ["Email is invalid."],
        unknown: ["Unknown failure."],
      }),
      ["email", "password"],
    );

    expect(result).toEqual({
      fields: { email: "Email is invalid." },
      root: "Validation failed",
    });
  });
});
