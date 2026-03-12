import { ref } from "vue";
import { defineStore } from "pinia";
import { getMe, setAuthToken } from "../services/spotify.api";

export const authStore = defineStore("auth", () => {
  const authToken = ref<string | null>(localStorage.getItem("spotify_auth_token"));
  const refreshToken = ref<string | null>(localStorage.getItem("spotify_refresh_token"));
  const userId = ref<string | null>(localStorage.getItem("spotify_user_id"));

  function setToken(value: string) {
    localStorage.setItem("spotify_auth_token", value);
    authToken.value = value;
  }

  function setRefreshToken(value: string) {
    localStorage.setItem("spotify_refresh_token", value);
    refreshToken.value = value;
  }

  async function refreshAccessToken(): Promise<string | null> {
    if (!refreshToken.value) return null;
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
          )}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken.value,
        }),
      });
      const data = await response.json();
      if (data.access_token) {
        setToken(data.access_token);
        if (data.refresh_token) {
          setRefreshToken(data.refresh_token);
        }
        return data.access_token;
      }
      return null;
    } catch {
      return null;
    }
  }

  async function fetchUserId() {
    if (!authToken.value) return;
    try {
      setAuthToken(authToken.value);
      const user = await getMe();
      userId.value = user.id;
      localStorage.setItem("spotify_user_id", user.id);
    } catch {
      resetToken();
    }
  }

  function resetToken() {
    localStorage.removeItem("spotify_auth_token");
    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("spotify_user_id");
    authToken.value = null;
    refreshToken.value = null;
    userId.value = null;
  }

  return { authToken, userId, setToken, setRefreshToken, refreshAccessToken, fetchUserId, resetToken };
});
