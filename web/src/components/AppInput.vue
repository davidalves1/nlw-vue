<template>
  <div className="input-block">
    <label :for="name">{{ label }}</label>
    <input type="text" :id="name" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.input-block {
  position: relative;
}

.input-block + .input-block {
  margin-top: 1.4rem;
}

.input-block label {
  font-size: 1.4rem;
}

.input-block input {
  width: 100%;
  height: 5.6rem;
  margin-top: 0.8rem;
  border-radius: 0.8rem;
  background: var(--color-input-background);
  border: 1px solid var(--color-line-in-white);
  outline: 0;
  padding: 0 1.6rem;
  font: 1.6rem Archivo;
}

.input-block:focus-within::after {
  width: calc(100% - 3.2rem);
  height: 2px;
  content: "";
  background: var(--color-primary-light);
  position: absolute;
  left: 1.6rem;
  right: 1.6rem;
  bottom: 0;
}
</style>
