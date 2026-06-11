import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import LeagueCard from "./LeagueCard";
import type { League } from "../types";

const league: League = {
  idLeague: "4328",
  strLeague: "English Premier League",
  strSport: "Soccer",
};

describe("LeagueCard", () => {
  it("renders league details", () => {
    render(<LeagueCard league={league} onCardClick={vi.fn()} />);

    expect(screen.getByText("English Premier League")).toBeInTheDocument();
    expect(screen.getByText("Soccer")).toBeInTheDocument();
  });

  it("passes the league to the click handler", async () => {
    const user = userEvent.setup();
    const onCardClick = vi.fn();

    render(<LeagueCard league={league} onCardClick={onCardClick} />);

    await user.click(screen.getByRole("button"));

    expect(onCardClick).toHaveBeenCalledWith(league);
  });
});
