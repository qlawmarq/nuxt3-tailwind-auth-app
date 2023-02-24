<template>
  <div class="m-auto">
    <div class="mb-4 flex justify-center">
      <h1 class="text-xl font-bold">Welcome, {{ v.first_name }}.</h1>
    </div>
    <div class="mb-4">
      <NuxtLink to="/profile/edit">
        <button
          class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="button"
        >
          Edit your profile
        </button>
      </NuxtLink>
    </div>
    <div class="mb-4">
      <button
        class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        type="button"
        @click="signout"
      >
        Sign out
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: "Index",
  layout: "default",
  setup() {
    const { $router } = useNuxtApp();
    const auth = useAuth();
    const signout = () => {
      localStorage.clear();
      auth.setAuthState(null);
      auth.setUserState(null);
      $router.push("/signin");
    };
    const v = {
      email: String(auth.userState.value?.email),
      first_name: String(auth.userState.value?.first_name),
      last_name: String(auth.userState.value?.last_name),
    };
    return {
      signout,
      v,
    };
  },
  head() {
    return {
      title: "Welcome",
    };
  },
});
</script>
