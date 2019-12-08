import React, { Component } from "react"
import { Router, Route, Switch } from "react-router"
import { createBrowserHistory, createMemoryHistory } from "history"

import Logo from "./logo"
import { Home, ExpandedStream } from "./Schedule"
import { CreatorProfile } from "./DetailStreamer/StreamerDetails"

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      loadingHidden: false,
      watched: [],
    }

    this.toggleLoading = this.toggleLoading.bind(this)
    this.addWatched = this.addWatched.bind(this)
    this.removeWatched = this.removeWatched.bind(this)
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      // Check we're loaded in the browser, otherwise we may be in server-side rendering and want it to do its thing

      let loadedState = {}
      let watched = []

      if (localStorage.getItem("cache")) {
        loadedState = {
          loading: false,
          loadingHidden: true,
        }
      }

      if (localStorage.getItem("watched")) {
        watched = localStorage.getItem("watched").split(",")
      } else {
        localStorage.setItem("watched", watched.toString())
      }

      this.setState({ ...loadedState, watched })
    }
  }

  addWatched(id) {
    if (id !== null && id !== undefined && id !== "") {
      const { watched } = this.state
      if (watched.indexOf(id) === -1) {
        watched.push(id)
        localStorage.setItem("watched", watched.toString())
        this.setState({ watched })
      }
    }
  }

  removeWatched(id) {
    if (id !== null && id !== undefined && id !== "") {
      const { watched } = this.state
      if (watched.indexOf(id) !== -1) {
        watched.splice(watched.indexOf(id), 1)
        localStorage.setItem("watched", watched.toString())
        this.setState({ watched })
      }
    }
  }

  toggleLoading() {
    const { loading } = this.state

    if (loading) {
      this.setState(
        {
          loadingHidden: true,
        },
        () => {
          setTimeout(() => {
            this.setState({
              loading: !loading,
            })
          }, 200)
        }
      )
    } else {
      this.setState(
        {
          loadingHidden: true,
        },
        () => {
          this.setState(
            {
              loading: !loading,
            },
            () => {
              setTimeout(() => {
                this.setState({
                  loadingHidden: false,
                })
              }, 200)
            }
          )
        }
      )
    }
  }

  render() {
    return (
      <Router
        history={
          // Support server-side rendering
          typeof window !== "undefined"
            ? createBrowserHistory()
            : createMemoryHistory()
        }
      >
        <Home toggleLoading={this.toggleLoading} />
        <Switch>
          <Route
            path="/stream/:streamid"
            exact
            render={props => (
              <ExpandedStream
                {...props}
                watched={this.state.watched}
                addWatched={this.addWatched}
                removeWatched={this.removeWatched}
              />
            )}
          />
          <Route
            path="/creator/:creatorid"
            exact
            render={props => <CreatorProfile {...props} />}
          />
        </Switch>
        {this.state.loading ? (
          <div
            className={
              this.state.loadingHidden
                ? "modal loading hidden"
                : "modal loading"
            }
          >
            <div className="modalBackdrop loading" />
            <div className="modalContent loading">
              <Logo type="pink" className="pinkLogo" />
            </div>
          </div>
        ) : null}
      </Router>
    )
  }
}
