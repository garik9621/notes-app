import axios, { type AxiosResponse } from 'axios';

export const addNoteRequest = async (note: { title: string; text: string }): Promise<string> => {
  try {
    const response: AxiosResponse<{ data: { id: string } }> = await axios.post(
      'http://localhost:3001/note/add',
      note,
    );

    return response.data.data.id;
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
};
