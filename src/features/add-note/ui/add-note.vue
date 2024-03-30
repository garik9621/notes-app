<script setup lang="ts">
import { NoteEditForm, useNotesStore } from '@entities/note';
import { addNoteRequest } from '../api';
import { ref } from 'vue';

const emit = defineEmits(['success']);

const { addNote } = useNotesStore();

const loading = ref(false);

const addNewNote = async (data: { title: string; text: string }) => {
  loading.value = true;

  try {
    const newNoteId = await addNoteRequest(data);

    addNote({
      ...data,
      id: newNoteId,
    });

    emit('success');
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <note-edit-form :loading="loading" @submit="addNewNote" />
</template>
