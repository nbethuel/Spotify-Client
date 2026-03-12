<script setup lang="ts">
import { computed } from "vue";
import Card from "primevue/card";
import type { SpotifyAlbum } from "../types/spotify";

const props = defineProps<{
  album: SpotifyAlbum;
}>();

const thumbnail = computed(() =>
  props.album.images.find((image) => image.height === 64)
);

const year = (releaseDate: string) =>
  releaseDate.replace(/(\d{4})-\d{2}-\d{2}/, "$1");
</script>

<template>
  <div>
    <Card style="width: 380px; margin: 5px; min-height: 200px">
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
          <div>
            <div class="p-card-title">
              {{ album.name }}
              <span class="year">({{ year(album.release_date) }})</span>
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
</style>
