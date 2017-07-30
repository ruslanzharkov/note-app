import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Note';

const Note = mongoose.model('Note');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listNotes(id) {
    return Note.find();
}

export function listCheckedNotes() {
    return Note.find({"checked": true});
}

export function createNote(data) {
    const note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date(),
        checked: false
    });

    return note.save();
}

export function updateNote(id, data) {
    return Note.findByIdAndUpdate({_id: id}, data);
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}

