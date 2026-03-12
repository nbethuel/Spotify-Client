import { ref } from "vue";
import { defineStore } from "pinia";
import { searchAlbums, setAuthToken, getAlbum } from "../services/spotify.api";
import { authStore } from "./auth.store";
import type {
  SpotifyAlbumDetail,
  SpotifyAlbumSearchResult,
} from "../types/spotify";
import axios from "axios";

export const albumStore = defineStore("album", () => {
  const LIMIT = 10;

  const albums = ref<SpotifyAlbumSearchResult | null>(null);
  const currentAlbum = ref<SpotifyAlbumDetail | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentQuery = ref("");

  async function _fetchAlbums(query: string, offset: number) {
    const auth = authStore();
    const token = auth.authToken;
    if (!token) return;

    isLoading.value = true;
    albums.value = null;
    error.value = null;

    try {
      setAuthToken(token);
      albums.value = await searchAlbums(query, LIMIT, offset);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.code === "ERR_BAD_REQUEST") {
        auth.resetToken();
      } else {
        error.value = "Une erreur est survenue lors de la recherche.";
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function search(query: string) {
    currentQuery.value = query;
    await _fetchAlbums(query, 0);
  }

  async function goToPage(offset: number) {
    await _fetchAlbums(currentQuery.value, offset);
  }

  async function fetchAlbum(id: string) {
    const auth = authStore();
    const token = auth.authToken;
    if (!token) return;

    isLoading.value = true;
    currentAlbum.value = null;
    error.value = null;

    try {
      setAuthToken(token);
      currentAlbum.value = await getAlbum(id);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          auth.resetToken();
        } else {
          error.value =
            e.response?.data?.error?.message ?? "Une erreur est survenue.";
        }
      }
    } finally {
      isLoading.value = false;
    }
  }

  return {
    albums,
    currentAlbum,
    isLoading,
    error,
    search,
    goToPage,
    fetchAlbum,
    LIMIT,
  };
});
