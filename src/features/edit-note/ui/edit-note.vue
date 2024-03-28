<script setup lang="ts">
import { NoteEditForm, useNotesStore } from '@entities/note';
import type { INoteEditFormState } from '@entities/note';
import { updateNoteRequest } from '../api';
import { unref, toRefs, computed } from 'vue';

const emit = defineEmits(['success']);

const props = defineProps<{
  id: string;
}>();

const { id } = toRefs(props);

const { updateNote: updateNoteAction, getNoteById } = useNotesStore();

const noteTitle = computed(() => getNoteById(unref(id))?.title || '');
const noteText = computed(() => getNoteById(unref(id))?.text || '');

const updateNote = async (data: INoteEditFormState) => {
  // const newNoteId = await updateNoteRequest(unref(id), data);

  updateNoteAction(unref(id), data);

  emit('success');
};
</script>

<template>
  <note-edit-form
    :default-note-title="noteTitle"
    :default-note-text="noteText"
    @submit="updateNote"
  />
</template>
