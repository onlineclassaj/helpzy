import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { APP_VERSION } from '../constants/version';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    }

    handleReload = () => {
        // Force a hard reload bypassing cache
        window.location.reload(true);
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-100">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 mb-2">Something Went Wrong</h1>
                        <p className="text-gray-500 mb-6">
                            We're sorry, but the app encountered an unexpected error. Please refresh to try again.
                        </p>

                        <button
                            onClick={this.handleReload}
                            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Refresh App
                        </button>

                        <p className="text-xs text-gray-400 mt-6">
                            Helpzy v{APP_VERSION}
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 text-left">
                                <summary className="text-xs text-gray-500 cursor-pointer">Error Details</summary>
                                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto text-red-600">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
