import { useEffect, useState } from "react";

import "./App.css";

import pokemonData from "./data/pokemon";
import PokemonDetail from "./pages/PokemonDetail";

import BottomNavigation from "./components/BottomNavigation";

import { getPokemonImage } from "./utils/pokemonImage";

const STORAGE_KEY = "pokedex-content-studio";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  
const [pokemon, setPokemon] = useState(() => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      if (Array.isArray(parsedData)) {
        // Preserve saved content, but restore any missing
        // Pokémon from the original 151-entry data.
        const savedById = new Map(
          parsedData.map((item) => [item.id, item])
        );

        return pokemonData.map((original) => {
          const saved = savedById.get(original.id);

          if (!saved) {
            return {
              ...original,
              drawing: { ...original.drawing },
              short: { ...original.short },
              long: { ...original.long },
            };
          }

          return {
            ...original,
            ...saved,
            number: original.id,
            drawing: {
              ...original.drawing,
              ...saved.drawing,
            },
            short: {
              ...original.short,
              ...saved.short,
            },
            long: {
              ...original.long,
              ...saved.long,
            },
          };
        });
      }
    }
  } catch (error) {
    console.error("Unable to load saved content:", error);
  }

  return pokemonData.map((item) => ({
    ...item,
    number: item.id,
    drawing: { ...item.drawing },
    short: { ...item.short },
    long: { ...item.long },
  }));
});


  const [selectedPokemon, setSelectedPokemon] =
    useState(null);

  /* =====================================================
     AUTO SAVE
  ===================================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(pokemon)
      );
    } catch (error) {
      console.error(
        "Unable to save content:",
        error
      );
    }
  }, [pokemon]);

  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalPokemon = pokemon.length;

  const completedDrawings = pokemon.filter(
    (item) =>
      item.drawing?.status === "completed" ||
      item.drawing?.status === "published"
  ).length;

  const completedShorts = pokemon.filter(
    (item) =>
      item.short?.status === "completed" ||
      item.short?.status === "published"
  ).length;

  const completedLongs = pokemon.filter(
    (item) =>
      item.long?.status === "completed" ||
      item.long?.status === "published"
  ).length;

  /* =====================================================
     POKÉMON UPDATE
  ===================================================== */

  function updatePokemon(updatedPokemon) {
    setPokemon((currentPokemon) =>
      currentPokemon.map((item) =>
        item.id === updatedPokemon.id
          ? updatedPokemon
          : item
      )
    );

    setSelectedPokemon(updatedPokemon);
  }

  function updateAllPokemon(updatedPokemonList) {
    if (!Array.isArray(updatedPokemonList)) {
      return;
    }

    setPokemon(updatedPokemonList);

    if (selectedPokemon) {
      const updatedSelectedPokemon =
        updatedPokemonList.find(
          (item) => item.id === selectedPokemon.id
        );

      if (updatedSelectedPokemon) {
        setSelectedPokemon(
          updatedSelectedPokemon
        );
      }
    }
  }

  /* =====================================================
     OPEN / CLOSE POKÉMON
  ===================================================== */

  function openPokemon(pokemonItem) {
    setSelectedPokemon(pokemonItem);
  }

  function closePokemon() {
    setSelectedPokemon(null);
  }

  /* =====================================================
     RESET
  ===================================================== */

  function resetAllContent() {
    const confirmed = window.confirm(
      "Reset all Pokédex content? This will remove all generated and edited content."
    );

    if (!confirmed) {
      return;
    }

    const freshData =
      pokemonData.map((item) => ({
        ...item,
        drawing: {
          ...item.drawing
        },
        short: {
          ...item.short
        },
        long: {
          ...item.long
        }
      }));

    setPokemon(freshData);

    setSelectedPokemon(null);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(
        "Unable to reset saved content:",
        error
      );
    }
  }

  /* =====================================================
     EXPORT
  ===================================================== */

  function exportContent() {
    try {
      const json = JSON.stringify(
        pokemon,
        null,
        2
      );

      const blob = new Blob(
        [json],
        {
          type: "application/json"
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "pokedex-content-studio.json";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Unable to export content:",
        error
      );

      window.alert(
        "Unable to export content."
      );
    }
  }

  /* =====================================================
     SELECTED POKÉMON DETAIL PAGE
  ===================================================== */

  if (selectedPokemon) {
    return (
      <div className="app">

        <main className="main-content">

          <Topbar
            title={selectedPokemon.name}
            onReset={resetAllContent}
            onExport={exportContent}
          />

          <section className="content-area">

            <PokemonDetail
              pokemon={selectedPokemon}
              onBack={closePokemon}
              onUpdate={updatePokemon}
            />

          </section>

        </main>

        <BottomNavigation
          activePage={activePage}
          setActivePage={(page) => {
            setSelectedPokemon(null);
            setActivePage(page);
          }}
        />

      </div>
    );
  }

  /* =====================================================
     MAIN APPLICATION
  ===================================================== */

  return (
    <div className="app">

      <main className="main-content">

        <Topbar
          title={getPageTitle(activePage)}
          onReset={resetAllContent}
          onExport={exportContent}
        />

        <section className="content-area">

          {activePage === "dashboard" && (
            <Dashboard
              totalPokemon={totalPokemon}
              completedDrawings={
                completedDrawings
              }
              completedShorts={
                completedShorts
              }
              completedLongs={
                completedLongs
              }
              pokemon={pokemon}
              onOpenPokemon={openPokemon}
            />
          )}

          {activePage === "pokedex" && (
            <PokemonPage
              pokemon={pokemon}
              onOpenPokemon={
                openPokemon
              }
            />
          )}

          {activePage === "schedule" && (
            <SchedulePage
              pokemon={pokemon}
              onUpdatePokemon={updatePokemon}
            />
          )}

          {activePage === "progress" && (
            <ProgressPage
              totalPokemon={
                totalPokemon
              }
              completedDrawings={
                completedDrawings
              }
              completedShorts={
                completedShorts
              }
              completedLongs={
                completedLongs
              }
            />
          )}

        </section>

      </main>

      <BottomNavigation
        activePage={activePage}
        setActivePage={(page) => {
          setSelectedPokemon(null);
          setActivePage(page);
        }}
      />

    </div>
  );
}

