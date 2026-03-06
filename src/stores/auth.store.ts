import { ref } from "vue";
import { defineStore } from "pinia";

export const authStore = defineStore("auth", () => {
  const authToken = ref<string | null>(getToken());
  function getToken() {
    return localStorage.getItem("spotify_auth_token");
  }

  function getTokenRef() {
    return authToken;
  }

  function setToken(value: string) {
    localStorage.setItem("spotify_auth_token", value);
    authToken.value = value;
  }

  function resetToken() {
    localStorage.removeItem("spotify_auth_token");
    authToken.value = null;
  }

  return { getTokenRef, setToken, resetToken };
});
