/// <reference types="vite/client" />

interface SpotifyAuthPayload {
  accessToken: string;
  refreshToken: string;
}

interface Window {
  spotifyCallback: (payload: SpotifyAuthPayload) => Promise<void>;
}
