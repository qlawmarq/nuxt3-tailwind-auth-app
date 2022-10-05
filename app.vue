<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import "./assets/tailwind.scss";
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
    return {};
  },
};
</script>
