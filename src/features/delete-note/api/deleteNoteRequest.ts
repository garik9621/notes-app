import axios from "axios";

export const deleteNoteRequest = async (id: string): Promise<boolean> => {
    try {
        await axios.post('http://localhost:3001/note/delete', { id })
    } catch(e) {
        console.error(e)
    }
}