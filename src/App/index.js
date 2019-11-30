import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch} from 'react-router';

import {Home} from './Schedule';

import pinkLogo from './Schedule/logo_pink.png';

class App extends Component {
    constructor(){
        super();
        this.state = {
            modal: null,
            loading: true,
            loadingHidden: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
    }
    openModal(modal){
        this.setState({modal});
    }
    closeModal(){
        this.setState({modal: null});
    }
    toggleLoading(){
        const loading = this.state.loading;

        if (loading){
            this.setState({
                loadingHidden: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        loading: !loading
                    });
                }, 200);
            });
        } else {
            this.setState({
                loadingHidden: true
            }, () => {
                this.setState({
                    loading: !loading
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            loadingHidden: false
                        });
                    }, 200)
                })
            })
        }
    }
    render(){
        const Modal = this.state.modal;
        return(
            <Router>
                <Switch>
                    <Route path="/" render={(props) => <Home openModal={this.openModal} closeModal={this.closeModal} toggleLoading={this.toggleLoading} />} />
                </Switch>
                {
                    this.state.modal !== null ?
                    <div className="modal">
                        <div className="modalBackdrop" onClick={this.closeModal}></div>
                        <div className="modalContent"><Modal openModal={this.openModal} closeModal={this.closeModal} toggleLoading={this.toggleLoading} /></div>
                    </div>
                    : null
                }
                {
                    this.state.loading ?
                    <div className={this.state.loadingHidden ? "modal loading hidden" : "modal loading"}>
                        <div className="modalBackdrop loading"></div>
                        <div className="modalContent loading">
                            <img src={pinkLogo} className="pinkLogo" alt="Jingle Jam Pink Logo" />
                        </div>
                    </div>
                    : null
                    
                }
            </Router>
        )
    }
}

export default App;