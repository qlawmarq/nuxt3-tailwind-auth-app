<template>
  <AtomsDivCard>
    <form @submit="onSubmit">
      <h1 class="text-xl text-gray-700 font-bold mb-4">Sign in</h1>
      <div class="mb-4">
        <AtomsInputText
          :id="'email'"
          v-model="email"
          :label="'E-Mail'"
          :placeholder="'Please input your E-Mail.'"
          :error="errors.email"
        />
      </div>
      <div class="mb-6">
        <AtomsInputPassword
          :id="'password'"
          v-model="password"
          :label="'Password'"
          :placeholder="'Please input your password.'"
          :error="errors.password"
          :toggle="true"
          :show-strength-meter="false"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <NuxtLink to="/signup">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
            href="#"
          >
            Sign up
          </a>
        </NuxtLink>
      </div>
    </form>
  </AtomsDivCard>
</template>

<script lang="ts">
import { useForm, useField } from "vee-validate";
import { useNuxtApp } from "#app";
import * as yup from "yup";
import ApiService from "lib/axios/endpoints";

export default defineNuxtComponent({
  name: "SignIn",
  layout: "default",
  setup() {
    const { $router } = useNuxtApp();
    // Get state from `composables/auth.ts`
    const auth = useAuth();
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });
    // Create a form context with the validation schema
    const { handleSubmit, errors } = useForm({
      validationSchema: schema,
      initialValues: {
        email: "",
        password: "",
      },
    });
    // No need to define rules for fields
    const { value: email } = useField<string>("email");
    const { value: password } = useField<string>("password");
    const onSubmit = handleSubmit(
      async (values: { email: string; password: string }) => {
        const res = await ApiService.signin(values);
        localStorage.setItem("nuxt3_auth", JSON.stringify(res.data.token));
        localStorage.setItem("nuxt3_user", JSON.stringify(res.data.user));
        auth.setAuthState(res.data.token);
        auth.setUserState(res.data.user);
        $router.push("/");
      }
    );
    return {
      errors,
      email,
      password,
      onSubmit,
    };
  },
  head() {
    return {
      title: "Sign in",
    };
  },
});
</script>
