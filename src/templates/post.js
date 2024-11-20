import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { DangrousElement } from "../components/dangerous-element"
import katex from 'katex';
require(`katex/dist/katex.min.css`)

const Post = ({ data }) => {
    const post = data.markdownRemark

    return (
        <Layout>
            <div>
                <DangrousElement markup={post.html} katex={katex} />
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