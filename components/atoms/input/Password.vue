<template>
  <div class="Input">
    <label v-if="label" class="Input__label" :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      v-bind="$attrs"
      :ref="referenceValue"
      :modelValue="modelValue"
      :type="inputType"
      :class="[defaultClass, $attrs.disabled ? disabledClass : '']"
      :placeholder="placeholder"
      @input="(evt) => emitValue('update:modelValue', (evt.target as HTMLInputElement).value)"
      @blur="(evt) => emitValue('update:modelValue', (evt.target as HTMLInputElement).value)"
      @focus="(evt) => emitValue('update:modelValue', (evt.target as HTMLInputElement).value)"
    />
    <div v-if="isActive" class="Password__icons">
      <div
        v-if="badge"
        v-cloak
        :class="[
          isSecure ? successClass : '',
          !isSecure && isActive ? errorClass : '',
        ]"
        class="Password__badge"
      >
        {{ passwordCount }}
      </div>
      <div v-if="toggle" class="Password__toggle">
        <button
          type="button"
          class="Password__eye"
          aria-label="show and hide password"
          tabindex="-1"
          @click.prevent="togglePassword()"
        >
          <fa v-if="isShowPassword" icon="eye" />
          <fa v-else icon="eye-slash" />
        </button>
      </div>
    </div>
    <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
    <div v-if="showStrengthMeter" :class="[strengthMeterClass]">
      <div
        :class="[strengthMeterFillClass]"
        :data-score="passwordStrength"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import zxcvbn from "zxcvbn";

export default {
  inheritAttrs: false,
  props: {
    /**
     * Binded value
     * @type {Object}
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
     * Password min length.
     * Right now only visual for the badge
     * @type {Number}
     */
    secureLength: {
      type: Number,
      default: 7,
    },
    /**
     * Display badge:
     * The badge shows your
     * password character count
     * up to the defined secureLength
     * @type {Boolean}
     */
    badge: {
      type: Boolean,
      default: true,
    },
    /**
     * Show password toggle:
     * Show icon to toggle
     * the password visibility
     */
    toggle: {
      type: Boolean,
      default: false,
    },
    /**
     * Prop to toggle the
     * cleartext password if
     * toggle is disabled
     */
    showPassword: {
      type: Boolean,
      default: false,
    },
    /**
     * Prop to change the
     * ref of the input
     */
    referenceValue: {
      type: String,
      default: "input",
    },
    /**
     * Prop to toggle the
     * strength Meter if
     * User wants to implement
     * their own
     */
    showStrengthMeter: {
      type: Boolean,
      default: true,
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
     * if a password does not match
     * the secureLength. Later for errors
     * @type {String}
     */
    errorClass: {
      type: String,
      default: "Password__badge--error",
    },
    /**
     * CSS Class for the badge
     * if a password does match
     * the secureLength. Later for
     * success messages possible.
     * @type {String}
     */
    successClass: {
      type: String,
      default: "Password__badge--success",
    },
    /**
     * CSS class for styling the
     * strength meter bars.
     * @type {String}
     */
    strengthMeterClass: {
      type: String,
      default: "Password__strength-meter",
    },
    /**
     * strengthMeterFillClass sets the
     * individual strength width and fill
     * color of the strength meter bars.
     * @type {String}
     */
    strengthMeterFillClass: {
      type: String,
      default: "Password__strength-meter--fill",
    },
  },
  data() {
    return {
      password: "",
      isShowPassword: false,
    };
  },

  computed: {
    /**
     * passwordStrength is the score calculated by zxcvbn
     * @return {Number} Password Strength Score
     */
    passwordStrength(): number {
      return this.password ? zxcvbn(this.password).score : 0;
    },

    /**
     * isSecure checks if the length of the password is longer then
     * the defined `secureLength`
     * @return {Boolean} Password length longer then minLength
     */
    isSecure(): boolean {
      return this.password ? this.password.length >= this.secureLength : true;
    },

    /**
     * isActive checks if a password is entered.
     * It's required for the password count badge.
     * @return {Boolean} Password entered
     */
    isActive(): boolean {
      return this.password ? this.password.length > 0 : false;
    },

    /**
     * passwordCount holds the character count of the
     * current password. It shows the count up to the `secureLength`.
     * @return {Number | String} Password Character Count
     */
    passwordCount(): number | string {
      return (
        this.password &&
        (this.password.length > this.secureLength
          ? `${this.secureLength}+`
          : this.password.length)
      );
    },
    /**
     * Changing the input type from password to text
     * based on the local isShowPassword data or the showPassword prop
     */
    inputType() {
      return this.isShowPassword || this.showPassword ? "text" : "password";
    },
  },
  watch: {
    modelValue(newValue) {
      this.$emit("feedback", zxcvbn(newValue).feedback);
    },
    passwordStrength(score) {
      this.$emit("score", score);
    },
  },

  methods: {
    togglePassword() {
      if (this.isShowPassword) {
        this.$emit("hide");
        this.isShowPassword = false;
      } else {
        this.$emit("show");
        this.isShowPassword = true;
      }
    },
    emitValue(type, value) {
      this.$emit(type, value);
      this.password = value;
    },
  },
};
</script>

<style lang="scss">
@import "./common-input-style.scss";
</style>
