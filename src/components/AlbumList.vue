<script setup lang="ts">
import AlbumItem from "./AlbumItem.vue";
import type { SpotifyAlbumSearchResult } from "../types/spotify";

defineProps<{
  albums: SpotifyAlbumSearchResult | null;
}>();
</script>

<template>
  <div v-if="albums" class="flex flex-row flex-wrap">
    <AlbumItem
      v-for="album in albums.items"
      :key="album.id"
      :album="album"
    />
  </div>
</template>

<style scoped></style>
