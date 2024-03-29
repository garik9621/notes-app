<script setup lang="ts">
import { toRefs, unref } from 'vue';
import { useNotesStore } from '@entities/note';
import { deleteNoteRequest } from '../api';

const emit = defineEmits(['success', 'cancel']);

const props = defineProps<{
  id: string;
}>();

const { deleteNote: deleteNoteAction } = useNotesStore();

const { id } = toRefs(props);

const deleteNote = async () => {
  await deleteNoteRequest(unref(id))
  deleteNoteAction(unref(id));
  emit('success');
};

const cancelDelete = () => {
  emit('cancel');
};
</script>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-typography-title :level="2" style="width: 100%"
      >Are you sure you want to delete note?</a-typography-title
    >
    <a-space>
      <a-button type="primary" danger @click="deleteNote">Yes</a-button>
      <a-button type="primary" @click="cancelDelete">No</a-button>
    </a-space>
  </a-space>
</template>
