<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="onSubmit">
      <h1 class="text-xl text-gray-700 font-bold mb-4">Sign in</h1>
      <div class="mb-4">
        <AtomsInputText
          v-model="email"
          :label="'E-Mail'"
          :placeholder="'Please input your E-Mail.'"
          :id="'email'"
          :error="errors.email"
        />
      </div>
      <div class="mb-6">
        <AtomsInputPassword
          v-model="password"
          :label="'Password'"
          :placeholder="'Please input your password.'"
          :id="'password'"
          :error="errors.password"
          :toggle="true"
        />
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign In
        </button>
        <NuxtLink to="/signup">
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" type="button" href="#">
            Sign up
          </a>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import ApiService from "lib/api/endpoints";
import { useForm, useField } from 'vee-validate';
import { useNuxtApp } from '#app';
import * as yup from 'yup';
export default {
  name: 'Sign in',
  layout: "default",
  head() {
    return {
      title: 'Sign in'
    }
  },
  setup() {
    const { $router } = useNuxtApp();
    // Get state from `composables/auth.ts`
    const auth = useAuth()
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });
    // Create a form context with the validation schema
    const { handleSubmit, errors } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields
    const { value: email } = useField('email');
    const { value: password } = useField('password');
    const onSubmit = handleSubmit(async values => {
      const res = await ApiService.signin(values)
      auth.setAuthState(res.data.token)
      auth.setUserState(res.data.user)
      $router.push('/')
    });
    return {
      errors,
      email,
      password,
      onSubmit
    };
  },
}
</script>
