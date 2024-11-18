import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Post = ({ data }) => {
    const post = data.markdownRemark

    return (
        <Layout>
            <div>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
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