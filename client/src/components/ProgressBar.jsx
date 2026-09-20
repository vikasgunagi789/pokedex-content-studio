import { calculatePercentage } from "../utils/progress";

function ProgressBar({
  completed = 0,
  total = 0,
  label = "Progress",
}) {
  const percentage = calculatePercentage(
    completed,
    total
  );

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>{label}</span>
        <strong>{percentage}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;