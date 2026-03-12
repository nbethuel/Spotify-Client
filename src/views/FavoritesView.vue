<script setup lang="ts">
import { computed } from "vue";
import { useFavoritesStore } from "../stores/favorites.store";
import { authStore } from "../stores/auth.store";
import AlbumList from "../components/AlbumList.vue";

const favStore = useFavoritesStore();
const auth = authStore();

const albumsResult = computed(() =>
  favStore.favorites.length
    ? {
        items: favStore.favorites,
        total: favStore.favorites.length,
        limit: favStore.favorites.length,
        offset: 0,
        next: null,
        previous: null,
      }
    : null,
);
</script>

<template>
  <main class="p-4">
    <div
      v-if="!auth.authToken"
      class="flex flex-column align-items-center gap-3 mt-6"
    >
      <i class="pi pi-lock" style="font-size: 3rem; opacity: 0.4" />
      <p class="text-xl m-0">
        Vous devez être connecté pour accéder à vos favoris.
      </p>
    </div>
    <template v-else>
      <h2>Mes favoris</h2>
      <p v-if="!favStore.count" class="text-secondary">
        Aucun album en favori pour le moment.
      </p>
      <AlbumList v-else :albums="albumsResult" />
    </template>
  </main>
</template>
