<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { albumStore } from "../stores/album.store";
import type { SpotifyTrack } from "../types/spotify";

const route = useRoute();
const router = useRouter();
const store = albumStore();

const album = computed(() => store.currentAlbum);

const artistNames = computed(
  () => album.value?.artists.map((a) => a.name).join(", ") ?? "",
);

const cover = computed(
  () =>
    album.value?.images.find((image) => image.height === 300) ??
    album.value?.images[0],
);

const year = (releaseDate: string) =>
  releaseDate.replace(/(\d{4})-\d{2}-\d{2}/, "$1");

const formatDuration = (track: SpotifyTrack) => {
  const minutes = Math.floor(track.duration_ms / 60000);
  const seconds = Math.floor((track.duration_ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

onMounted(() => {
  store.fetchAlbum(route.params.id as string);
});
</script>

<template>
  <main class="p-4">
    <div class="mb-4">
      <Button
        label="Retour"
        icon="pi pi-arrow-left"
        text
        @click="router.back()"
      />
    </div>
    <!-- Chargement -->
    <div v-if="store.isLoading" class="flex gap-5">
      <Skeleton width="220px" height="220px" border-radius="8px" />
      <div class="flex flex-column gap-3 justify-content-center">
        <Skeleton width="320px" height="2.2rem" />
        <Skeleton width="200px" height="1.2rem" />
        <Skeleton width="260px" height="1.2rem" />
        <div class="flex gap-2">
          <Skeleton width="80px" height="1.8rem" border-radius="16px" />
          <Skeleton width="80px" height="1.8rem" border-radius="16px" />
          <Skeleton width="120px" height="1.8rem" border-radius="16px" />
        </div>
      </div>
    </div>

    <p v-else-if="store.error" class="text-red-500">{{ store.error }}</p>

    <div v-else-if="album">
      <div class="flex gap-5 align-items-end mb-2">
        <img
          v-if="cover"
          :src="cover.url"
          :alt="album.name"
          class="album-cover"
        />
        <div class="flex flex-column gap-3">
          <h1 class="m-0">{{ album.name }}</h1>
          <p class="m-0 text-xl artists">
            {{ artistNames }}
          </p>
          <div class="flex gap-2 flex-wrap align-items-center">
            <Tag
              :value="year(album.release_date)"
              icon="pi pi-calendar"
              severity="secondary"
            />
            <Tag
              :value="`${album.total_tracks} titres`"
              icon="pi pi-list"
              severity="secondary"
            />
            <Tag :value="album.label" icon="pi pi-tag" severity="secondary" />
          </div>
        </div>
      </div>

      <Divider />

      <DataTable
        :value="album.tracks.items"
        size="small"
        striped-rows
        class="tracklist"
      >
        <Column
          field="track_number"
          header="#"
          headerClass="track-number-header"
        />
        <Column field="name" header="Titre" />
        <Column header="Durée" headerClass="duration-header">
          <template #body="{ data }">
            {{ formatDuration(data) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<style scoped>
.album-cover {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
h1 {
  font-size: 2rem;
}
.artists {
  opacity: 0.8;
}
.tracklist :deep(td:first-child) {
  opacity: 0.5;
  text-align: right;
}
.tracklist :deep(tr:last-child td) {
  border-bottom: none;
}

:deep(.track-number-header) {
  width: 3rem;
}
:deep(.duration-header) {
  width: 6rem;
}
</style>
