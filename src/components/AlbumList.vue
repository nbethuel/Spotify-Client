<script setup lang="ts">
import AlbumItem from "./AlbumItem.vue";
defineProps<{
  albums: any;
}>();
</script>

<template>
  <div v-if="albums" class="flex flex-row flex-wrap">
    <AlbumItem
      :album="album"
      v-for="album in albums.items"
      v-bind:key="album.id"
    ></AlbumItem>
  </div>
</template>

<style scoped></style>
