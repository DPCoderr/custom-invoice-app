/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HomePage } from "#/features/home/home-page";
import "#/i18n";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
    children?: ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe("Home", () => {
  it("renders the localized landing journey and invoice preview", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Create clear invoices without the clutter.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Set up your business profile, reuse services, and generate downloadable PDF invoices in one focused workflow.",
      ).textContent,
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Create account" })).toHaveProperty(
      "pathname",
      "/signup",
    );
    expect(screen.getByRole("table", { name: "Invoice preview" })).toBeTruthy();
    expect(screen.getByText("INV-2026-3654B204")).toBeTruthy();
    expect(screen.getByText("€1,100.00")).toBeTruthy();
  });
});
