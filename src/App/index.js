import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch} from 'react-router';

import {Home} from './Schedule';

class App extends Component {
    constructor(){
        super();
        this.state = {
            modal: null
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal(modal){
        this.setState({modal});
    }
    closeModal(){
        this.setState({modal: null});
    }
    render(){
        const Modal = this.state.modal;
        return(
            <Router>
                <Switch>
                    <Route path="/" render={(props) => <Home openModal={this.openModal} closeModal={this.closeModal} />} />
                </Switch>
                {
                    this.state.modal !== null ?
                    <div className="modal">
                        <div className="modalBackdrop" onClick={this.closeModal}></div>
                        <div className="modalContent"><Modal openModal={this.openModal} closeModal={this.closeModal} /></div>
                    </div>
                    : null
                }
            </Router>
        )
    }
}

export default App;