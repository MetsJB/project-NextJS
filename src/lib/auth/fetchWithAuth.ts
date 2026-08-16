let refreshPromise: Promise<boolean> | null = null;

function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch('/api/auth/refresh', {
      method: 'POST',
    })
      .then((response) => response.ok)
      .catch(() => false) 
      .finally(() => (refreshPromise = null));
  }

  return refreshPromise;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let response = await fetch(url, options);

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      response = await fetch(url, options);
    }
  }

  return response;
}
