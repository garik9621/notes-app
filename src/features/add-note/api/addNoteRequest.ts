import axios from "axios";

export const addNoteRequest = async (note: { title: string, text: string }): Promise<string> => {
  try {
    const { data } = axios.post('http://localhost:3001/note/add', note)

    return data.data.id;
  } catch(e) {
    console.error(e)
  }
};
