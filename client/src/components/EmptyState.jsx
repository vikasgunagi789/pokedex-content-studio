function EmptyState({
  title = "Nothing here yet",
  message = "There is no content to display.",
  actionLabel,
  onAction
}) {
  return (
    <div className="empty-state enhanced">

      <div className="empty-state-icon">
        —
      </div>

      <strong>
        {title}
      </strong>

      <p>
        {message}
      </p>

      {actionLabel &&
        onAction && (
          <button
            type="button"
            className="primary-button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}

    </div>
  );
}

export default EmptyState;