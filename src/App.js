import React from 'react';
import './App.css';
import NotesGrid from "./components/NotesGrid";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import ManageTags from './components/ManageTags';
import EditNote from "./components/EditNote";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Route
                    path="/" exact
                    render={props => (
                        <div className="App">
                            <header className="header row">
                                <a class="header-logo col" onClick={() => window.location.href = '/'}>Seavus Notes</a>
                                <Link to="/manage-tags">
                                    <button className=" button-field manage-tags-button">Manage Tags</button>
                                </Link>
                            </header>
                            <main>
                                <NotesGrid {...props}/>
                            </main>
                            <footer className="App-footer">
                                <Link to="/create-note">
                                    <button className="create-note-button">+</button>
                                </Link>
                            </footer>
                        </div>

                    )}>
                </Route>
                <Route path="/create-note">
                    <Header/>
                    <NoteForm/>
                </Route>
                <Route path="/manage-tags">
                    <Header/>
                    <ManageTags/>
                </Route>
                <Route path="/edit-note/:id" render={props => (
                    <div className="edit-note">
                        <Header/>
                        <EditNote {...props}/>
                    </div>

                )}>
                </Route>

                <Link to="/edit-note"></Link>
            </Router>
        );
    }
}

export default App;
