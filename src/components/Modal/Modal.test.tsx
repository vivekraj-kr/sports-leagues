import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders title and children", () => {
    render(
      <Modal title="Premier League" onModalClose={vi.fn()}>
        <img src="/badge.png" alt="Premier League badge" />
      </Modal>,
    );

    expect(
      screen.getByRole("heading", { name: "Premier League" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Premier League badge" }),
    ).toBeInTheDocument();
  });

  it("calls close handler when close button is clicked", async () => {
    const user = userEvent.setup();
    const onModalClose = vi.fn();

    render(
      <Modal title="Premier League" onModalClose={onModalClose}>
        Badge content
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Close modal" }));

    expect(onModalClose).toHaveBeenCalledTimes(1);
  });
});