/* =========================================================
   TOPBAR
========================================================= */

function Topbar({
  title,
  onReset,
  onExport
}) {
  return (
    <header className="topbar">

      <div className="topbar-left">

        <div>

          <p className="topbar-subtitle">
            POKÉDEX CONTENT STUDIO
          </p>

          <h1 className="topbar-title">
            {title}
          </h1>

        </div>

      </div>

      <div className="topbar-right">

        <button
          type="button"
          className="export-button"
          onClick={onExport}
        >
          Export JSON
        </button>

        <button
          type="button"
          className="reset-button"
          onClick={onReset}
        >
          Reset
        </button>

        <button
          type="button"
          className="profile-button"
          aria-label="Profile"
        >
          VG
        </button>

      </div>

    </header>
  );
}

/* =========================================================
   PAGE TITLE
========================================================= */

function getPageTitle(page) {
  const titles = {
    dashboard: "Dashboard",
    pokedex: "Pokédex",
    schedule: "Content Schedule",
    progress: "Progress"
  };

  return (
    titles[page] ||
    "Dashboard"
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  totalPokemon,
  completedDrawings,
  completedShorts,
  completedLongs
}) {
  const totalTasks =
    totalPokemon * 3;

  const completedTasks =
    completedDrawings +
    completedShorts +
    completedLongs;

  const percentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );

  return (
    <div className="page">

      <div className="welcome-section">

        <span className="section-label">
          CONTENT OVERVIEW
        </span>

        <h1>
          Build your Pokédex
          content library.
        </h1>

        <p>
          Track drawings, Shorts and
          long-form videos across all
          151 original Pokémon.
        </p>

      </div>

      <div className="overall-progress">

        <div
          className="progress-ring"
          style={{
            background: `conic-gradient(
              var(--primary) ${percentage * 3.6}deg,
              #e2e8f0 ${percentage * 3.6}deg
            )`
          }}
        >
          <span>
            {percentage}%
          </span>
        </div>

        <div>

          <strong>
            Overall Progress
          </strong>

          <p>
            {completedTasks} of{" "}
            {totalTasks} tasks completed
          </p>

        </div>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Pokémon"
          value={totalPokemon}
          description="Original Kanto Pokédex"
          icon="pokemon"
        />

        <StatCard
          title="Drawings"
          value={completedDrawings}
          description={`${Math.max(
            totalPokemon -
              completedDrawings,
            0
          )} remaining`}
          icon="drawing"
        />

        <StatCard
          title="Shorts"
          value={completedShorts}
          description={`${Math.max(
            totalPokemon -
              completedShorts,
            0
          )} remaining`}
          icon="short"
        />

        <StatCard
          title="Long Videos"
          value={completedLongs}
          description={`${Math.max(
            totalPokemon -
              completedLongs,
            0
          )} remaining`}
          icon="video"
        />

      </div>

      <div className="dashboard-grid">

        <div className="panel">

          <div className="dashboard-section-heading">

            <div>

              <span className="section-label">
                CONTENT QUEUES
              </span>

              <h2>
                Production Pipeline
              </h2>

            </div>

          </div>

          <QueueRow
            title="Drawing Queue"
            completed={
              completedDrawings
            }
            total={totalPokemon}
          />

          <QueueRow
            title="Short Queue"
            completed={
              completedShorts
            }
            total={totalPokemon}
          />

          <QueueRow
            title="Long Video Queue"
            completed={
              completedLongs
            }
            total={totalPokemon}
          />

        </div>

        <div className="panel">

          <div className="dashboard-section-heading">

            <div>

              <span className="section-label">
                NEXT UP
              </span>

              <h2>
                Upcoming Content
              </h2>

            </div>

          </div>

          <UpcomingPokemon
            number="001"
            name="Bulbasaur"
          />

          <UpcomingPokemon
            number="002"
            name="Ivysaur"
          />

          <UpcomingPokemon
            number="003"
            name="Venusaur"
          />

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  description,
  icon
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-icon">
        <span className={`stat-symbol ${icon}`}>
          {icon === "pokemon" && "◉"}
          {icon === "drawing" && "✎"}
          {icon === "short" && "▶"}
          {icon === "video" && "▤"}
        </span>
      </div>

      <div>

        <h3>
          {title}
        </h3>

        <strong>
          {value}
        </strong>

        <p>
          {description}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   QUEUE ROW
========================================================= */

function QueueRow({
  title,
  completed,
  total
}) {
  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) *
            100
        );

  return (
    <div className="queue-row">

      <div className="queue-row-content">

        <strong>
          {title}
        </strong>

        <span>
          {completed} of {total} completed
        </span>

      </div>

      <div
        className="queue-progress"
        style={{
          flex: 1,
          height: "7px",
          overflow: "hidden",
          borderRadius: "999px",
          background: "#eef2f7"
        }}
      >

        <div
          className="queue-progress-fill"
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg, var(--primary), var(--accent))"
          }}
        />

      </div>

      <strong className="queue-percentage">
        {percentage}%
      </strong>

    </div>
  );
}

