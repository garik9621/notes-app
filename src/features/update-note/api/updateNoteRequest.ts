import axios from "axios";

export const updateNoteRequest = async (id: string, note: { title: string, text: string }): Promise<void> => {
    try {
        await axios.post('http://localhost:3001/note/update', { id, ...note })
    } catch(e) {
        console.error(e)
    }
};