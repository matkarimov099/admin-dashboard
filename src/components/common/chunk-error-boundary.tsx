import { useEffect } from 'react';
import { useRouteError } from 'react-router';

const RETRY_KEY = 'chunk-retry';
const MAX_RETRIES = 2;

function isChunkError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('Failed to fetch') ||
      error.message.includes('dynamically imported module') ||
      error.message.includes('Importing a module script failed'))
  );
}

export function ChunkErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    if (!isChunkError(error)) return;

    const retries = Number(sessionStorage.getItem(RETRY_KEY) || '0');

    if (retries >= MAX_RETRIES) {
      sessionStorage.removeItem(RETRY_KEY);
      return;
    }

    sessionStorage.setItem(RETRY_KEY, String(retries + 1));

    // Clear service workers
    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          void registration.unregister();
        }
      });
    }

    // Reload with cache bypass
    window.location.reload();
  }, [error]);

  if (!isChunkError(error)) {
    throw error;
  }

  const retries = Number(sessionStorage.getItem(RETRY_KEY) || '0');

  if (retries >= MAX_RETRIES) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="max-w-md space-y-4 rounded-lg border bg-card p-6 text-center shadow-lg">
          <h1 className="font-bold text-2xl">Update Required</h1>
          <p className="text-muted-foreground">
            Please refresh the page to load the latest version.
          </p>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(RETRY_KEY);
              window.location.reload();
            }}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="max-w-md space-y-4 rounded-lg border bg-card p-6 text-center shadow-lg">
        <h1 className="font-bold text-2xl">Updating...</h1>
        <p className="text-muted-foreground">Loading the latest version...</p>
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </div>
  );
}