/* =========================================================
   UPCOMING POKÉMON
========================================================= */

function UpcomingPokemon({
  number,
  name
}) {
  return (
    <div className="upcoming-card">
      <div className="pokemon-number">
        {number}
      </div>

      <div>
        <strong>{name}</strong>

        <span>
          Drawing → Short → Long Video
        </span>
      </div>

      <span className="pending-badge">
        Planned
      </span>
    </div>
  );
}

/* =========================================================
   STATUS HELPERS
========================================================= */

function getOverallPokemonStatus(
  pokemon
) {
  const statuses = [
    pokemon.drawing?.status ||
      "pending",

    pokemon.short?.status ||
      "pending",

    pokemon.long?.status ||
      "pending"
  ];

  if (
    statuses.every(
      (status) =>
        status === "published"
    )
  ) {
    return "published";
  }

  if (
    statuses.some(
      (status) =>
        status === "in-progress"
    )
  ) {
    return "in-progress";
  }

  if (
    statuses.some(
      (status) =>
        status === "completed" ||
        status === "published"
    )
  ) {
    return "completed";
  }

  return "pending";
}

function formatStatus(status) {
  if (
    status === "in-progress"
  ) {
    return "In Progress";
  }

  if (
    status === "published"
  ) {
    return "Published";
  }

  if (
    status === "completed"
  ) {
    return "Completed";
  }

  return "Pending";
}

