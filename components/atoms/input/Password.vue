<template>
  <div class="Password">
    <label v-if="label" class="Password__label" :for="id">
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
      default: "Password__field",
    },
    /**
     * CSS Class for the disabled Input field
     * @type {String}
     */
    disabledClass: {
      type: String,
      default: "Password__field--disabled",
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
    /**
     * @type String
     */
    userInputs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      password: null,
      isShowPassword: false,
    };
  },

  computed: {
    /**
     * passwordStrength is the score calculated by zxcvbn
     * @return {Number} Password Strength Score
     */
    passwordStrength() {
      return this.password
        ? zxcvbn(
            this.password,
            this.userInputs.length >= 1 ? this.userInputs : null
          ).score
        : null;
    },

    /**
     * isSecure checks if the length of the password is longer then
     * the defined `secureLength`
     * @return {Boolean} Password length longer then minLength
     */
    isSecure() {
      return this.password ? this.password.length >= this.secureLength : null;
    },

    /**
     * isActive checks if a password is entered.
     * It's required for the password count badge.
     * @return {Boolean} Password entered
     */
    isActive() {
      return this.password && this.password.length > 0;
    },

    /**
     * passwordCount holds the character count of the
     * current password. It shows the count up to the `secureLength`.
     * @return {Number} Password Character Count
     */
    passwordCount(): number {
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
      if (this.strengthMeterOnly) {
        this.emitValue("input", newValue);
      }
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
[v-cloak] {
  display: none;
}

.Password {
  @apply relative;
}

.Password__label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.Password__strength-meter {
  position: relative;
  height: 3px;
  background: #ddd;
  margin: 10px auto 20px;
  border-radius: 3px;
}

.Password__strength-meter:before,
.Password__strength-meter:after {
  content: "";
  height: inherit;
  background: transparent;
  display: block;
  border-color: #fff;
  border-style: solid;
  border-width: 0 5px 0 5px;
  position: absolute;
  width: 20%;
  z-index: 10;
}

.Password__strength-meter:before {
  left: 20%;
}

.Password__strength-meter:after {
  right: 20%;
}

.Password__strength-meter--fill {
  background: transparent;
  height: inherit;
  position: absolute;
  width: 0;
  border-radius: inherit;
  transition: width 0.5s ease-in-out, background 0.25s;
}

.Password__strength-meter--fill[data-score="0"] {
  background: darkred;
  width: 20%;
}

.Password__strength-meter--fill[data-score="1"] {
  background: orangered;
  width: 40%;
}

.Password__strength-meter--fill[data-score="2"] {
  background: orange;
  width: 60%;
}

.Password__strength-meter--fill[data-score="3"] {
  background: yellowgreen;
  width: 80%;
}

.Password__strength-meter--fill[data-score="4"] {
  background: green;
  width: 100%;
}

.Password__field {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}

.Password__field--disabled {
  @apply bg-gray-300;
}

.Password__icons {
  position: absolute;
  top: 0;
  right: 0;
  height: 95px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.Password__toggle {
  position: relative;
  width: 30px;
  height: 20px;
  font-size: 14px;
}

.Password__badge {
  position: relative;
  color: white;
  border-radius: 6px;
  width: 30px;
  height: 15px;
  font-size: 14px;
  margin-right: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Password__badge--error {
  @apply bg-red-500;
}

.Password__badge--success {
  @apply bg-green-500;
}

.Password__eye {
  position: relative;
  color: #777777;

  svg {
    fill: currentColor;
  }

  &:hover,
  &:focus {
    color: #404b69;
  }
}
</style>
