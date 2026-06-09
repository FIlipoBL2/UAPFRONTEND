import { ErrorBoundary } from "solid-js";

function GlobalErrorBoundary(props) {
  return (
    <ErrorBoundary fallback={(err, reset) => (
      <div style={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        height: "100vh",
        "background-color": "#202531",
        color: "#fff",
        "text-align": "center",
        padding: "20px"
      }}>
        <h1 style={{ color: "#ff4d4f" }}>Oops! Something went wrong.</h1>
        <p style={{ "max-width": "600px", "margin-bottom": "20px" }}>
          {err.toString()}
        </p>
        <button 
          onClick={reset}
          style={{
            padding: "10px 20px",
            "background-color": "#1b212f",
            color: "#fff",
            border: "1px solid #45506b",
            "border-radius": "5px",
            cursor: "pointer",
            "font-size": "16px",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2f384d'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1b212f'}
        >
          Try Again!
        </button>
      </div>
    )}>
      {props.children}
    </ErrorBoundary>
  );
}

export default GlobalErrorBoundary;
