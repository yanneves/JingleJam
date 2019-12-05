import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch} from 'react-router';

import {Home, ExpandedStream} from './Schedule';
import {CreatorProfile} from './Components/DetailStreamer/StreamerDetails';

import pinkLogo from './Schedule/logo_pink.png';

class App extends Component {
    constructor(){
        super();
        var loading = true;
        var loadingHidden = false;
        if (localStorage.getItem("cache")){
            loading = false;
            loadingHidden = true;
        }

        var watched = [];
        if (localStorage.getItem("watched")){
            watched = localStorage.getItem("watched").split(",");
        } else {
            localStorage.setItem("watched", watched.toString());
        }

        this.state = {
            loading,
            loadingHidden,
            watched
        }
        this.toggleLoading = this.toggleLoading.bind(this);
        this.addWatched = this.addWatched.bind(this);
        this.removeWatched = this.removeWatched.bind(this);
    }
    addWatched(id){
        if (id !== null && id !== undefined && id !== ''){
            var watched = this.state.watched;
            if (watched.indexOf(id) === -1){
                watched.push(id);
                localStorage.setItem("watched", watched.toString());
                this.setState({watched});
            }
        }
    }
    removeWatched(id){
        if (id !== null && id !== undefined && id !== ''){
            var watched = this.state.watched;
            if (watched.indexOf(id) !== -1){
                watched.splice(watched.indexOf(id), 1);
                localStorage.setItem("watched", watched.toString());
                this.setState({watched});
            }
        }
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
        return(
            <Router>
                <Home toggleLoading={this.toggleLoading}/>
                <Switch>
                    <Route path="/stream/:streamid" exact render={(props) => <ExpandedStream {...props} watched={this.state.watched} addWatched={this.addWatched} removeWatched={this.removeWatched}/>} />
                    <Route path="/creator/:creatorid" exact render={(props) => <CreatorProfile {...props} />} />
                </Switch>
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