function LoadingState({
  message = "Loading..."
}) {
  return (
    <div className="loading-state">

      <div className="loading-spinner"></div>

      <strong>
        {message}
      </strong>

    </div>
  );
}

export default LoadingState;