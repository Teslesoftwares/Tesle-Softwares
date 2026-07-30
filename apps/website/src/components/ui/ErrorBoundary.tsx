import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-bg p-8">
          <div className="max-w-md text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">!</span>
            </div>
            <h2 className="text-lg font-semibold text-text mb-2">Something went wrong</h2>
            <p className="text-sm text-muted mb-4">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-accent text-black text-sm font-medium rounded-full hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] transition-all"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
