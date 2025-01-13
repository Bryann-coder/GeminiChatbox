<script setup lang="ts">
  import { useAuth } from '@/composables/auth.composable'

  const auth = useAuth()
</script>

<template>
  <div>
    <ul>
      <li>hasFailed: {{ auth.hasFailed }}</li>
      <li>isLoading: {{ auth.isLoading }}</li>
      <li>error: {{ auth.error }}</li>
      <li>user: <pre>{{ auth.rawUser }}</pre>
      </li>
    </ul>
  </div>
</template>