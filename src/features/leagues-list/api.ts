import { api } from "../../lib/api";
import type { AllLeaguesResponse, BadgeResponse } from "./types";

export const fetchAllLeagues = async (): Promise<AllLeaguesResponse> => {
  const res = await api.get("all_leagues.php");
  return res.data;
};

export const fetchBadges = async (id: string): Promise<BadgeResponse> => {
  const res = await api.get(`search_all_seasons.php?badge=1&id=${id}`);
  return res.data;
};
