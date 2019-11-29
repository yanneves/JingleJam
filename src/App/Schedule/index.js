import React, {Component} from 'react';

import './schedule.scss';
import logoWhite from './logo_white.png';

class Home extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return(
            <div className="home">
                <header>
                    <img className="logo" src={logoWhite} alt="Jingle Jam 2019 Logo" />
                    <h1>Stream Schedule <span></span> 1<sup>st</sup> week</h1>
                </header>
            </div>
        );
    }
}

export {Home};