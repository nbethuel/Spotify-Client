<template>
  <div />
</template>

<script lang="ts">

import { onMounted } from "vue";

export default {
  setup() {
    onMounted(async () => {
      console.log("mounted");
      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
                import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
              }`
            )}`,
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: `${window.location.origin}/callback`,
          }),
        });

        const data = await response.json();

        await window.opener.spotifyCallback(data.access_token);
      }

      window.location.replace("/");
    });
  },
};
</script>
