/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HomePage } from "#/features/home/home-page";
import "#/i18n";

afterEach(cleanup);

describe("Home", () => {
  it("renders application copy from English resources", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading").textContent).toBe("Invoice Generator");
    expect(
      screen.getByText(
        "A focused learning app for creating reusable services and invoices.",
      ).textContent,
    ).toBeTruthy();
  });
});
