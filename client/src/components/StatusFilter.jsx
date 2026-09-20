import { CONTENT_STATUSES } from "../utils/contentStatus";

function StatusFilter({ value = "all", onChange }) {
  return (
    <div className="status-filter">
      <label htmlFor="status-filter">
        Status
      </label>

      <select
        id="status-filter"
        value={value}
        onChange={(event) => {
          if (onChange) {
            onChange(event.target.value);
          }
        }}
      >
        <option value="all">
          All Statuses
        </option>

        {CONTENT_STATUSES.map((status) => (
          <option
            key={status.id}
            value={status.id}
          >
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StatusFilter;