import axios from 'axios';
import { apiPrefix } from '../../etc/config.json';

export default {
    listNotes() {
        return axios.get(`${apiPrefix}/notes`);
    },

    createNote(data) {
        return axios.post(`${apiPrefix}/notes`, data);
    },

    updateNote(data) {
        return axios.put(`${apiPrefix}/notes/${data.id}`, data);
    },

    deleteNote(noteId) {
        return axios.delete(`${apiPrefix}/notes/${noteId}`);
    }
}