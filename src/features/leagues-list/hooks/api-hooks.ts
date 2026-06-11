import { useQuery } from "@tanstack/react-query";
import * as leaguesApi from "../api";

export const useFetchAllLeagues = () => {
  return useQuery({
    queryKey: ["all-leagues"],
    queryFn: leaguesApi.fetchAllLeagues,
  });
};

export const useFetchBadges = (leagueId: string) => {
  return useQuery({
    queryKey: ["league-badges", leagueId],
    queryFn: () => leaguesApi.fetchBadges(leagueId),
    enabled: !!leagueId,
    staleTime: 1000 * 60 * 5,
  });
};
