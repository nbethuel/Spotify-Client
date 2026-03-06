<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { ref, computed } from "vue";
import { authStore } from "../stores/auth.store";
import { onMounted } from "vue";
import AlbumList from "../components/AlbumList.vue";
import axios, { AxiosError, AxiosResponse } from "axios";

const auth = authStore();

const authCode = auth.getTokenRef();
const albums = ref();
const searchInput = ref("");
const isLoading = ref(false);

const searchAlbum = async () => {
  try {
    isLoading.value = true;
    albums.value = null;
    const result: AxiosResponse = await axios({
      method: "GET",
      responseType: "json",
      params: {
        q: searchInput.value,
        type: "album",
      },
      url: "https://api.spotify.com/v1/search",
      headers: {
        Authorization: `Bearer ${authCode.value}`,
        "Content-Type": "application/json",
      },
    });
    albums.value = result.data.albums;
    isLoading.value = false;
    console.log(result.data.albums.items);
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.code === "ERR_BAD_REQUEST") {
      auth.resetToken();
    }
  }
};
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
      <i class="pi pi-spin pi-spinner" v-if="isLoading" />
      <i class="pi pi-search" v-else @click="searchAlbum()" />
    </span>
    <AlbumList :albums="albums" class="body" />
  </main>
</template>
