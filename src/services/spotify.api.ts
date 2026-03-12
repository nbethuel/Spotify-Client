import axios from "axios";
import type { SpotifyAlbumSearchResult } from "../types/spotify";

const spotifyClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
  responseType: "json",
});

export function setAuthToken(token: string) {
  spotifyClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function searchAlbums(
  query: string,
): Promise<SpotifyAlbumSearchResult> {
  const response = await spotifyClient.get("/search", {
    params: { q: query, type: "album" },
  });
  return response.data.albums;
}
