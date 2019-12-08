import React from "react"

export default () => {
  const { yog } = this.props
  const { onSelectYog } = this.props

  return (
    <div onClick={() => onSelectYog(yog)}>
      <img
        className="creatorThumbnail"
        src={yog.profilePicture}
        alt={`${yog} profile`}
      />
    </div>
  )
}
