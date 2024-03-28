<script setup lang="ts">
import { NoteEditForm, useNotesStore } from '@entities/note';
import type { INoteEditFormState } from '@entities/note';
import { addNoteRequest } from '../api';

const emit = defineEmits(['success']);

const { addNote } = useNotesStore();

const addNewNote = async (data: { title: string; text: string }) => {
  const newNoteId = await addNoteRequest(data);

  addNote({
    ...data,
    id: newNoteId,
  });

  emit('success');
};
</script>

<template>
  <note-edit-form @submit="addNewNote" />
</template>
