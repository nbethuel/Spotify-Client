<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { SpotifyAlbum } from "../types/spotify";
import { useFavoritesStore } from "../stores/favorites.store";

const router = useRouter();
const favStore = useFavoritesStore();

const props = defineProps<{
  album: SpotifyAlbum;
  layout?: "list" | "grid";
}>();

const albumItemClass = computed(() => [
  "album-item",
  props.layout === "grid" ? "album-item--grid" : "album-item--list",
]);

const thumbnail = computed(() =>
  props.layout === "grid"
    ? (props.album.images.find((image) => image.height === 300) ??
      props.album.images[0])
    : props.album.images.find((image) => image.height === 64),
);

const year = (releaseDate: string) =>
  releaseDate.replace(/(\d{4})-\d{2}-\d{2}/, "$1");
</script>

<template>
  <div
    :class="albumItemClass"
    @click="router.push({ name: 'album', params: { id: album.id } })"
  >
    <img
      v-if="thumbnail"
      class="cover"
      :src="thumbnail.url"
      :alt="album.name"
      :title="album.name"
    />
    <div class="album-info">
      <div class="title-row">
        <span class="title"
          >{{ album.name }}
          <span class="year">({{ year(album.release_date) }})</span></span
        >
        <Button
          :icon="
            favStore.isFavorite(album.id) ? 'pi pi-heart-fill' : 'pi pi-heart'
          "
          :severity="favStore.isFavorite(album.id) ? 'danger' : 'secondary'"
          :aria-label="
            favStore.isFavorite(album.id)
              ? 'Retirer des favoris'
              : 'Ajouter aux favoris'
          "
          :title="
            favStore.isFavorite(album.id)
              ? 'Retirer des favoris'
              : 'Ajouter aux favoris'
          "
          text
          rounded
          @click.stop="favStore.toggleFavorite(album)"
        />
      </div>
      <div class="artists">
        <span v-for="artist in album.artists" :key="artist.id" class="artist">
          {{ artist.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.album-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--p-content-border-color);
  transition: background 0.2s;
}
.album-item:hover {
  background: var(--p-content-hover-background);
}
.album-item--grid {
  width: 220px;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid var(--p-content-border-color);
  border-radius: 8px;
  margin: 0.4rem;
  padding: 0.75rem;
}
.cover {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  object-fit: cover;
}
.album-item--grid .cover {
  width: 100%;
  height: 140px;
  border-radius: 4px;
}
.album-info {
  flex: 1;
  min-width: 0;
}
.title-row {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
}
.title {
  flex: 1;
  min-width: 0;
  font-weight: 600;
}
.year {
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.6;
}
.artists {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 0.1rem;
}
.artist + .artist::before {
  content: ", ";
}
</style>
