<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import Card from "primevue/card";
import type { SpotifyAlbum } from "../types/spotify";
import { useFavoritesStore } from "../stores/favorites.store";

const router = useRouter();
const favStore = useFavoritesStore();

const props = defineProps<{
  album: SpotifyAlbum;
}>();

const thumbnail = computed(() =>
  props.album.images.find((image) => image.height === 64),
);

const year = (releaseDate: string) =>
  releaseDate.replace(/(\d{4})-\d{2}-\d{2}/, "$1");
</script>

<template>
  <div>
    <Card
      :pt="{ root: { class: 'album-card' } }"
      @click="router.push({ name: 'album', params: { id: album.id } })"
    >
      <template #content>
        <div class="flex">
          <div v-if="thumbnail">
            <img
              class="cover"
              :src="thumbnail.url"
              :alt="album.name"
              :title="album.name"
            />
          </div>
          <div class="card-content">
            <div class="title-row">
              <div class="p-card-title title-text">
                {{ album.name }}
                <span class="year">({{ year(album.release_date) }})</span>
              </div>
              <Button
                :icon="
                  favStore.isFavorite(album.id)
                    ? 'pi pi-heart-fill'
                    : 'pi pi-heart'
                "
                :severity="
                  favStore.isFavorite(album.id) ? 'danger' : 'secondary'
                "
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
            <div
              class="p-card-subtitle"
              v-for="artist in album.artists"
              :key="artist.id"
            >
              {{ artist.name }}
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.cover {
  padding: 5px;
  min-width: 64px;
  min-height: 64px;
}
.year {
  font-size: 1rem;
}
.card-content {
  flex: 1;
  min-width: 0;
}
.title-row {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
}
.title-text {
  flex: 1;
  min-width: 0;
  margin-bottom: 0;
}
.album-card {
  width: 380px;
  margin: 5px;
  min-height: 200px;
  cursor: pointer;
}
</style>
