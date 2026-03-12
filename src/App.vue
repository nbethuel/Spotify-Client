<script setup lang="ts">
import { useRouter, RouterView, useRoute } from "vue-router";

import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { authStore } from "./stores/auth.store";
import { useFavoritesStore } from "./stores/favorites.store";
import { albumStore } from "./stores/album.store";
import AlbumSearchInput from "./components/AlbumSearchInput.vue";
import type { MenuItem } from "primevue/menuitem";
const router = useRouter();
const route = useRoute();
const auth = authStore();
const favStore = useFavoritesStore();
const store = albumStore();
const { authToken: authCode } = storeToRefs(auth);
const searchInput = ref("");

const searchAlbum = async () => {
  if (!searchInput.value.trim()) return;
  if (route.name !== "home") await router.push("/");
  store.search(searchInput.value);
};
const connect = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = `${location.origin}/callback`;
  const state = crypto.randomUUID();
  localStorage.setItem("spotify_auth_state", state);

  const width = 800;
  const height = 600;
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;
  const popup = window.open(
    `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}`,
    "Login with Spotify",
    `width=${width},height=${height},top=${top},left=${left}`,
  );
  const callback = async (payload: {
    accessToken: string;
    refreshToken: string;
  }) => {
    auth.setToken(payload.accessToken);
    auth.setRefreshToken(payload.refreshToken);
    await auth.fetchUserId();
    if (popup) {
      popup.close();
    }
    router.push("/");
  };
  window.spotifyCallback = callback;
};

onMounted(() => {
  if (auth.authToken && !auth.userId) {
    auth.fetchUserId();
  }
});

const disconnect = () => {
  auth.resetToken();
};

const items = ref<MenuItem[]>([
  {
    label: "Favoris",
    icon: "pi pi-heart",
    command: () => router.push("/favorites"),
    visible: () => authCode.value != null,
    badge: String(favStore.count || ""),
  },
  {
    label: "A propos",
    command: () => router.push("/about"),
  },
  {
    separator: true,
    class: "auth-menu-item",
  },
  {
    label: "Se déconnecter",
    icon: "pi pi-power-off",
    command: disconnect,
    visible: () => authCode.value != null,
    class: "auth-menu-item",
  },
  {
    label: "Se connecter à Spotify",
    icon: "pi pi-sign-in",
    command: connect,
    visible: () => authCode.value == null,
    class: "auth-menu-item",
  },
]);
</script>

<template>
  <Menubar :model="items">
    <template #end>
      <AlbumSearchInput
        v-if="authCode"
        v-model="searchInput"
        :is-loading="store.isLoading"
        variant="inline"
        @search="searchAlbum()"
      />
      <Button
        v-if="authCode"
        label="Se déconnecter"
        icon="pi pi-power-off"
        severity="secondary"
        text
        @click="disconnect"
      />
      <Button
        v-else
        label="Se connecter à Spotify"
        icon="pi pi-sign-in"
        @click="connect"
      />
    </template>
  </Menubar>

  <div v-if="authCode" class="search-bar-container">
    <AlbumSearchInput
      v-model="searchInput"
      :is-loading="store.isLoading"
      input-class="w-full"
      @search="searchAlbum()"
    />
  </div>

  <RouterView />
</template>

<style scoped>
.search-bar-container {
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--p-content-border-color);
}

/* Desktop : items auth cachés du model, #end visible, search centrée */
@media (min-width: 961px) {
  :deep(.auth-menu-item) {
    display: none;
  }
  .search-bar-container {
    display: none;
  }
}

/* Mobile : #end caché, items auth visibles dans le burger */
@media (max-width: 960px) {
  :deep(.p-menubar-end) {
    display: none;
  }
}
</style>
