import type { INoteEditFormState } from '@entities/note';

export const addNoteRequest = async (data: INoteEditFormState): Promise<string> => {
  return Promise.resolve(`${Math.floor(Math.random() * 999999)}`);
};
