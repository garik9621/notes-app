import axios from 'axios';

export const deleteNoteRequest = async (id: string): Promise<void> => {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/note/delete`, { id });
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
};
