<script setup lang="ts">
import { albumStore } from "../stores/album.store";
import AlbumList from "../components/AlbumList.vue";

const store = albumStore();
</script>

<template>
  <main class="p-3">
    <p v-if="store.error" class="error">{{ store.error }}</p>
    <AlbumList :albums="store.albums" />
    <Paginator
      v-if="store.albums"
      :rows="store.LIMIT"
      :total-records="store.albums.total"
      :first="store.albums.offset"
      @page="store.goToPage($event.first)"
    />
  </main>
</template>
