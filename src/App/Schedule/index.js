import React, {Component} from 'react';

import './schedule.scss';
import logoWhite from './logo_white.png';
import streams from './data/streams.json';
// import creators from './data/creators.json';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            week: null,
            streams: null
        }
    }
    componentDidMount(){
        const today = new Date();
        var week;
        if (today.getUTCMonth() !== 11){
            week = 1;
        } else {
            if (today.getUTCDate() < 8){
                week = 1;
            } else if (today.getUTCDate() < 15){
                week = 2;
            } else if (today.getUTCDate() < 22){
                week = 3;
            } else if (today.getUTCDate() < 29){
                week = 4;
            } else {
                week = 5;
            }
        }

        this.setState({
            week,
            streams: streams.weeks[week - 1]
        });

        setTimeout(() => {
            this.props.toggleLoading();
        }, 1000);
    }
    prevWeek(){
        var currentWeek = this.state.week;
        this.setState({week: currentWeek - 1});
    }
    nextWeek(){
        var currentWeek = this.state.week;
        this.setState({week: currentWeek + 1});
    }
    render(){
        return(
            <div className="home">
                <header>
                    <img className="logo" src={logoWhite} alt="Jingle Jam 2019 Logo" />
                    <h1>Stream Schedule <span></span> 1<sup>st</sup> week</h1>
                </header>
                <Schedule streams={this.state.streams} week={this.state.week} />
                <div className="controls">
                    {this.state.week === 1 ? null : <article className="prev" onClick={this.prevWeek}><FiChevronLeft /></article>}
                    {this.state.week === 5 ? null : <article className="next" onClick={this.nextWeek}><FiChevronRight /></article>}
                </div>
            </div>
        );
    }
}

class Schedule extends Component {
    constructor(){
        super();
        this.state = {
            streams: null,
            times: null,
            days: null,
            timezone: 0
        };
        this.initTimes = this.initTimes.bind(this);
        this.initDays = this.initDays.bind(this);
    }
    componentDidMount(){
        this.initTimes();
        this.initDays();
    }
    componentDidUpdate(nextProps){
        if (nextProps.streams !== this.state.streams){
            this.setState({streams: nextProps.streams});
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        return nextProps;
    }
    initTimes(){
        var times = [
            {
                name: "morning",
                start: 11,
                finish: 14
            },
            {
                name: "afternoon",
                start: 14,
                finish: 17
            },
            {
                name: "evening",
                start: 17,
                finish: 20
            },
            {
                name: "late",
                start: 20,
                finish: 23
            }
        ];
        // timezones
        this.setState({times});
    }
    initDays(){
        var days = [1,2,3,4,5,6,7];
        this.setState({days});
    }
    render(){
        return(
            <section className="schedule">
                {
                    this.state.times !== null ?
                    this.state.times.map((time, i) => {
                        return (
                        <article className={`time _${time.start}`} key={i}>
                            <h3>{time.start + ":00"}</h3>
                            <h1>{time.name}</h1>
                            <h4>{time.finish + ":00"}</h4>
                        </article>)
                    }) : null
                }

                {
                    this.state.days !== null ?
                    this.state.days.map((date, i) => {
                        return(
                            <article className={`day _${date%7}`} key={i}>
                                {["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date(`December ${date}, 2019`).getDay()]}
                                {" " + new Date(`December ${date}, 2019`).getDate()}
                                <sub>
                                    {
                                        new Date(`December ${date}, 2019`).getDate() === (1 || 21 || 31) ? "st"
                                        : new Date(`December ${date}, 2019`).getDate() === (2 || 22) ? "nd"
                                        : new Date(`December ${date}, 2019`).getDate() === (3 || 23) ? "rd" : "th"
                                    }
                                </sub>
                            </article>
                        )
                    }) : null
                }

                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days[0].streams.map((stream, i) => {
                        return (<Stream key={i} date={this.state.streams.days[0].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null
                }
                
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days[1].streams.map((stream, i) => {
                        return (<Stream key={i} date={this.state.streams.days[1].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null
                }

                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days[2].streams.map((stream, i) => {
                        return (<Stream key={i} date={this.state.streams.days[2].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null
                }
                
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days[3].streams.map((stream, i) => {
                        return (<Stream key={i} date={this.state.streams.days[3].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null
                }
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days[4].streams.map((stream, i) => {
                        return (<Stream key={i} date={this.state.streams.days[4].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null
                }
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days[5].streams.map((stream, i) => {
                        return (<Stream key={i} date={this.state.streams.days[5].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null
                }
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days[6].streams.map((stream, i) => {
                        return (<Stream key={i} date={this.state.streams.days[6].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null
                }
            </section>
        )
    }
}

class Stream extends Component {
    render(){
        return(
            <article className={`stream _${this.props.startHour} _${this.props.date%7} duration_${this.props.duration} ${this.props.style}`}>
                {this.props.pretitle !== undefined ? <h3>{this.props.pretitle}</h3> : null}
                <h1>{this.props.title}</h1>
                <h4>{this.props.subtitle}</h4>
                {this.props.subtitle2 !== undefined ? <h4>{this.props.subtitle2}</h4> : null}
            </article>
        )
    }
}

export {Home};