<script setup lang="ts">
import { reactive, toRefs, unref } from 'vue';
import { noteNameRequired, noteTextRequired } from '../lib';
import type { INoteEditFormState } from '../model';

const props = defineProps<{
  defaultNoteTitle?: string;
  defaultNoteText?: string;
  loading?: boolean;
}>();

const { defaultNoteTitle, defaultNoteText } = toRefs(props);

const emit = defineEmits<{
  submit: [data: { title: string; text: string }];
}>();

const formState = reactive<INoteEditFormState>({
  noteTitle: unref(defaultNoteTitle) || '',
  noteText: unref(defaultNoteText) || '',
});

const handleSubmitValidForm = () => {
  emit('submit', {
    title: formState.noteTitle,
    text: formState.noteText,
  });

  formState.noteTitle = '';
  formState.noteText = '';
};
</script>

<template>
  <a-form
    :model="formState"
    :label-col="{ span: 8 }"
    name="editForm"
    :wrapper-col="{ span: 16 }"
    @finish="handleSubmitValidForm"
  >
    <a-form-item label="Note name" name="noteTitle" :rules="[noteNameRequired]">
      <a-input v-model:value="formState.noteTitle" />
    </a-form-item>

    <a-form-item label="Note text" name="noteText" :rules="[noteTextRequired]">
      <a-textarea v-model:value="formState.noteText" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" :loading="loading">Send</a-button>
    </a-form-item>
  </a-form>
</template>
