import { defineStore } from 'pinia';
import type { INote } from './INote';
import type { Ref } from 'vue';
import { ref, unref } from 'vue';

export const useNotesStore = defineStore('notes', () => {
  const items: Ref<INote[]> = ref([]);

  const getNoteById = (id: string) => unref(items).find((item) => item.id === id);

  const addNote = (item: INote) => {
    items.value.push(item);
  };

  const deleteNote = (id: string) => {
    items.value = unref(items).filter((item) => item.id !== id);
  };

  const updateNote = (id: string, payload: { title: string; text: string; }) => {
    const targetItemIndex = unref(items).findIndex((item) => item.id === id);

    if (targetItemIndex < 0 || !unref(items)[targetItemIndex]) {
      return;
    }

    items.value[targetItemIndex] = {
      id,
      ...payload,
    };
  };

  return {
    items,
    addNote,
    deleteNote,
    updateNote,
    getNoteById,
  };
});
