<script setup lang="ts">
import { h, ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { EditNote } from '@features/edit-note';

const isOpenAddNoteDialog = ref(false);

const openAddNoteDialog = () => {
  isOpenAddNoteDialog.value = true;
};

const handleToggleDialogVisibility = (value: boolean) => {
  isOpenAddNoteDialog.value = value;
};
</script>

<template>
  <a-button
    type="primary"
    size="large"
    :icon="h(PlusOutlined)"
    style="width: 100%; margin: 0 0 20px"
    @click="openAddNoteDialog"
  >
    Edit note
  </a-button>

  <a-modal v-model:open="isOpenAddNoteDialog">
    <edit-note :note-id="" @toggle="handleToggleDialogVisibility" />
    <template #footer></template>
  </a-modal>
</template>

<style scoped></style>
