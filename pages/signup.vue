<template>
  <AtomsDivCard>
    <form @submit="onSubmit">
      <h1 class="text-xl text-gray-700 font-bold mb-4">Sign up</h1>
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
          :id="'email'"
          v-model="email"
          :label="'E-Mail'"
          :placeholder="'Please input your E-Mail.'"
          :error="errors.email"
        />
      </div>
      <div class="mb-4">
        <AtomsInputText
          :id="'first_name'"
          v-model="first_name"
          :label="'First name'"
          :placeholder="'Please input your first name.'"
          :error="errors.first_name"
        />
      </div>
      <div class="mb-4">
        <AtomsInputText
          :id="'last_name'"
          v-model="last_name"
          :label="'Last name'"
          :placeholder="'Please input your last name.'"
          :error="errors.last_name"
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
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign up
        </button>
        <NuxtLink to="/signin">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
            href="#"
          >
            Back to sign in
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
import md5 from "blueimp-md5";
import ApiService from "lib/axios/endpoints";

export default defineNuxtComponent({
  name: "Signin",
  layout: "default",
  setup() {
    const { $router } = useNuxtApp();
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required().email(),
      first_name: yup.string().required(),
      last_name: yup.string().required(),
      password: yup.string().required().min(8),
    });
    // Create a form context with the validation schema
    const { handleSubmit, errors, setErrors } = useForm({
      validationSchema: schema,
      initialValues: {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
      },
    });
    const { value: email } = useField<string>("email");
    const { value: password } = useField<string>("password");
    const { value: first_name } = useField<string>("first_name");
    const { value: last_name } = useField<string>("last_name");
    const onSubmit = handleSubmit(
      (values: {
        email: string;
        first_name: string;
        last_name: string;
        password: string;
      }) => {
        ApiService.signup(values)
          .then(() => {
            $router.push("/signin");
          })
          .catch((e) => {
            console.error("API Exceprion", e);
            setErrors({ email: "API returned an error." });
          });
      }
    );
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
  head() {
    return {
      title: "Sign up",
    };
  },
});
</script>
