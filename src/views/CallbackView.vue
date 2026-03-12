<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  const savedState = localStorage.getItem("spotify_auth_state");

  localStorage.removeItem("spotify_auth_state");

  if (!code || state !== savedState) {
    window.location.replace("/");
    return;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
      )}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${window.location.origin}/callback`,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    await window.opener.spotifyCallback({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
  }

  window.location.replace("/");
});
</script>

<template>
  <div />
</template>
