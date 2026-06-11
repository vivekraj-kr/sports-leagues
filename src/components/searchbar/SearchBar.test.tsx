import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders a controlled search input", () => {
    render(
      <SearchBar
        config={{
          placeholder: "Search leagues...",
          value: "premier",
          onInputChange: vi.fn(),
        }}
      />,
    );

    expect(screen.getByPlaceholderText("Search leagues...")).toHaveValue(
      "premier",
    );
  });

  it("calls the change handler when typing", async () => {
    const user = userEvent.setup();
    const onInputChange = vi.fn();

    render(
      <SearchBar
        config={{
          placeholder: "Search leagues...",
          value: "",
          onInputChange,
        }}
      />,
    );

    await user.type(screen.getByPlaceholderText("Search leagues..."), "nba");

    expect(onInputChange).toHaveBeenCalled();
  });
});
