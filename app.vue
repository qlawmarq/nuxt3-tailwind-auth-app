<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import "./assets/tailwind.scss";
import apiClient from "./lib/axios/http";
export default {
  setup() {
    const { $router } = useNuxtApp();
    const auth = useAuth();
    const authRoutes = ["/", "/profile/edit"];
    const unauthRoutes = ["/signup", "/signin"];
    const currentRoute = $router.currentRoute.value.path;
    if (authRoutes.includes(currentRoute) && !auth) {
      $router.push("/signin");
    }
    if (unauthRoutes.includes(currentRoute) && auth) {
      $router.push("/");
    }
    // Set auth token
    apiClient.interceptors.request.use(function (config) {
      const token = auth.authState.value?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return {};
  },
};
</script>