/* =========================================================
   POKÉDEX PAGE
========================================================= */

function PokemonPage({
  pokemon,
  onOpenPokemon
}) {
  const [search, setSearch] =
    useState("");

  const filteredPokemon =
    pokemon.filter((item) => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      if (!searchValue) {
        return true;
      }

      const nameMatch =
        item.name
          ?.toLowerCase()
          .includes(searchValue);

      const numberMatch =
        String(item.number)
          .includes(searchValue);

      return (
        nameMatch ||
        numberMatch
      );
    });

  return (
    <div className="page">

      <div className="dashboard-section-heading">

        <div>

          <span className="section-label">
            KANTO POKÉDEX
          </span>

          <h2>
  All Pokémon ({filteredPokemon.length} / {pokemon.length})
</h2>

          <p>
            Manage content production
            for every Pokémon.
          </p>

        </div>

      </div>

      <div className="pokemon-page-controls">

        <input
          className="search-input"
          type="text"
          placeholder="Search by Pokémon name or number..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

      </div>

      <div className="pokemon-grid">

        {filteredPokemon.map(
          (item) => {
            const overallStatus =
              getOverallPokemonStatus(
                item
              );

            return (
              <button
                type="button"
                className="pokemon-card"
                key={item.id}
                onClick={() =>
                  onOpenPokemon(item)
                }
              >

                <div className="pokemon-card-top">

                  <span>
                    #{item.number}
                  </span>

                  <span
                    className={`content-badge ${overallStatus}`}
                  >
                    {formatStatus(
                      overallStatus
                    )}
                  </span>

                </div>

                <img
                  className="pokemon-card-image"
                  src={getPokemonImage(
                    item.id
                  )}
                  alt={item.name}
                  loading="lazy"
                />

                <h3>
                  {item.name}
                </h3>

                <div className="content-status">

                  <StatusItem
                    label="Drawing"
                    status={
                      item.drawing
                        ?.status ||
                      "pending"
                    }
                  />

                  <StatusItem
                    label="Short"
                    status={
                      item.short
                        ?.status ||
                      "pending"
                    }
                  />

                  <StatusItem
                    label="Long"
                    status={
                      item.long
                        ?.status ||
                      "pending"
                    }
                  />

                </div>

              </button>
            );
          }
        )}

      </div>

      {filteredPokemon.length ===
        0 && (
        <div className="empty-state">

          <h3>
            No Pokémon found
          </h3>

          <p>
            Try another Pokémon name
            or number.
          </p>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   STATUS ITEM
========================================================= */

function StatusItem({
  label,
  status
}) {
  return (
    <div className="status-item">

      <span>
        {label}
      </span>

      <span
        className={`status ${status}`}
      >
        {formatStatus(status)}
      </span>

    </div>
  );
}

/* =========================================================
   SCHEDULE PAGE
========================================================= */

function SchedulePage({
  pokemon,
  onUpdatePokemon
}) {
  const [selectedPokemonId, setSelectedPokemonId] =
    useState("");

  const [contentType, setContentType] =
    useState("drawing");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const scheduledItems = [];

  pokemon.forEach((item) => {
    const contentTypes = [
      {
        key: "drawing",
        label: "Drawing",
        icon: "✎"
      },
      {
        key: "short",
        label: "Short Video",
        icon: "▶"
      },
      {
        key: "long",
        label: "Long Video",
        icon: "▤"
      }
    ];

    contentTypes.forEach((content) => {
      const scheduledDate =
        item[content.key]?.scheduledDate;

      if (scheduledDate) {
        scheduledItems.push({
          pokemon: item,
          type: content.key,
          label: content.label,
          icon: content.icon,
          date: scheduledDate
        });
      }
    });
  });

  scheduledItems.sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  );

  const filteredItems =
    filter === "all"
      ? scheduledItems
      : scheduledItems.filter(
          (item) =>
            item.type === filter
        );

  function addSchedule() {
    if (
      !selectedPokemonId ||
      !selectedDate
    ) {
      window.alert(
        "Please select a Pokémon and date."
      );
      return;
    }

    const selectedPokemon =
      pokemon.find(
        (item) =>
          String(item.id) ===
          String(selectedPokemonId)
      );

    if (!selectedPokemon) {
      return;
    }

    const updatedPokemon = {
      ...selectedPokemon,

      [contentType]: {
        ...(selectedPokemon[
          contentType
        ] || {}),

        scheduledDate:
          selectedDate
      }
    };

    onUpdatePokemon(
      updatedPokemon
    );

    setSelectedPokemonId("");
    setSelectedDate("");
  }

  function removeSchedule(item) {
    const updatedPokemon = {
      ...item.pokemon,

      [item.type]: {
        ...(item.pokemon[item.type] || {})
      }
    };

    delete updatedPokemon[
      item.type
    ].scheduledDate;

    onUpdatePokemon(
      updatedPokemon
    );
  }

  function formatDate(dateString) {
    if (!dateString) {
      return "No date";
    }

    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  }

  function getDayName(dateString) {
    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        weekday: "long"
      }
    );
  }

  return (
    <div className="page schedule-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="dashboard-section-heading schedule-header">

        <div>
          <span className="section-label">
            CONTENT PLANNER
          </span>

          <h2>
            Content Schedule
          </h2>

          <p>
            Plan when you want to create
            and publish your Pokémon content.
          </p>
        </div>

        <div className="schedule-summary">
          <strong>
            {scheduledItems.length}
          </strong>

          <span>
            Scheduled Items
          </span>
        </div>

      </div>

      {/* =================================================
          SCHEDULE CREATOR
      ================================================= */}

      <div className="schedule-create-panel">

        <div className="schedule-create-heading">

          <div>
            <span className="section-label">
              ADD TO SCHEDULE
            </span>

            <h3>
              Plan New Content
            </h3>

            <p>
              Choose a Pokémon, content type
              and date.
            </p>
          </div>

        </div>

        <div className="schedule-form">

          <div className="schedule-form-field">

            <label>
              Pokémon
            </label>

            <select
              value={selectedPokemonId}
              onChange={(event) =>
                setSelectedPokemonId(
                  event.target.value
                )
              }
            >
              <option value="">
                Select Pokémon
              </option>

              {pokemon.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    #{String(
                      item.number
                    ).padStart(
                      3,
                      "0"
                    )}{" "}
                    {item.name}
                  </option>
                )
              )}

            </select>

          </div>

          <div className="schedule-form-field">

            <label>
              Content Type
            </label>

            <select
              value={contentType}
              onChange={(event) =>
                setContentType(
                  event.target.value
                )
              }
            >
              <option value="drawing">
                Drawing
              </option>

              <option value="short">
                Short Video
              </option>

              <option value="long">
                Long Video
              </option>
            </select>

          </div>

          <div className="schedule-form-field">

            <label>
              Schedule Date
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(event) =>
                setSelectedDate(
                  event.target.value
                )
              }
            />

          </div>

          <button
            type="button"
            className="schedule-add-button"
            onClick={addSchedule}
          >
            Add to Schedule
          </button>

        </div>

      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="schedule-toolbar">

        <div>
          <strong>
            Upcoming Content
          </strong>

          <span>
            {filteredItems.length} scheduled
          </span>
        </div>

        <div className="schedule-filters">

          <button
            type="button"
            className={
              filter === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </button>

          <button
            type="button"
            className={
              filter === "drawing"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("drawing")
            }
          >
            Drawing
          </button>

          <button
            type="button"
            className={
              filter === "short"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("short")
            }
          >
            Shorts
          </button>

          <button
            type="button"
            className={
              filter === "long"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("long")
            }
          >
            Long Video
          </button>

        </div>

      </div>

      {/* =================================================
          SCHEDULE LIST
      ================================================= */}

      {filteredItems.length > 0 ? (

        <div className="schedule-list">

          {filteredItems.map(
            (item, index) => (

              <div
                className="schedule-card"
                key={`${item.pokemon.id}-${item.type}`}
              >

                {/* DATE */}

                <div className="schedule-date-box">

                  <span>
                    {getDayName(
                      item.date
                    )}
                  </span>

                  <strong>
                    {new Date(
                      `${item.date}T00:00:00`
                    ).getDate()}
                  </strong>

                  <small>
                    {new Date(
                      `${item.date}T00:00:00`
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        month: "short"
                      }
                    )}
                  </small>

                </div>

                {/* POKÉMON */}

                <div className="schedule-pokemon-info">

                  <img
                    src={getPokemonImage(
                      item.pokemon.id
                    )}
                    alt={
                      item.pokemon.name
                    }
                    className="schedule-pokemon-image"
                  />

                  <div>

                    <span className="schedule-pokemon-number">
                      #
                      {String(
                        item.pokemon.number
                      ).padStart(
                        3,
                        "0"
                      )}
                    </span>

                    <h3>
                      {item.pokemon.name}
                    </h3>

                    <p>
                      Scheduled for{" "}
                      {formatDate(
                        item.date
                      )}
                    </p>

                  </div>

                </div>

                {/* CONTENT TYPE */}

                <div className="schedule-type">

                  <span className="schedule-type-icon">
                    {item.icon}
                  </span>

                  <div>
                    <strong>
                      {item.label}
                    </strong>

                    <span>
                      {item.type ===
                        "drawing" &&
                        "Artwork production"}

                      {item.type ===
                        "short" &&
                        "Short-form video"}

                      {item.type ===
                        "long" &&
                        "Long-form video"}
                    </span>
                  </div>

                </div>

                {/* STATUS */}

                <div className="schedule-status">

                  <span className="pending-badge">
                    Planned
                  </span>

                </div>

                {/* REMOVE */}

                <button
                  type="button"
                  className="schedule-remove-button"
                  onClick={() =>
                    removeSchedule(
                      item
                    )
                  }
                  title="Remove from schedule"
                >
                  ×
                </button>

              </div>

            )
          )}

        </div>

      ) : (

        <div className="schedule-empty">

          <div className="schedule-empty-icon">
            📅
          </div>

          <h3>
            No content scheduled
          </h3>

          <p>
            Choose a Pokémon, content type
            and date above to create your
            first schedule item.
          </p>

        </div>

      )}

    </div>
  );
}

