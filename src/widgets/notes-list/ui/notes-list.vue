<script setup lang="ts">
import { type INote, NoteCard, useNotesStore } from '@entities/note';
import { EditNote } from '@features/edit-note';
import { ref } from 'vue';

const { items: notes } = useNotesStore();

const targetNoteId = ref('');

const isOpenEditDeletePopup = ref(false);

const handleDeleteNoteEvent = (id: string) => {
  isOpenEditDeletePopup.value = true;
  targetNoteId.value = id;
};

const handleEditNoteEvent = (id: string) => {
  isOpenEditDeletePopup.value = true;
  targetNoteId.value = id;
};
</script>

<template>
  <a-empty v-if="notes.length === 0">
    <template #description> Add first note by click "Add note" </template>
  </a-empty>

  <template v-else>
    <a-space direction="vertical" style="width: 100%">
      <note-card
        v-for="{ id, title, text } in notes"
        :key="id"
        :title="title"
        :text="text"
        @delete="handleDeleteNoteEvent(id)"
        @edit="handleEditNoteEvent(id)"
      />
    </a-space>
  </template>

  <a-modal v-model:open="isOpenEditDeletePopup">
    <edit-note :id="targetNoteId" @success="isOpenEditDeletePopup = false" />
    <template #footer></template>
  </a-modal>
</template>
