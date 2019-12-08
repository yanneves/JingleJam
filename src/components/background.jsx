import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
  const bg = useStaticQuery(graphql`
    query {
      graphic: file(relativePath: { eq: "background.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920, maxHeight: 1080, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Img
      fluid={bg.graphic.childImageSharp.fluid}
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  )
}
