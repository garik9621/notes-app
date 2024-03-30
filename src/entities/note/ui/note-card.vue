<script setup lang="ts">
import { h } from 'vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import type { INote } from '@entities/note';
import { Grid } from 'ant-design-vue';

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

const useBreakpoint = Grid.useBreakpoint;
const screens = useBreakpoint();
</script>

<template>
  <a-card :title="title" style="width: 100%">
    <template #extra>
      <a-space>
        <a-button size="small" type="primary" :icon="h(EditOutlined)" @click="handleEditClickEvent">
          {{ screens.sm ? 'Edit note' : '' }}
        </a-button>
        <a-button
          size="small"
          type="primary"
          danger
          :icon="h(DeleteOutlined)"
          @click="handleDeleteClickEvent"
        >
          {{ screens.sm ? 'Delete note' : '' }}
        </a-button>
      </a-space>
    </template>
    <p>
      {{ text }}
    </p>
  </a-card>
</template>
