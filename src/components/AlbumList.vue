<script setup lang="ts">
import { ref } from "vue";
import AlbumItem from "./AlbumItem.vue";
import type { SpotifyAlbumSearchResult } from "../types/spotify";

defineProps<{
  albums: SpotifyAlbumSearchResult | null;
}>();

const layout = ref<"list" | "grid">("list");
</script>

<template>
  <DataView v-if="albums" :value="albums.items" :layout="layout">
    <template #header>
      <div class="flex justify-content-end">
        <Button
          :icon="layout === 'list' ? 'pi pi-table' : 'pi pi-list'"
          :title="layout === 'list' ? 'Vue grille' : 'Vue liste'"
          text
          rounded
          @click="layout = layout === 'list' ? 'grid' : 'list'"
        />
      </div>
    </template>

    <template #list="{ items }">
      <AlbumItem
        v-for="album in items"
        :key="album.id"
        :album="album"
        layout="list"
      />
    </template>

    <template #grid="{ items }">
      <div class="grid-layout">
        <AlbumItem
          v-for="album in items"
          :key="album.id"
          :album="album"
          layout="grid"
        />
      </div>
    </template>
  </DataView>
</template>

<style scoped>
.grid-layout {
  display: flex;
  flex-wrap: wrap;
}
</style>
