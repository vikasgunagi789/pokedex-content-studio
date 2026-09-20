function ErrorMessage({
  message,
  onRetry
}) {
  return (
    <div className="error-message">

      <div>
        <strong>
          Something went wrong
        </strong>

        <p>
          {message ||
            "Unable to load this section."}
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          className="secondary-button"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}

    </div>
  );
}

export default ErrorMessage;