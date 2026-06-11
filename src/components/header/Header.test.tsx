import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("renders the linked logo", () => {
    render(<Header />);

    const logo = screen.getByRole("img", { name: "logo" });

    expect(logo).toHaveAttribute("src", "/logo.svg");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
