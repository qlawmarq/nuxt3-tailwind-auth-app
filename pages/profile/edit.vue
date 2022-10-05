<template>
  <div class="flex justify-center items-center">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit="onSubmit"
    >
      <h1 class="text-xl text-gray-700 font-bold mb-4">Profile</h1>
      <img
        data-tooltip-target="gravatar"
        class="w-32 h-32 rounded-full mx-auto"
        :src="'http://www.gravatar.com/avatar/' + md5email"
        alt=""
        width="384"
        height="512"
      />
      <a
        class="mb-4 inline-block align-baseline text-xs text-blue-500 hover:text-blue-800"
        href="https://gravatar.com"
        target="_blank"
      >
        Let's update your profile image! <br />Sign in gravatar.com with the
        same email address.
      </a>
      <div class="mb-4">
        <AtomsInputText
          v-model="email"
          :label="'E-Mail'"
          :placeholder="'Please input your E-Mail.'"
          :id="'email'"
          :error="errors.email"
        />
      </div>
      <div class="mb-4">
        <AtomsInputText
          v-model="first_name"
          :label="'First name'"
          :placeholder="'Please input your first name.'"
          :id="'first_name'"
          :error="errors.first_name"
        />
      </div>
      <div class="mb-4">
        <AtomsInputText
          v-model="last_name"
          :label="'Last name'"
          :placeholder="'Please input your last name.'"
          :id="'last_name'"
          :error="errors.last_name"
        />
      </div>
      <div class="mb-6">
        <AtomsInputPassword
          v-model="password"
          :label="'New Password'"
          :placeholder="'Please input your password.'"
          :id="'password'"
          :error="errors.password"
          :toggle="true"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update
        </button>
        <NuxtLink to="/">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
            href="#"
          >
            Cancel
          </a>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import apiClient from "lib/axios/http";
import ApiService from "lib/axios/endpoints";
import { useForm, useField } from "vee-validate";
import { useNuxtApp } from "#app";
import * as yup from "yup";
import md5 from "blueimp-md5";
export default {
  name: "Index",
  layout: "default",
  head() {
    return {
      title: "Profile",
    };
  },
  setup() {
    const auth = useAuth();
    const { $router } = useNuxtApp();
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required().email(),
      first_name: yup.string().required(),
      last_name: yup.string().required(),
      password: yup.string().required().min(8),
    });
    // Create a form context with the validation schema
    const { handleSubmit, errors } = useForm({
      validationSchema: schema,
      initialValues: {
        email: String(auth.userState.value?.email),
        first_name: String(auth.userState.value?.first_name),
        last_name: String(auth.userState.value?.last_name),
        password: "",
      },
    });
    const { value: email } = useField("email");
    const { value: password } = useField("password");
    const { value: first_name } = useField("first_name");
    const { value: last_name } = useField("last_name");

    const onSubmit = handleSubmit(async (values) => {
      // TODO: create common setter for token
      apiClient.interceptors.request.use(function (config) {
        const token = auth.authState.value?.access_token;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      const res = await ApiService.updateUser(values);
      auth.setUserState(res.data.user);
      $router.push("/");
    });
    const md5email = computed(() => {
      return md5(String(email.value).trim().toLowerCase());
    });
    return {
      errors,
      email,
      password,
      first_name,
      last_name,
      md5email,
      onSubmit,
    };
  },
};
</script>
