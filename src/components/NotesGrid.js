import React, {Component} from 'react';
import axios from 'axios';
import './NotesGrid.css';


export default class NotesGrid extends Component {

    state = {
        notes: [],
        initialNotes: []
    }

    componentDidMount() {
        axios.get('/api/notes')
            .then(response => {
                this.setState({
                    notes: response.data,
                    initialNotes: response.data
                });
            });
    }

    removeNote = (id) => {
        axios.delete("api/notes/" + id)
            .then(response => {
                if (response.data != null) {
                    alert("Deleted succesfully");
                    this.setState({
                        notes: this.state.notes.filter(note => note.id !== id)
                    })
                }
            }).catch(e => console.log('hhhhhh'))

    }

    findNotesByTags = (id) => {

        axios.get("/api/tags/" + id + "/notes")
            .then(response => {

                this.setState({
                    notes: response.data
                })

            }).catch(e => console.log('fail'))
    }

    render() {
        return (
            <>
                <button onClick={() => this.setState({notes: this.state.initialNotes})}>clear filter</button>
                <div className="note-list">
                    {this.state.notes.map(note =>
                        <div className="note">
                            <div className="note-header" key={note.id}>
                                <div className="delete-note-button" onClick={() => this.removeNote(note.id)}>
                                    <i className="fa fa-close"></i>
                                </div>
                                <h6>{note.title}</h6>

                            </div>
                            <div className="note-content">
                                <p>{note.content}</p>
                            </div>
                            <NoteFooter note={note} tags={note.tags} onClick={this.findNotesByTags}/>
                        </div>
                    )}
                </div>
            </>
        )
    }
}

function NoteFooter({note, tags, onClick}) {
    return (
        <div className="row note-footer">
            <div className="col-11 note-tags">
                <div className="note-tags">
                    <div className="note-tag">
                        {tags.map(
                            tag => <label onClick={() => onClick(tag.id)}>#{tag.name} </label>)}
                    </div>
                </div>
            </div>
            <a className="edit-note-button" onClick={() => window.location.href = '/edit-note/' + note.id}>
                <i className="fa fa-pencil"></i>
            </a>
        </div>
    );
}

NoteFooter.propTypes = {};


export const Example = () => <NotesGrid/>;
