function AnalyticsCard({
  title,
  value,
  total,
  description
}) {
  const percentage =
    total > 0
      ? Math.round(
          (value / total) * 100
        )
      : 0;

  return (
    <div className="analytics-card">

      <div className="analytics-card-header">

        <div>
          <span>
            {title}
          </span>

          <strong>
            {value} / {total}
          </strong>
        </div>

        <strong>
          {percentage}%
        </strong>

      </div>

      <div className="analytics-progress">

        <div
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

      {description && (
        <small>
          {description}
        </small>
      )}

    </div>
  );
}

export default AnalyticsCard;