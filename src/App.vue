<script setup lang="ts">
  import GoogleLogin from './components/GoogleLogin.vue'; 
</script>

<template>
  <div :class="$style.wrapper">
    <GoogleLogin />
  </div>
</template>

<style module>
  .wrapper {
    padding: 20px;
  }
</style>