import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { DangrousElement } from "../components/dangerous-element"

const Post = ({ data }) => {
    const post = data.markdownRemark

    return (
        <Layout>
            <div>
                <DangrousElement markup={post.html} />
            </div>
        </Layout>
    )
}

export default Post

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`