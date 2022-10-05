<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import "./assets/tailwind.scss";
<<<<<<< HEAD
import apiClient from "./lib/axios/http";
=======
>>>>>>> a46c62bd49868c04705526b25e5d8860d8b6d1b7
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
        if(token){
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    return {};
  },
};
</script>
