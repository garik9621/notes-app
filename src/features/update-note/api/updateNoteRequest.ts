import axios from 'axios';

export const updateNoteRequest = async (
  id: string,
  note: { title: string; text: string },
): Promise<void> => {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/note/update`, { id, ...note });
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
};
