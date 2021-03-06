/**
 * Created by loki on 23.07.17.
 */
import React from 'react';

import NotesStore from '../stores/NotesStore';
import NotesActions from '../actions/NotesActions';

import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import ColorPicker from './ColorPicker.jsx';
import './ColorPicker.less';
import './NoteEditor.less';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        notes: NotesStore.getNotes()
    };
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
        isOpen: false;
        noteId: '';
        noteTitle: '';
        noteText: '';
        noteColor: '';
    },

    openModal() {
        this.setState({
            isOpen: true
        });
    },
 
    hideModal(){
        this.setState({
            isOpen: false
        });
    },

    componentWillMount() {
        NotesActions.loadNotes();  
    },

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    },

    handleNoteAdd(data) {
        NotesActions.createNote(data);
    },

    handleNoteDelete(notes) {
        NotesActions.deleteNote(notes.id);
    },

    handleNoteUpdate(notes) {
        if (this.state.isOpen)
        {
            const updatedNote = {
                id: this.state.noteId,
                title: this.state.noteTitle,
                text: this.state.noteText,
                color: this.state.noteColor
            };
            NotesActions.updateNote(updatedNote);
            this.hideModal();
        } else {
            NotesActions.updateNote(notes);
        }
        
    },

    handleGetNote(notes) {
        this.state.noteId = notes.id;
        this.state.noteTitle = notes.title;
        this.state.noteText = notes.text;
        this.state.noteColor = notes.color;
        this.openModal();
    },

    handleCheckNote(notes) {
        if(notes.checked === false) {
            document.getElementById(notes.id).style.textDecoration = 'line-through';
            notes.checked = true;
            this.handleNoteUpdate(notes);
        } else {
            document.getElementById(notes.id).style.textDecoration = 'none';
            notes.checked = false;
            this.handleNoteUpdate(notes);
        }

    },

    handleTextChange(event) {
        this.setState({ noteText: event.target.value });
    },

    handleTitleChange(event) {
        this.setState({ noteTitle: event.target.value});
    },

    handleColorChange(noteColor) {
        this.setState({ noteColor });
    },

    handleShowCheckedNotes(notes) {
         if(notes.checked === false) {
            document.getElementById(notes.id).style.textDecoration = 'line-through';
        } else {
            document.getElementById(notes.id).style.textDecoration = 'none';
        }
    },

    render() {
        return (
            <div className="App">

                <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                <ModalHeader>
                    <ModalClose onClick={this.hideModal}/>
                    <ModalTitle>Update Note</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <input
                            type='text'
                            className="NoteEditor__title"
                            placeholder="Enter title"
                            value={this.state.noteTitle}
                            onChange={this.handleTitleChange}
                        />
                        <textarea
                            placeholder="Enter note text"
                            rows={5}
                            value={this.state.noteText}
                            className="NoteEditor__text"
                            onChange={this.handleTextChange}
                        />
                        <ColorPicker
                            value={this.state.noteColor}
                            onChange={this.handleColorChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    
                    <button className='btn-update' onClick={this.handleNoteUpdate}>
                        Update Note
                    </button>
                </ModalFooter>
                </Modal>

                <h2 className="App__header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes}
                           onNoteDelete={this.handleNoteDelete}
                           onNoteCheck={this.handleCheckNote}
                           onNoteUpdate={this.handleGetNote}
                />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }    
});

export default App;