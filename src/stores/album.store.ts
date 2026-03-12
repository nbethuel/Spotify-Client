import { ref } from "vue";
import { defineStore } from "pinia";
import { searchAlbums, setAuthToken } from "../services/spotify.api";
import { authStore } from "./auth.store";
import type { SpotifyAlbumSearchResult } from "../types/spotify";
import axios from "axios";

export const albumStore = defineStore("album", () => {
  const albums = ref<SpotifyAlbumSearchResult | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function search(query: string) {
    const auth = authStore();
    const token = auth.authToken;
    if (!token) return;

    isLoading.value = true;
    albums.value = null;
    error.value = null;

    try {
      setAuthToken(token);
      albums.value = await searchAlbums(query);
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

  return { albums, isLoading, error, search };
});
