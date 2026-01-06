<template>
  <div>
<h1 class="text-center text-3xl">
  GUEST ONLY
</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'main-layout',
  sanctum: {
    guestOnly: true
  }
})
</script>

<style></style>