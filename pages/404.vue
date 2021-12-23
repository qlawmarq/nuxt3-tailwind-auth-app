<script lang="ts">
// this 404 page is handled by nuxt automatically on normal routes
// on /pokemon/[name].vue you have to force a redirect
export default {
  layout: "default",
};
</script>

<template>
  <div>
    <h1>404</h1>
    <p>The page you are looking for wasn't found.</p>
  </div>
</template>
