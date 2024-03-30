<script setup lang="ts">
import { NoteEditForm, useNotesStore } from '@entities/note';
import { updateNoteRequest } from '../api';
import { unref, toRefs, computed, ref } from 'vue';

const emit = defineEmits(['success']);

const props = defineProps<{
  id: string;
}>();

const { id } = toRefs(props);

const { updateNote: updateNoteAction, getNoteById } = useNotesStore();

const noteTitle = computed(() => getNoteById(unref(id))?.title || '');
const noteText = computed(() => getNoteById(unref(id))?.text || '');

const loading = ref(false);

const updateNote = async (data: { text: string; title: string }) => {
  loading.value = true;

  try {
    await updateNoteRequest(unref(id), data);

    updateNoteAction(unref(id), data);

    emit('success');
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <note-edit-form
    :default-note-title="noteTitle"
    :default-note-text="noteText"
    :loading="loading"
    @submit="updateNote"
  />
</template>
