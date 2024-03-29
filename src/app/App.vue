<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { FormOutlined } from '@ant-design/icons-vue';
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header style="text-align: center">
      <a-space>
        <form-outlined :style="{ color: '#fff', fontSize: '2em' }" /><a-typography-title
          style="color: #fff; margin: 0; padding: 8px 0"
          >Notes App</a-typography-title
        >
      </a-space>
    </a-layout-header>
    <a-layout-content style="padding: 50px; width: 100%; max-width: 1200px; margin: 0 auto">
      <RouterView />
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>
