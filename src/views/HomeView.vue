<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { authStore } from "../stores/auth.store";
import { albumStore } from "../stores/album.store";
import AlbumList from "../components/AlbumList.vue";

const auth = authStore();
const store = albumStore();

const { authToken: authCode } = storeToRefs(auth);
const searchInput = ref("");

const searchAlbum = () => store.search(searchInput.value);
</script>

<template>
  <main v-show="authCode">
    <span class="p-input-icon-right w-full">
      <InputText
        type="text"
        v-model="searchInput"
        placeholder="artiste, album, etc."
        @keyup.enter="searchAlbum()"
        class="w-full"
      />
      <i class="pi pi-spin pi-spinner" v-if="store.isLoading" />
      <i class="pi pi-search" v-else @click="searchAlbum()" />
    </span>
    <AlbumList :albums="store.albums" class="body" />
  </main>
</template>
