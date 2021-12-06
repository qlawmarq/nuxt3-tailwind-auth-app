<template>
  <div class="w-full h-screen max-w-xs">
    <h1 class="text-xl font-bold my-12">Welcome! {{v.first_name}} {{v.last_name}}</h1>
    <NuxtLink to="/profile/edit">
      <button class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Edit your profile
      </button>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Index',
  layout: "default",
  head() {
    return {
      title: 'Welcome'
    }
  },
  setup() {
    const auth = useAuth()
    const v = {
      email: String(auth.userState.value?.email),
      first_name: String(auth.userState.value?.first_name),
      last_name: String(auth.userState.value?.last_name),
    };
    return {
      v
    };
  },
}
</script>
