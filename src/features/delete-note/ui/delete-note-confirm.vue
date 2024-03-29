<script setup lang="ts">

import { useNotesStore } from '@entities/note';
import { toRefs, unref } from 'vue';
import { deleteNoteRequest } from '../api';

const emit = defineEmits(['success', 'cancel'])

const props = defineProps<{
  id: string
}>()

const {
  deleteNote: deleteNoteAction
} = useNotesStore()

const { id } = toRefs(props);

const deleteNote = async () => {
  //await deleteNoteRequest(unref(id))
  deleteNoteAction(unref(id));

  emit('success')
}

const cancelDelete = () => {
  emit('cancel')
}
</script>

<template>
  <a-typography-text style="text-align: center">Are you sure you want to delete note?</a-typography-text>
  <a-space>
    <a-button type="primary" danger @click="deleteNote">Yes</a-button>
    <a-button type="primary" @click="cancelDelete">No</a-button>
  </a-space>
</template>