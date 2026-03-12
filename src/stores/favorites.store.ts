import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import type { SpotifyAlbum } from "../types/spotify";

export const useFavoritesStore = defineStore("favorites", () => {
  const auth = authStore();

  const storageKey = computed(() =>
    auth.userId ? `spotify_favorites_${auth.userId}` : null,
  );

  const favorites = ref<SpotifyAlbum[]>([]);

  watch(
    () => auth.userId,
    (userId) => {
      favorites.value = userId
        ? JSON.parse(
            localStorage.getItem(`spotify_favorites_${userId}`) ?? "[]",
          )
        : [];
    },
    { immediate: true },
  );

  const count = computed(() => favorites.value.length);

  function isFavorite(id: string): boolean {
    return favorites.value.some((a) => a.id === id);
  }

  function toggleFavorite(album: SpotifyAlbum) {
    if (isFavorite(album.id)) {
      favorites.value = favorites.value.filter((a) => a.id !== album.id);
    } else {
      favorites.value.push(album);
    }
    if (storageKey.value) {
      localStorage.setItem(storageKey.value, JSON.stringify(favorites.value));
    }
  }

  return { favorites, count, isFavorite, toggleFavorite };
});
