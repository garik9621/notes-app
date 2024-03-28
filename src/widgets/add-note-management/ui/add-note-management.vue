<script setup lang="ts">
import { h, ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { AddNote } from '@features/add-note';

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
    Add note
  </a-button>

  <a-modal v-model:open="isOpenAddNoteDialog">
    <add-note style="padding: 20px 20px 0" @success="handleToggleDialogVisibility" />
    <template #footer></template>
  </a-modal>
</template>

<style scoped></style>
