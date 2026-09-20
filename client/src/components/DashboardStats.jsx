import {
  getContentStats,
} from "../utils/contentStats";

function DashboardStats({ pokemonList = [] }) {
  const stats = getContentStats(pokemonList);

  return (
    <div className="dashboard-stats">
      <div className="dashboard-stat-card">
        <span>Total</span>
        <strong>{stats.total}</strong>
      </div>

      <div className="dashboard-stat-card">
        <span>Pending</span>
        <strong>{stats.pending}</strong>
      </div>

      <div className="dashboard-stat-card">
        <span>In Progress</span>
        <strong>{stats.inProgress}</strong>
      </div>

      <div className="dashboard-stat-card">
        <span>Completed</span>
        <strong>{stats.completed}</strong>
      </div>

      <div className="dashboard-stat-card">
        <span>Published</span>
        <strong>{stats.published}</strong>
      </div>
    </div>
  );
}

export default DashboardStats;