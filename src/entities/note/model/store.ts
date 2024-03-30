import { defineStore } from 'pinia';
import type { INote } from './INote';
import type { Ref } from 'vue';
import { ref, unref } from 'vue';
import axios from 'axios';

export const useNotesStore = defineStore('notes', () => {
  const items: Ref<INote[]> = ref([]);

  const getNoteById = (id: string) => unref(items).find((item) => item.id === id);

  const getNotes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes`);
      const notes = data.data;

      Object.keys(notes).forEach((key) => items.value.push(notes[key]));
    } catch (e) {
      console.error(e);
    }
  };

  const addNote = (item: INote) => {
    items.value.push(item);
  };

  const deleteNote = (id: string) => {
    const targetItemIndex = unref(items).findIndex((item) => item.id === id);

    if (targetItemIndex < 0) {
      return;
    }

    items.value.splice(targetItemIndex, 1);
  };

  const updateNote = (id: string, payload: { title: string; text: string }) => {
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
    getNotes,
    addNote,
    deleteNote,
    updateNote,
    getNoteById,
  };
});
