
import { useMemo, useState } from "react";
import "./VideoVault.css";

const VIDEO_TYPES = ["Short", "Long-form"];

function VideoVault({
  pokemon = [],
  videos = [],
  onAddVideo,
  onDeleteVideo,
}) {
  const [title, setTitle] = useState("");
  const [pokemonId, setPokemonId] = useState("");
  const [videoType, setVideoType] = useState("Short");
  const [videoUrl, setVideoUrl] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [error, setError] = useState("");

  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesSearch =
        video.title?.toLowerCase().includes(query) ||
        video.pokemonName?.toLowerCase().includes(query);

      const matchesType =
        filterType === "All" || video.videoType === filterType;

      return matchesSearch && matchesType;
    });
  }, [videos, search, filterType]);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!title.trim() || !pokemonId || !videoUrl.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(videoUrl.trim());
    } catch {
      setError("Please enter a valid video URL.");
      return;
    }

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "res.cloudinary.com" ||
      !parsedUrl.pathname.includes("/video/upload/")
    ) {
      setError(
        "Enter a direct HTTPS Cloudinary video URL containing /video/upload/."
      );
      return;
    }

    const selectedPokemon = pokemon.find(
      (item) => String(item.id) === String(pokemonId)
    );

    if (!selectedPokemon) {
      setError("Please select a valid Pokémon.");
      return;
    }

    onAddVideo({
      id: crypto.randomUUID(),
      title: title.trim(),
      pokemonId: selectedPokemon.id,
      pokemonName: selectedPokemon.name,
      videoType,
      url: parsedUrl.href,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setPokemonId("");
    setVideoType("Short");
    setVideoUrl("");
  }

  function getDownloadUrl(url) {
    return url.replace(
      "/video/upload/",
      "/video/upload/fl_attachment/"
    );
  }

  return (
    <main className="video-vault">
      <header className="video-vault-header">
        <div>
          <p className="video-vault-eyebrow">VG POKÉSTUDIO</p>
          <h1>Video Vault</h1>
          <p className="video-vault-subtitle">
            Store, organize, watch, and retrieve your drawing videos.
          </p>
        </div>

        <div className="video-vault-count">
          <strong>{videos.length}</strong>
          <span>Saved videos</span>
        </div>
      </header>

      <section className="video-vault-form-section">
        <h2>Add a video</h2>
        <p>Paste the direct video URL from Cloudinary.</p>

        <form className="video-vault-form" onSubmit={handleSubmit}>
          <label>
            Video title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Charizard drawing timelapse"
              required
            />
          </label>

          <label>
            Pokémon
            <select
              value={pokemonId}
              onChange={(event) => setPokemonId(event.target.value)}
              required
            >
              <option value="">Select Pokémon</option>
              {pokemon.map((item) => (
                <option key={item.id} value={item.id}>
                  #{item.id} {item.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Video format
            <select
              value={videoType}
              onChange={(event) => setVideoType(event.target.value)}
            >
              {VIDEO_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label>
            Cloudinary video URL
            <input
              type="url"
              value={videoUrl}
              onChange={(event) => setVideoUrl(event.target.value)}
              placeholder="https://res.cloudinary.com/..."
              required
            />
          </label>

          {error && (
            <p className="video-vault-error" role="alert">
              {error}
            </p>
          )}

          <button className="video-vault-submit" type="submit">
            Save video
          </button>
        </form>
      </section>

      <section className="video-vault-library">
        <div className="video-vault-library-header">
          <div>
            <h2>Your videos</h2>
            <p>Find a saved video whenever you need it.</p>
          </div>

          <div className="video-vault-filters">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search videos..."
              aria-label="Search videos"
            />

            <select
              value={filterType}
              onChange={(event) => setFilterType(event.target.value)}
              aria-label="Filter by video format"
            >
              <option value="All">All formats</option>
              <option value="Short">Shorts</option>
              <option value="Long-form">Long-form</option>
            </select>
          </div>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="video-vault-empty">
            <h3>No videos found</h3>
            <p>Add a Cloudinary video URL using the form above.</p>
          </div>
        ) : (
          <div className="video-vault-grid">
            {filteredVideos.map((video) => (
              <article className="video-vault-card" key={video.id}>
                <video
                  className="video-vault-player"
                  src={video.url}
                  controls
                  preload="metadata"
                  playsInline
                />

                <div className="video-vault-card-content">
                  <div className="video-vault-badges">
                    <span>
                      #{video.pokemonId} {video.pokemonName}
                    </span>
                    <span>{video.videoType}</span>
                  </div>

                  <h3>{video.title}</h3>

                  <a
                    className="video-vault-open"
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open video
                  </a>

                  <a
                    className="video-vault-download"
                    href={getDownloadUrl(video.url)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download video
                  </a>

                  <button
                    className="video-vault-delete"
                    type="button"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Remove "${video.title}" from the vault? The Cloudinary file will not be deleted.`
                      );

                      if (confirmed) onDeleteVideo(video.id);
                    }}
                  >
                    Remove from vault
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default VideoVault;
