import React, {Component} from 'react';
import axios from "axios";
import Select from 'react-select';
import {Redirect} from 'react-router';

export default class NoteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: [],
            usersTagsId: []

        }
        // this.handleChange = this.handleChange.bind(this);
        //this.createNote = this.createNote.bind(this);
    }


    onChangeHandler = (e, key) => {
        this.setState({
            [key]: e.target.value
        });
    }

    handleChange = (e) => {
        let ids = []
        ids = e.map(item => item.id)
        console.log(ids)
        this.setState({
            usersTagsId: ids
        });


    }

    componentDidMount() {
        axios.get('/api/tags')
            .then(response => {
                console.log(response);
                this.setState({
                    tags: response.data
                });
            });
    }

    createNote = (e) => {
        e.preventDefault();
        console.log(e.state);
        if (this.state.title !== '' && this.state.content !== '') {
            const data = {
                title: this.state.title,
                content: this.state.content,
                tags: this.state.usersTagsId
            }
            axios.post('/api/notes', data)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                })
        }
        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        const {title, content, tags} = this.state;
        // const selectedTags = this.selectedTags;
        return (
            <form class="note-form col-lg-6 col-md-8">
                <h3>Create a new note</h3>
                <div class="row">
                    <label htmlFor="noteform-title">Title</label>
                    <input type="text" id="noteform-title" class="text-field col-12" value={title} onChange={(e) =>
                        this.onChangeHandler(e, 'title')}/>
                </div>
                <div class="row">
                    <label htmlFor="noteform-note">Note</label>
                    <textarea name="noteform-note" class="textarea-field note-textarea col-12" id="noteform-note"
                              value={content} onChange={(e) =>
                        this.onChangeHandler(e, 'content')}></textarea>
                </div>
                <br/>
                <Select
                    isMulti
                    value={this.selectedTags}
                    onChange={this.handleChange}
                    getOptionValue={option => option.id}
                    getOptionLabel={option => option.name}
                    options={tags}
                />
                <button type="submit" className="btn btn-danger" onClick={this.createNote}>Save</button>
                <a className="btn btn-light" onClick={() => window.location.href = '/'}>Cancel</a>
            </form>
        )

    }
}