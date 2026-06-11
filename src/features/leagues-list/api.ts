import { api } from "../../lib/api";

export const fetchAllLeagues = async () => {
  const res = await api.get("all_leagues.php");
  return res.data;
};

export const fetchBadges = async (id: string) => {
  const res = await api.get(`search_all_seasons.php?badge=1&id=${id}`);
  return res.data;
};
