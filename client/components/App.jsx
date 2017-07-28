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
        NotesActions.updateNote(notes);
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
        this.setState({ text: event.target.value });
    },

    handleTitleChange(event) {
        this.setState({ title: event.target.value});
    },

    handleColorChange(color) {
        this.setState({ color });
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
                            value={this.props.title}
                            onChange={this.handleTitleChange}
                        />
                        <textarea
                            placeholder="Enter note text"
                            rows={5}
                            value={this.props.text}
                            className="NoteEditor__text"
                            onChange={this.handleTextChange}
                        />
                        <ColorPicker
                            value={this.state.color}
                            onChange={this.handleColorChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    
                    <button className='btn-update'>
                        Update Note
                    </button>
                </ModalFooter>
                </Modal>

                <h2 className="App__header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes}
                           onNoteDelete={this.handleNoteDelete}
                           onNoteCheck={this.handleCheckNote}
                           onNoteUpdate={this.openModal}
                />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }    
});

export default App;