<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    isLoading: boolean;
    placeholder?: string;
    inputClass?: string;
    variant?: "inline" | "bar";
  }>(),
  { variant: "inline" },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  search: [];
}>();
</script>

<template>
  <span
    class="album-search-input p-input-icon-right"
    :class="[
      'search-bar',
      variant === 'inline' ? 'search-bar--inline' : undefined,
    ]"
  >
    <InputText
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      :placeholder="placeholder ?? 'artiste, album, etc.'"
      :class="inputClass"
      @keyup.enter="emit('search')"
    />
    <Button
      :icon="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-search'"
      rounded
      @click="emit('search')"
      :aria-label="isLoading ? 'Recherche en cours' : 'Rechercher'"
      :title="isLoading ? 'Recherche en cours' : 'Rechercher'"
      :severity="isLoading ? 'info' : 'secondary'"
      text
    />
  </span>
</template>

<style scoped>
.album-search-input {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
}
.album-search-input :deep(.p-inputtext) {
  flex: 1;
  min-width: 0;
}
.album-search-input :deep(.p-button) {
  flex-shrink: 0;
}
.search-bar {
  width: 100%;
  max-width: 480px;
}
@media (min-width: 961px) {
  .search-bar--inline {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
