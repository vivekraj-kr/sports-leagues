import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Dropdown from "./Dropdown";

const options = [
  {
    id: 1,
    label: "Soccer",
    value: "soccer",
  },
  {
    id: 2,
    label: "Basketball",
    value: "basketball",
  },
];

describe("Dropdown", () => {
  it("renders the placeholder and sport options", () => {
    render(
      <Dropdown
        config={{ options, value: "", onDropdownChange: vi.fn() }}
      />,
    );

    expect(screen.getByRole("option", { name: "Select sport type" })).toHaveValue(
      "",
    );
    expect(screen.getByRole("option", { name: "Soccer" })).toHaveValue(
      "soccer",
    );
    expect(screen.getByRole("option", { name: "Basketball" })).toHaveValue(
      "basketball",
    );
  });

  it("calls the change handler when a sport is selected", async () => {
    const user = userEvent.setup();
    const onDropdownChange = vi.fn();

    render(
      <Dropdown
        config={{ options, value: "", onDropdownChange }}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "basketball");

    expect(onDropdownChange).toHaveBeenCalled();
  });
});
