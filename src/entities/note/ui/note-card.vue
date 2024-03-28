<script setup lang="ts">
import { h } from 'vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import type { INote } from '@entities/note';

const emit = defineEmits(['edit', 'delete']);

defineProps<{
  title: INote['title'];
  text: INote['text'];
}>();

const handleEditClickEvent = () => {
  emit('edit');
};

const handleDeleteClickEvent = () => {
  emit('delete');
};
</script>

<template>
  <a-card :title="title" style="width: 100%">
    <template #extra>
      <a-space>
        <a-button size="small" type="primary" :icon="h(EditOutlined)" @click="handleEditClickEvent">
          Edit note
        </a-button>
        <a-button
          size="small"
          type="primary"
          danger
          :icon="h(DeleteOutlined)"
          @click="handleDeleteClickEvent"
        >
          Delete note
        </a-button>
      </a-space>
    </template>
    <p>
      {{ text }}
    </p>
  </a-card>
</template>
