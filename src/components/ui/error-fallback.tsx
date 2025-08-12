"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
}

export default function ErrorFallback({ 
  error, 
  resetError, 
  title = "Oops! Algo salió mal",
  message = "No pudimos cargar los eventos en este momento. Por favor, intenta de nuevo."
}: ErrorFallbackProps) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-2xl font-bold text-white mb-4">
          {title}
        </h2>

        {/* Error Message */}
        <p className="text-zinc-400 leading-relaxed mb-6">
          {message}
        </p>

        {/* Error Details (in development) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-left">
            <p className="text-red-400 text-sm font-mono">{error.message}</p>
          </div>
        )}

        {/* Retry Button */}
        {resetError && (
          <button
            onClick={resetError}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-medium rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
          >
            <RefreshCw size={16} />
            Intentar de nuevo
          </button>
        )}

        {/* Fallback action */}
        {!resetError && (
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-medium rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
          >
            <RefreshCw size={16} />
            Recargar página
          </button>
        )}
      </div>
    </div>
  );
}