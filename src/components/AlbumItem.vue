<script setup lang="ts">
import Card from "primevue/card";

const year = function (releaseDate: string) {
  return releaseDate.replace(/(\d{4})-\d{2}-\d{2}/, "$1");
};
defineProps<{
  album: any;
}>();
</script>

<template>
  <div>
    <Card
      v-for="image in album.images"
      v-bind:key="image.url"
      v-show="image.height === 64"
      style="width: 380px; margin: 5px; min-height: 200px"
    >
      <template #content>
        <div class="flex">
          <div>
            <img
              class="cover"
              :src="image.url"
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
              v-bind:key="artist.id"
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
