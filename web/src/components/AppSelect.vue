<template>
  <div class="select-block">
    <label :for="name">{{ label }}</label>
    <select :id="name">
      <option disabled hidden>
        Selecione uma opção
      </option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator: (items) => items.every((item) => typeof item === 'object'
        && typeof item.value === 'string'
        && typeof item.label === 'string'),
    },
  },
};
</script>

<style>

</style>
