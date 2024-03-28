<script setup lang="ts">

import {toRefs, unref} from "vue";
import {useNotesStore} from "@entities/note";
import {deleteNoteRequest} from "../api";

const props = defineProps<{
  id: string;
}>();

const { id: noteId } = toRefs(props);

const {
  deleteNote: deleteNoteAction
} = useNotesStore();

const deleteNote = async () => {
  await deleteNoteRequest(unref(noteId));

  deleteNoteAction(unref(noteId));
}

</script>

<template>
  <a-button
      type="primary"
      size="small"
      @click="deleteNote"
  >
    Delete note
  </a-button>
</template>

<style scoped>

</style>