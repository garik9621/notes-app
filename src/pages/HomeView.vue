<script setup lang="ts">
import { h } from 'vue';
import { PlusOutlined, EditOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <main>
    <a-button type="primary" size="large" :icon="h(PlusOutlined)">Add note</a-button>
    <a-card title="Card title" style="width: 100%">
      <template #extra><a-button size="small" type="primary" :icon="h(EditOutlined)">Edit note</a-button></template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error necessitatibus perspiciatis quia repudiandae sed. Accusantium amet aperiam architecto commodi eaque explicabo illum in inventore, laborum molestias possimus ratione reiciendis totam.
      </p>
    </a-card>
  </main>
</template>
