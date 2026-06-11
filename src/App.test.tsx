import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./features/leagues-list/LeaguesList", () => ({
  default: () => <div>Leagues list</div>,
}));

describe("App", () => {
  it("renders the page shell and leagues list", () => {
    render(<App />);

    expect(screen.getByRole("img", { name: "logo" })).toBeInTheDocument();
    expect(screen.getByText("Leagues list")).toBeInTheDocument();
  });
});
