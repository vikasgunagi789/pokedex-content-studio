import { useMemo, useState } from "react";

import DashboardStats from "../components/DashboardStats";
import ProgressBar from "../components/ProgressBar";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import ContentCard from "../components/ContentCard";

import { filterPokemon } from "../utils/pokemonFilter";
import {
  calculateOverallProgress,
} from "../utils/progress";

function Dashboard({
  pokemonList = [],
  onSelectPokemon,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPokemon = useMemo(() => {
    return filterPokemon(
      pokemonList,
      search,
      statusFilter
    );
  }, [
    pokemonList,
    search,
    statusFilter,
  ]);

  const progress = calculateOverallProgress(
    pokemonList
  );

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="section-eyebrow">
            DASHBOARD
          </p>

          <h1>Pokédex Content Studio</h1>

          <p>
            Track your Pokémon drawing content and
            manage your publishing workflow.
          </p>
        </div>
      </div>

      <DashboardStats
        pokemonList={pokemonList}
      />

      <ProgressBar
        completed={progress.completed}
        total={progress.total}
        label="Overall Content Progress"
      />

      <div className="dashboard-toolbar">
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <StatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      <div className="dashboard-results-header">
        <h2>Pokémon</h2>

        <span>
          {filteredPokemon.length} result
          {filteredPokemon.length !== 1
            ? "s"
            : ""}
        </span>
      </div>

      {filteredPokemon.length === 0 ? (
        <div className="empty-workspace">
          <h3>No Pokémon found</h3>

          <p>
            Try changing your search or status
            filter.
          </p>
        </div>
      ) : (
        <div className="content-card-grid">
          {filteredPokemon.map((pokemon) => (
            <ContentCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() =>
                onSelectPokemon?.(pokemon)
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Dashboard;