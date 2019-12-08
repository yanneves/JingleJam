import React, { Component } from "react"
import { FaTwitter, FaYoutube, FaTwitch } from "react-icons/fa"
import { FiChevronLeft } from "react-icons/fi"

import "./creator.scss"

class CreatorThumbnail extends Component {
  constructor() {
    super()
    this.state = {
      creator: null,
      id: null,
    }
  }

  componentDidMount() {
    this.setState({
      creator: this.props.creator,
      id: this.props.creatorId,
    })
  }

  render() {
    return this.state.creator === null ? (
      <div className="yog" />
    ) : (
      <div
        className="yog"
        onClick={() => this.props.openProfile(this.state.id)}
      >
        <img
          src={this.state.creator.profilePicture}
          alt={`${this.state.creator.displayName}'s profile`}
        />
        <div className="tooltip">{this.state.creator.displayName}</div>
      </div>
    )
  }
}

class CreatorProfile extends Component {
  render() {
    return <h1>d</h1>
  }
}

class CreatorDetails extends Component {
  constructor() {
    super()
    this.state = {
      creator: null,
      id: null,
    }
    this.closeProfile = this.closeProfile.bind(this)
  }

  componentDidMount() {
    this.setState({
      creator: this.props.creator,
      id: this.props.creatorId,
    })
  }

  closeProfile() {
    this.props.closeProfile()
  }

  render() {
    return this.state.creator === null ? null : (
      <div className="creatorDetails">
        <img
          src={this.state.creator.profilePicture}
          alt={`${this.state.creator.displayName}'s profile`}
        />
        <h1>{this.state.creator.displayName}</h1>
        <ul>
          {this.state.creator.socialMedia.twitter !== undefined ? (
            <a
              href={this.state.creator.socialMedia.twitter}
              target="_blank"
              rel="noreferrer noopener"
            >
              <li className="twitter">
                Follow {this.state.creator.displayName} on <FaTwitter />
              </li>
            </a>
          ) : null}
          {this.state.creator.socialMedia.youtube !== undefined ? (
            <a
              href={this.state.creator.socialMedia.youtube}
              target="_blank"
              rel="noreferrer noopener"
            >
              <li className="youtube">
                Subscribe to {this.state.creator.displayName} on <FaYoutube />
              </li>
            </a>
          ) : null}
          {this.state.creator.socialMedia.twitch !== undefined ? (
            <a
              href={this.state.creator.socialMedia.twitch}
              target="_blank"
              rel="noreferrer noopener"
            >
              <li className="twitch">
                Follow {this.state.creator.displayName} on <FaTwitch />
              </li>
            </a>
          ) : null}
        </ul>
        <div className="back" onClick={this.closeProfile}>
          <FiChevronLeft /> Back to stream
        </div>
      </div>
    )
  }
}

export { CreatorDetails, CreatorProfile, CreatorThumbnail }
