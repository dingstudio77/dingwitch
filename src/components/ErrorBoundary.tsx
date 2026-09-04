import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#580096] flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              ✦
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">화면을 불러오는 중 문제가 발생했습니다</h2>
            <p className="text-sm text-slate-600 mb-6">
              페이지를 새로고침하거나 다시 시도해 주세요.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-[#580096] hover:bg-[#48007d] text-white font-bold text-sm cursor-pointer transition-colors"
            >
              페이지 새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


