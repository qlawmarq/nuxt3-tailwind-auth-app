<template>
  <div class="Input">
    <label v-if="label" class="Input__label" :for="id">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      :id="id"
      v-model="modelValueComputed"
      :type="inputType"
      :class="[defaultClass, $attrs.disabled ? disabledClass : '']"
      :placeholder="placeholder"
      :modelValue="modelValueComputed"
    />
    <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
  props: {
    /**
     * Binded modelValue
     */
    modelValue: {
      type: String,
    },
    /**
     * id for input & label
     */
    id: {
      type: String || Number,
    },
    /**
     * Label for Input
     */
    label: {
      type: String,
    },
    /**
     * Placeholder
     */
    placeholder: {
      type: String,
    },
    /**
     * Error
     */
    error: {
      type: String,
    },
    /**
     * inputType
     */
    inputType: {
      type: String,
      default: "text",
    },
    /**
     * CSS Class for the Input field
     * @type {String}
     */
    defaultClass: {
      type: String,
      default: "Input__field",
    },
    /**
     * CSS Class for the disabled Input field
     * @type {String}
     */
    disabledClass: {
      type: String,
      default: "Input__field--disabled",
    },
    /**
     * CSS Class for the badge
     * the secureLength. Later for errors
     * @type {String}
     */
    errorClass: {
      type: String,
      default: "Input__badge--error",
    },
    /**
     * CSS Class for the badge
     * the secureLength. Later for
     * success messages possible.
     * @type {String}
     */
    successClass: {
      type: String,
      default: "Input__badge--success",
    },
  },
  // TODO: remove any type
  setup(props: any, { emit }: any) {
    const { modelValue } = toRefs(props);
    const modelValueComputed = computed({
      get: () => modelValue.value,
      set: (value) => {
        emit("update:modelValue", value);
      },
    });
    return {
      modelValueComputed,
    };
  },
};
</script>

<style lang="scss">
@import "./common-input-style.scss";
</style>
