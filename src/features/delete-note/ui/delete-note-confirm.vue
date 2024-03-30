<script setup lang="ts">
import { ref, toRefs, unref } from 'vue';
import { useNotesStore } from '@entities/note';
import { deleteNoteRequest } from '../api';

const emit = defineEmits(['success', 'cancel']);

const props = defineProps<{
  id: string;
}>();

const { deleteNote: deleteNoteAction } = useNotesStore();

const { id } = toRefs(props);

const loading = ref(false);

const deleteNote = async () => {
  loading.value = true;

  try {
    await deleteNoteRequest(unref(id));
    deleteNoteAction(unref(id));
    emit('success');
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
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
      <a-button type="primary" danger :loading="loading" @click="deleteNote">Yes</a-button>
      <a-button type="primary" @click="cancelDelete">No</a-button>
    </a-space>
  </a-space>
</template>
