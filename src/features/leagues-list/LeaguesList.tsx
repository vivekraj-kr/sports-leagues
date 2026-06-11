import Dropdown from "../../components/dropdown/Dropdown";
import SearchBar from "../../components/searchbar/SearchBar";
import LeagueCard from "./components/LeagueCard";
import { useFetchAllLeagues, useFetchBadges } from "./hooks/api-hooks";
import { useLeaguesSearch } from "./hooks/useLeaguesSearch";
import { useFilterByType } from "./hooks/useFilterByType";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import EmptyState from "../../components/empty-state/EmptyState";

const LeaguesList = () => {
  const { data: leagues } = useFetchAllLeagues();
  const { filteredData, onInputChange, query } = useLeaguesSearch(leagues);
  const { TYPE_OPTIONS, filteredByTypeData, onDropdownChange, type } =
    useFilterByType(filteredData);

  const [league, setLeague] = useState(null);
  const { data: badges, isLoading: isBadgesLoading } = useFetchBadges(
    league?.idLeague,
  );

  const onCardClick = (league) => {
    setLeague(league);
  };

  const onModalClose = () => {
    setLeague(null);
  };

  const hasNoFilteredLeagues = filteredByTypeData?.length === 0;
  const badgeImage = badges?.seasons?.find(
    (season) => season.strBadge,
  )?.strBadge;

  return (
    <>
      <div className="flex gap-3">
        <SearchBar
          config={{
            placeholder: "Search leagues...",
            value: query,
            onInputChange,
          }}
        />
        <Dropdown
          config={{
            options: TYPE_OPTIONS,
            onDropdownChange: onDropdownChange,
            value: type,
          }}
        />
      </div>

      <div className="my-5 grid sm:grid-cols-3 grid-cols-1 gap-3">
        {hasNoFilteredLeagues ? (
          <EmptyState
            title="No leagues found"
            description="Try changing the search term or sport type."
          />
        ) : (
          filteredByTypeData?.map((league) => {
            return (
              <LeagueCard
                onCardClick={onCardClick}
                key={league.idLeague}
                league={league}
              />
            );
          })
        )}
      </div>
      {league && (
        <Modal title={league?.strLeague} onModalClose={onModalClose}>
          <div>
            {badgeImage && (
              <img
                className="h-64 w-64 object-contain"
                src={badgeImage}
                alt={`${league?.strLeague} badge`}
              />
            )}

            {!badgeImage && !isBadgesLoading && (
              <EmptyState
                title="No badge found"
                description="This league does not have a badge image yet."
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default LeaguesList;
