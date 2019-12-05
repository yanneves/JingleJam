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
        this.state = {
            loading,
            loadingHidden
        }
        this.toggleLoading = this.toggleLoading.bind(this);
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
                <Home toggleLoading={this.toggleLoading} />
                <Switch>
                    <Route path="/stream/:streamid" exact render={(props) => <ExpandedStream {...props} />} />
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