import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#050506] text-[#F8F8FA] flex flex-col items-center justify-center p-8 z-50">
          <div className="max-w-xl w-full p-6 bg-[#0E0F14] border border-white/30 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                {this.props.fallbackTitle || 'M.I.K Universe Telemetry Notice'}
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              Rendering Interrupted
            </h2>
            <p className="font-mono text-xs text-red-400 bg-black/50 p-3 rounded border border-red-500/20 overflow-x-auto whitespace-pre-wrap">
              {this.state.error?.stack || this.state.error?.toString()}
            </p>
            {this.state.errorInfo && (
              <details open className="text-[11px] font-mono text-white/40 cursor-pointer">
                <summary className="hover:text-white/70">Component Stack Trace</summary>
                <pre className="mt-2 p-2 bg-black/60 rounded text-[10px] text-white/50 overflow-x-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded-lg hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all"
            >
              Reinitialize Universe
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
