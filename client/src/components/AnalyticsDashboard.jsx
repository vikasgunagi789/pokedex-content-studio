import {
  useMemo
} from "react";

import {
  getAnalytics
} from "../utils/analytics";

import AnalyticsCard from "./AnalyticsCard";

function AnalyticsDashboard({
  pokemonList = []
}) {
  const analytics =
    useMemo(
      () =>
        getAnalytics(
          pokemonList
        ),
      [pokemonList]
    );

  return (
    <div className="analytics-dashboard">

      <div className="analytics-grid">

        <AnalyticsCard
          title="Drawings"
          value={
            analytics.drawings
          }
          total={
            analytics.totalPokemon
          }
          description="Drawing production"
        />

        <AnalyticsCard
          title="Short Videos"
          value={
            analytics.shorts
          }
          total={
            analytics.totalPokemon
          }
          description="YouTube Shorts"
        />

        <AnalyticsCard
          title="Long Videos"
          value={
            analytics.longs
          }
          total={
            analytics.totalPokemon
          }
          description="Long-form videos"
        />

        <AnalyticsCard
          title="Fully Completed"
          value={
            analytics.fullyCompleted
          }
          total={
            analytics.totalPokemon
          }
          description="All three content types"
        />

      </div>

    </div>
  );
}

export default AnalyticsDashboard;