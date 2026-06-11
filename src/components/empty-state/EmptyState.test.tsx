import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("renders the title and description", () => {
    render(
      <EmptyState
        title="No leagues found"
        description="Try changing the search term or sport type."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "No leagues found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Try changing the search term or sport type."),
    ).toBeInTheDocument();
  });

  it("renders without a description", () => {
    render(<EmptyState title="No badge found" />);

    expect(
      screen.getByRole("heading", { name: "No badge found" }),
    ).toBeInTheDocument();
  });
});
