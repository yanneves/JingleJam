import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Logo = ({ type, className, alt }) => {
  const logo = useStaticQuery(graphql`
    query {
      white: file(relativePath: { eq: "logo_white.png" }) {
        childImageSharp {
          fluid(maxWidth: 800, maxHeight: 275) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      pink: file(relativePath: { eq: "logo_pink.png" }) {
        childImageSharp {
          fluid(maxWidth: 800, maxHeight: 275) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <Img
      fluid={logo[type].childImageSharp.fluid}
      className={className}
      alt={alt}
    />
  )
}

Logo.defaultProps = {
  type: "white",
  className: "",
  alt: "Jingle Jam 2019 Logo",
}

Logo.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
}

export default Logo
