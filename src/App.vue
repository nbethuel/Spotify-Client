<script setup lang="ts">
import { useRouter, RouterLink, RouterView } from "vue-router";

import { ref } from "vue";
import { storeToRefs } from "pinia";
import { authStore } from "./stores/auth.store";
import type { MenuItem } from "primevue/menuitem";
const router = useRouter();
const auth = authStore();
const { authToken: authCode } = storeToRefs(auth);
const connect = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = `${location.origin}/callback`;

  var width = 800;
  var height = 600;
  var left = screen.width / 2 - width / 2;
  var top = screen.height / 2 - height / 2;
  const popup = window.open(
    `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`,
    "Login with Spotify",
    `width=${width},height=${height},top=${top},left=${left}`
  );
  const callback = async (payload: string) => {
    auth.setToken(payload);
    if (popup) {
      popup.close();
    }
    router.push("/");
  };
  // @ts-ignore
  window.spotifyCallback = callback;
};

const disconnect = () => {
  auth.resetToken();
};

const items = ref<MenuItem[]>([
  {
    label: "Recherche",
    to: "/",
    visible: () => authCode.value != null,
  },
  {
    label: "A propos",
    to: "/about",
  },
  {
    separator: true,
  },
  {
    label: "Se déconnecter",
    icon: "pi pi-fw pi-power-off",
    style: { "margin-left": "700px" } as Record<string, string>,
    command: disconnect,
    visible: () => authCode.value != null,
  },
  {
    label: "Se Connecter à Spotify",
    icon: "pi pi-fw pi-sign-in",
    style: { "margin-left": "700px" } as Record<string, string>,
    command: connect,
    visible: () => authCode.value == null,
  },
]);
</script>

<template>
  <Menubar :model="items" />

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
