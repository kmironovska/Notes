import React from 'react';
import axios from "axios";

export default class ManageTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            name: ''
        }
    }

    onChangeHandler = (e, key) => {
        this.setState({
            [key]: e.target.value
        });
    }

    componentDidMount() {
        axios.get('/api/tags')
            .then(response => {
                this.setState({
                    tags: response.data
                });
            });
    }

    createTag = (e) => {
        e.preventDefault();
        console.log(e.state);
        if (this.state.tags.name !== '') {
            axios.post('/api/tags', this.state)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                })
        }


    }

    deleteTag = (id) => {
        axios.delete("api/tags/" + id)
            .then(response => {
                if (response.data != null) {
                    alert("Deleted succesfully");
                    this.setState({
                        tags: this.state.tags.filter(tag => tag.id !== id)
                    })
                }
            })

    }

    updateTag = (e, tag) => {
        if (e.keyCode === 13) {
            axios.put('/api/tags/' + tag.id, tag)
                .then(response => {
                    console.log(response);
                })
        }
    }

    handleChange = (e, i) => {
        const {name, value} = e.target;
        const array = [...this.state.tags];
        const updatedObj = {...array[i], [name]: value};
        const updatedValues = [
            ...array.slice(0, i),
            updatedObj,
            ...array.slice(i + 1),
        ];
        this.setState(
            {tags: updatedValues}
        )
        console.log(this.state.tags);
    }

    render() {
        const {tags} = this.state
        return (
            <div className="manage-tags-page col-lg-6 col-md-8">
                <div className="row">
                    <div className="col-12">
                        <input type="text" class="text-field col-6" placeholder="create new tag" value={tags.name}
                               onChange={(e) =>
                                   this.onChangeHandler(e, 'name')}/>
                        <input type="button" onClick={this.createTag} value="Create"/>
                    </div>
                </div>

                <div className="row">
                    {this.state.tags.map((tag, i) =>
                        <div className="existing-tags col-12">
                            <input key={tag.id} name={'name'} type="text" class="text-field col-6" value={tag.name}
                                   onChange={(e) => this.handleChange(e, i)}
                                   onKeyDown={(e) => this.updateTag(e, tag)}/>
                            <input type="button" onClick={() => this.deleteTag(tag.id)} value="Delete"/>
                        </div>
                    )}
                </div>

            </div>
        )
    }

}