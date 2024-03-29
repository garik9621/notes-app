<script setup lang="ts">
import { ref } from 'vue';
import { NoteCard, useNotesStore } from '@entities/note';
import { EditNote } from '@features/edit-note';
import { DeleteNoteConfirm } from '@features/delete-note';

const { items: notes } = useNotesStore();

const targetNoteId = ref('');

const popupComponent = ref('')
const isOpenEditDeletePopup = ref(false);

const handleDeleteNoteEvent = (id: string) => {
  popupComponent.value = 'edit-node'
  isOpenEditDeletePopup.value = true;
  targetNoteId.value = id;
};

const handleEditNoteEvent = (id: string) => {
  popupComponent.value = 'delete-note-confirm'
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
    <!-- TODO: разобраться, почему не подхватываются компоненты -->
    <component :is="popupComponent" :id="targetNoteId" style="padding: 20px 20px 0" @success="isOpenEditDeletePopup = false" @cancel="isOpenEditDeletePopup = false"/>
    <template #footer></template>
  </a-modal>
</template>
