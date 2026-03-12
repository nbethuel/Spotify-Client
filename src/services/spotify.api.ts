import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { SpotifyAlbumDetail, SpotifyAlbumSearchResult, SpotifyUser } from "../types/spotify";

const spotifyClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
  responseType: "json",
});

spotifyClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      const { authStore } = await import("../stores/auth.store");
      const auth = authStore();
      const newToken = await auth.refreshAccessToken();
      if (newToken) {
        config.headers = { ...config.headers, Authorization: `Bearer ${newToken}` };
        return spotifyClient(config);
      }
      auth.resetToken();
    }
    return Promise.reject(error);
  },
);

export function setAuthToken(token: string) {
  spotifyClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function searchAlbums(
  query: string,
  limit: number,
  offset: number,
): Promise<SpotifyAlbumSearchResult> {
  const response = await spotifyClient.get("/search", {
    params: { q: query, type: "album", limit, offset },
  });
  return response.data.albums;
}

export async function getAlbum(id: string): Promise<SpotifyAlbumDetail> {
  const response = await spotifyClient.get(`/albums/${id}`);
  return response.data;
}

export async function getMe(): Promise<SpotifyUser> {
  const response = await spotifyClient.get("/me");
  return response.data;
}