/* =========================================================
   PROGRESS PAGE
========================================================= */

function ProgressPage({
  totalPokemon,
  completedDrawings,
  completedShorts,
  completedLongs
}) {
  const metrics = [
    {
      name: "Drawings",
      completed:
        completedDrawings,
      total: totalPokemon
    },
    {
      name: "Short Videos",
      completed:
        completedShorts,
      total: totalPokemon
    },
    {
      name: "Long Videos",
      completed:
        completedLongs,
      total: totalPokemon
    }
  ];

  return (
    <div className="page">

      <div className="dashboard-section-heading">

        <div>

          <span className="section-label">
            ANALYTICS
          </span>

          <h2>
            Production Progress
          </h2>

          <p>
            Monitor your content
            production across every queue.
          </p>

        </div>

      </div>

      <div className="progress-list">

        {metrics.map(
          (metric) => {
            const percentage =
              metric.total === 0
                ? 0
                : Math.round(
                    (metric.completed /
                      metric.total) *
                      100
                  );

            return (
              <div
                className="progress-card"
                key={metric.name}
              >

                <div className="progress-card-header">

                  <div>

                    <strong>
                      {metric.name}
                    </strong>

                    <span>
                      {metric.completed}{" "}
                      of{" "}
                      {metric.total}{" "}
                      completed
                    </span>

                  </div>

                  <strong>
                    {percentage}%
                  </strong>

                </div>

                <div className="large-progress">

                  <div
                    style={{
                      width: `${percentage}%`
                    }}
                  />

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

export default App;