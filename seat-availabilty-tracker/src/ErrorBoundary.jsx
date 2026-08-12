import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 1. Catches errors during rendering & updates state
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 2. Logs error details (in production, you'd send this to Sentry, etc.)
  componentDidCatch(error, errorInfo) {
    console.error("🚨 ErrorBoundary caught an error:", error, errorInfo);
  }

  // 3. Resets state so the user can recover without page refresh
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-6 m-4 bg-red-50 border border-red-300 rounded-lg shadow-md text-center max-w-md mx-auto">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            ⚠️ Something went wrong!
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            An unexpected error occurred in this section of the application.
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;