<script setup lang="ts">
import {onMounted, ref, shallowRef} from 'vue';
import { NoteCard, useNotesStore } from '@entities/note';
import UpdateNote from '@features/update-note/ui/update-note.vue';
import DeleteNoteConfirm from '@features/delete-note/ui/delete-note-confirm.vue';

const { items: notes, getNotes } = useNotesStore();

const targetNoteId = ref('');
const loading = ref(true);

const popupComponent = shallowRef();
const isOpenEditDeletePopup = ref(false);

const handleDeleteNoteEvent = (id: string) => {
  popupComponent.value = DeleteNoteConfirm;
  isOpenEditDeletePopup.value = true;
  targetNoteId.value = id;
};

const handleEditNoteEvent = (id: string) => {
  popupComponent.value = UpdateNote;
  isOpenEditDeletePopup.value = true;
  targetNoteId.value = id;
};

onMounted(async () => {
  await getNotes();

  loading.value = false;
});
</script>

<template>
  <div v-if="loading" style="text-align: center">
    <a-spin size="large" />
  </div>

  <template v-else>
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
      <component
          v-if="isOpenEditDeletePopup"
          :is="popupComponent"
          :id="targetNoteId"
          style="padding: 20px 20px 0"
          @success="isOpenEditDeletePopup = false"
          @cancel="isOpenEditDeletePopup = false"
      />
      <template #footer></template>
    </a-modal>
  </template>
</template>
