<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    "
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'login',
})
</script>
