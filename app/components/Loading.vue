<template>
  <div
    :class="{
      'h-6 w-6': size === 'sm',
      'h-8 w-8': size === 'md',
      'h-12 w-12': size === 'lg',
    }"
  >
    <svg
      class="animate-spin text-current"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        fill="currentColor"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: "md", // варианты: sm, md, lg
  },
});
</script>
