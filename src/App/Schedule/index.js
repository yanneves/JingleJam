import React, {Component} from 'react';
import {withRouter} from 'react-router';

import './schedule.scss';
import logoWhite from './logo_white.png';
import streams from './data/streams.json';
import creators from './data/creators.json';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {FaTwitch, FaYoutube} from 'react-icons/fa';

class Home extends Component {
    constructor(){
        super();

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
                week = 4
            } else {
                week = 5;
            }
        }

        this.state = {
            week,
            streams: streams.weeks[week - 1]
        }

        this.prevWeek = this.prevWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
    }
    componentDidMount(){
        if (!localStorage.getItem("cache")){
            setTimeout(() => {
                this.props.toggleLoading();
            }, 2000);
            localStorage.setItem("cache", true);
        }
    }
    prevWeek(){
        var currentWeek = this.state.week;
        this.setState({
            week: currentWeek - 1,
            streams: streams.weeks[currentWeek - 2]
        });
    }
    nextWeek(){
        var currentWeek = this.state.week;
        this.setState({
            week: currentWeek + 1,
            streams: streams.weeks[currentWeek]
        });
    }
    render(){
        return(
            <div className="home">
                <header>
                    <img className="logo" src={logoWhite} alt="Jingle Jam 2019 Logo" />
                    <h1>Stream Schedule <span></span> {this.state.streams.meta.week}<sup>{this.state.streams.meta.week === 1 ? "st" : this.state.streams.meta.week === 2 ? "nd" : this.state.streams.meta.week === 3 ? "rd" : "th"}</sup> week</h1>
                </header>
                <Schedule streams={this.state.streams} week={this.state.week} />
                <div className="controls">
                    {this.state.week === 1 ? null : streams.weeks[this.state.week - 2].meta.active ? <article className="prev" onClick={this.prevWeek}><FiChevronLeft /></article> : null}
                    {this.state.week === 5 ? null : streams.weeks[this.state.week].meta.active ? <article className="next" onClick={this.nextWeek}><FiChevronRight /></article> : null}
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
            tz: null,
            live: false,
            livePosition: 0
        };
        this.initTimes = this.initTimes.bind(this);
        this.initDays = this.initDays.bind(this);
        this.initTimezone = this.initTimezone.bind(this);
        this.initLiveTime = this.initLiveTime.bind(this);
    }
    componentDidMount(){
        this.initTimezone();
        this.initTimes();
        this.initDays();
        this.initLiveTime();

        setInterval(() => {
            this.initLiveTime();
        }, 60000);
    }
    componentDidUpdate(nextProps){
        if (nextProps.streams !== this.state.streams){
            this.setState({streams: nextProps.streams});
        }

        if (nextProps.week !== this.state.week){
            this.setState({week: nextProps.week});
            this.initDays();
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        return nextProps;
    }
    initTimes(){
        var times = [
            {
                start: 11,
                startOffset: 11,
                finish: 14,
                finishOffset: 14
            },
            {
                start: 14,
                startOffset: 14,
                finish: 17,
                finishOffset: 17
            },
            {
                start: 17,
                startOffset: 17,
                finish: 20,
                finishOffset: 20
            },
            {
                start: 20,
                startOffset: 20,
                finish: 23,
                finishOffset: 23
            }
        ];

        const date = new Date();
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        date.setUTCMilliseconds(0);

        date.setUTCHours(11);
        times[0].startOffset = date.getHours();
        if (date.getHours() < 12){
            times[0].name = "morning";
        } else if (date.getHours() < 17){
            times[0].name = "afternoon";
        } else if (date.getHours() < 20){
            times[0].name = "evening";
        } else {
            times[0].name = "late";
        }

        date.setUTCHours(14);
        times[0].finishOffset = date.getHours();
        times[1].startOffset = date.getHours();
        if (date.getHours() < 12){
            times[1].name = "morning";
        } else if (date.getHours() < 17){
            times[1].name = "afternoon";
        } else if (date.getHours() < 20){
            times[1].name = "evening";
        } else {
            times[1].name = "late";
        }

        date.setUTCHours(17);
        times[1].finishOffset = date.getHours();
        times[2].startOffset = date.getHours();
        if (date.getHours() < 12){
            times[2].name = "morning";
        } else if (date.getHours() < 17){
            times[2].name = "afternoon";
        } else if (date.getHours() < 20){
            times[2].name = "evening";
        } else {
            times[2].name = "late";
        }

        date.setUTCHours(20);
        times[2].finishOffset = date.getHours();
        times[3].startOffset = date.getHours();
        if (date.getHours() < 12){
            times[3].name = "morning";
        } else if (date.getHours() < 17){
            times[3].name = "afternoon";
        } else if (date.getHours() < 20){
            times[3].name = "evening";
        } else {
            times[3].name = "late";
        }

        date.setUTCHours(23);
        times[3].finishOffset = date.getHours();

        this.setState({times});
    }
    initDays(){
        const week = this.state.week - 1;
        var days = [1+7*week, 2+7*week, 3+7*week, 4+7*week, 5+7*week, 6+7*week, 7+7*week];
        this.setState({days});
    }
    initTimezone(){
        const date = new Date();
        const hourDiff = date.getTimezoneOffset() / -60;
        var tz;
        if (hourDiff === 0){
            tz = "GMT";
        } else if (hourDiff < 0){
            tz = "GMT"+hourDiff;
        } else {
            tz = "GMT+"+hourDiff;
        }

        this.setState({tz});
    }
    initLiveTime(){
        const date = new Date();
        var live = true;
        var livePosition = "65px";

        if (date.getUTCHours() < 11 || date.getUTCHours() > 22){
            live = false;
        }

        if (date.getUTCHours() < 14){
            livePosition = "calc(55px + 10px + (((((100% - 55px) / 4) - 10px) / 180) * "+ (((date.getUTCHours() - 11) * 60) + date.getUTCMinutes()) +"))";
        } else if (date.getUTCHours() < 17){
            livePosition = "calc(55px + 10px + ((((100% - 55px) / 4) - 10px) * 1) (((((100% - 55px) / 4) - 10px) / 180) * "+ (((date.getUTCHours() - 11) * 60) + date.getUTCMinutes()) +"))";
        } else if (date.getUTCHours() < 20){
            livePosition = "calc(55px + 10px + ((((100% - 55px) / 4) - 10px) * 2) (((((100% - 55px) / 4) - 10px) / 180) * "+ (((date.getUTCHours() - 11) * 60) + date.getUTCMinutes()) +"))";
        } else if (date.getUTCHours() < 23){
            livePosition = "calc(55px + 10px + ((((100% - 55px) / 4) - 10px) * 3) (((((100% - 55px) / 4) - 10px) / 180) * "+ (((date.getUTCHours() - 11) * 60) + date.getUTCMinutes()) +"))";
        }

        this.setState({live, livePosition});
    }
    render(){
        return(
            <section className="schedule">
                {/* <div className={`liveTime ${this.state.live ? "active" : null}`} style={{top: this.state.livePosition}}></div> */}
                <article className="time day">{this.state.tz}</article>
                {
                    this.state.times !== null ?
                    this.state.times.map((time, i) => {
                        return (
                        <article className={`time _${time.start}`} key={i}>
                            <h3>{time.startOffset < 10 ? "0" + time.startOffset + ":00" : time.startOffset + ":00"}</h3>
                            <h1>{time.name}</h1>
                            <h4>{time.finishOffset < 10 ? "0" + time.finishOffset + ":00" : time.finishOffset + ":00"}</h4>
                        </article>)
                    }) : null
                }

                {
                    this.state.days !== null ?
                    this.state.days.map((date, i) => {
                        return(
                            <article className={`day _${date%7}`} key={i}>
                                {["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date(Date.UTC(2019, 11, date, 11, 0, 0, 0)).getDay()]}
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
                    this.state.streams.days.length > 0 ?
                    this.state.streams.days[0].streams.map((stream, i) => {
                        return (<StreamRouter key={i} week={this.state.week} date={this.state.streams.days[0].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    }) : null : null : null
                }
                
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days.length > 1 ?
                    this.state.streams.days[1].streams.map((stream, i) => {
                        return (<StreamRouter key={i} week={this.state.week} date={this.state.streams.days[1].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null : null
                }

                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days.length > 2 ?
                    this.state.streams.days[2].streams.map((stream, i) => {
                        return (<StreamRouter key={i} week={this.state.week} date={this.state.streams.days[2].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null : null
                }
                
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days.length > 3 ?
                    this.state.streams.days[3].streams.map((stream, i) => {
                        return (<StreamRouter key={i} week={this.state.week} date={this.state.streams.days[3].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null : null
                }
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days.length > 4 ?
                    this.state.streams.days[4].streams.map((stream, i) => {
                        return (<StreamRouter key={i} week={this.state.week} date={this.state.streams.days[4].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null : null
                }
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days.length > 5 ?
                    this.state.streams.days[5].streams.map((stream, i) => {
                        return (<StreamRouter key={i} week={this.state.week} date={this.state.streams.days[5].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null : null
                }
                {
                    this.state.streams !== null ?
                    this.state.streams.meta.active ?
                    this.state.streams.days.length > 6 ?
                    this.state.streams.days[6].streams.map((stream, i) => {
                        return (<StreamRouter key={i} week={this.state.week} date={this.state.streams.days[6].date} pretitle={stream.pretitle} title={stream.title} subtitle={stream.subtitle} subtitle2={stream.subtitle2} startHour={stream.startHour} starring={stream.starring} duration={stream.duration} style={stream.style} vods={stream.vods} />)
                    })
                    : null : null : null
                }
            </section>
        )
    }
}

class Stream extends Component {
    constructor(){
        super();
        this.expandStream = this.expandStream.bind(this);
    }
    expandStream(){
        this.props.history.push(`/stream/${this.props.week}.${this.props.date}.${this.props.startHour}`);
    }
    render(){
        return(
            <article onClick={this.expandStream} className={`stream _${this.props.startHour} _${this.props.date%7} duration_${this.props.duration} ${this.props.style}`}>
                {this.props.pretitle !== undefined ? <h3>{this.props.pretitle}</h3> : null}
                <h1>{this.props.title}</h1>
                <h4>{this.props.subtitle}</h4>
                {this.props.subtitle2 !== undefined ? <h5>{this.props.subtitle2}</h5> : null}
            </article>
        )
    }
}

const StreamRouter = withRouter(Stream);

class ExpandedStream extends Component {
    constructor(){
        super();
        this.state = {
            id: [],
            stream: {},
            state: null,
            countdown: null,
            vod: null
        }
        this.close = this.close.bind(this);
        this.updateState = this.updateState.bind(this);
        this.countdown = this.countdown.bind(this);
    }
    componentDidMount(){
        const id = this.props.match.params.streamid.split(".");
        const days = streams.weeks[parseInt(id[0]) - 1].days;
        const day = days.find(day => day.date === parseInt(id[1]));
        const stream = day.streams.find(s => s.startHour === parseInt(id[2]));

        var vod = "twitch"
        if (stream.vods.twitch === undefined && stream.vods.youtube === undefined){
            vod = null;
        } else if (stream.vods.twitch === undefined){
            vod = "youtube";
        }

        this.setState({id, stream, vod}, this.updateState);
    }
    updateState(){
        const now = new Date();
        const start = new Date(Date.UTC(2019, 11, this.state.id[1], this.state.stream.startHour, 0, 0, 0));
        const end = new Date(Date.UTC(2019, 11, this.state.id[1], this.state.stream.startHour + (3 * this.state.stream.duration), 0, 0, 0));

        var state;

        if (now > end){
            state = "ended";
        } else if (now > start){
            state = "live";
        } else if (now < start){
            state = "upcoming";
            this.countdown();
        }

        this.setState({state}, () => {
            setTimeout(() => {
                this.updateState();
            }, 1000);
        });
    }
    countdown(){
        const now = new Date();
        const start = new Date(Date.UTC(2019, 11, this.state.id[1], this.state.stream.startHour, 0, 0, 0));
        const diff = start - now;
        
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor(diff / (1000*60*60));
        const m = Math.floor(diff / (1000*60));
        const s = Math.floor(diff / 1000);

        const dd = d;
        const hh = h - (dd*24);
        const mm = m - (dd*24*60) - (hh*60);
        const ss = s - (dd*24*60*60) - (hh*60*60) - (mm*60);

        const days = dd < 10 ? "0"+dd : dd;
        const hours = hh < 10 ? "0"+hh : hh;
        const minutes = mm < 10 ? "0"+mm : mm;
        const seconds = ss < 10 ? "0"+ss : ss;

        const countdown = {
            days,
            hours,
            minutes,
            seconds
        };

        this.setState({countdown});
    }
    close(){
        this.props.history.push('/');
    }
    render(){
        return(
            <section className="expanded">
                <div className="bg" onClick={this.close}></div>
                <article className={`content ${this.state.stream.style}`}>
                    <div className="details">
                        {this.state.stream.title !== undefined ? <h1>{this.state.stream.title}</h1> : null}
                        {this.state.stream.pretitle !== undefined ? <h3>{this.state.stream.pretitle}</h3> : null}
                        {this.state.stream.subtitle !== undefined ? <h4>{this.state.stream.subtitle}</h4> : null}
                        {this.state.stream.subtitle2 !== undefined ? <h5>{this.state.stream.subtitle2}</h5> : null}
                        <div className="starring">
                            {
                                this.state.stream.starring === undefined ? null :
                                this.state.stream.starring.map((yog, i) => {
                                    return (
                                        <div className="yog" key={i}>
                                            {
                                                creators[yog] === undefined ? null :
                                                <img src={creators[yog].profilePicture} alt={`${yog} profile`} />
                                            }
                                            <div className="tooltip">{creators[yog] === undefined ? null : creators[yog].displayName}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="vods">
                        {
                            this.state.state === "upcoming" ? 
                                this.state.countdown === null ? null :
                                <div className="countdown">
                                    <h2>starts in</h2>
                                    <h1>
                                        <span data-tooltip="days">{this.state.countdown.days}</span>:
                                        <span data-tooltip="hours">{this.state.countdown.hours}</span>:
                                        <span data-tooltip="minutes">{this.state.countdown.minutes}</span>:
                                        <span data-tooltip="seconds">{this.state.countdown.seconds}</span>
                                    </h1>
                                </div>
                            : this.state.state === "live" ? 
                            <div className="live">
                                <iframe title="YOGSCAST Twitch Stream" src="https://player.twitch.tv/?channel=yogscast" frameBorder="0" allowFullScreen={true} scrolling="no" height="309" width="550"></iframe>
                                <h1>watch live!</h1>
                            </div>
                            : this.state.state === "ended" ?
                            this.state.stream.vods.twitch === undefined && this.state.stream.vods.youtube === undefined ?
                            <h1 className="novods">there are currently no vods available for this stream</h1>
                            :
                            <div className="allvods">
                                {
                                    this.state.vod === "twitch" ? 
                                    <iframe title={`${this.state.stream.title} Twitch VOD`} src={this.state.stream.vods.twitch} frameBorder="0" allowFullScreen={true} scrolling="no" height="309" width="550"></iframe>
                                    : this.state.vod === "youtube" ?
                                    <iframe title={`${this.state.stream.title} YouTube VOD`} src={this.state.stream.vods.youtube} frameBorder="0" allowFullScreen={true} width="550" height="309" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                    : null
                                }
                                {
                                    <ul>
                                        {this.state.stream.vods.twitch !== undefined ? <li className={`twitch ${this.state.vod === "twitch" ? "active" : null}`} onClick={() => this.setState({vod: "twitch"})}>Watch on <FaTwitch /></li> : null}
                                        {this.state.stream.vods.youtube !== undefined ? <li className={`youtube ${this.state.vod === "youtube" ? "active" : null}`} onClick={() => this.setState({vod: "youtube"})}>Watch on <FaYoutube /></li> : null}
                                    </ul>
                                }
                            </div> : null
                        }
                    </div>
                </article>
            </section>
        )
    }
}

export {Home, ExpandedStream};