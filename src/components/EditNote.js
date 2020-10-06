import React, {Component} from 'react';
import axios from 'axios';
import Select from "react-select";
import {Redirect} from 'react-router';

export default class EditNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: [],
            notes: [],
            usersTagsId: []
        }
    }

    componentDidMount() {
        axios.get('/api/tags')
            .then(response => {

                this.setState({
                    tags: response.data
                });
            });
        axios.get("/api/notes/" + this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    content: response.data.content,
                    title: response.data.title,
                    usersTagsId: response.data.tags
                })
            })
    }

    updateNote = (id) => {
        if (this.state.title !== '' && this.state.content !== '') {
            const data = {
                title: this.state.title,
                content: this.state.content,
                tags: this.state.usersTagsId
            }
            console.log(id);
            axios.put('/api/notes/' + id, data)
                .then(response => {
                    console.log(response);
                })
            this.setState({
                redirect: true
            })

        }
    }

    handleChange = (e) => {
        let ids = []
        ids = e.map(item => item.id)
        console.log(ids);
        this.setState({
            usersTagsId: ids
        });


    }
    onChangeHandler = (e, key) => {
        this.setState({
            [key]: e.target.value
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        const {title, content, tags, notes} = this.state;
        return (
            <form class="note-form col-lg-6 col-md-8">
                <h3>Update note</h3>
                <div class="row">
                    <label htmlFor="noteform-title">Title</label>
                    <input type="text" id="noteform-title" class="text-field col-12" value={this.state.title}
                           onChange={(e) =>
                               this.onChangeHandler(e, 'title')}/>
                </div>
                <div class="row">
                    <label htmlFor="noteform-note">Note</label>
                    <textarea name="noteform-note" id="noteform-note" class="textarea-field note-textarea col-12"
                              defaultValue={content} value={this.state.content} onChange={(e) =>
                        this.onChangeHandler(e, 'content')}></textarea>
                </div>
                <br/>
                <Select
                    isMulti
                    value={this.state.usersTagsId}
                    onChange={this.handleChange}
                    getOptionValue={option => option.id}
                    getOptionLabel={option => option.name}
                    options={tags}
                />
                <button type="submit" className="btn btn-danger"
                        onClick={() => this.updateNote(this.props.match.params.id)}>Save
                </button>
                <a className="btn btn-light" onClick={() => window.location.href = '/'}>Cancel</a>
            </form>
        )
    }
}