import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description:
      "A simple example of linking to another page within a Gatsby site"
  },
  { text: "TypeScript", url: "using-typescript" }
]

const IndexPage = ({ data }) => (
  <Layout>
    <div className={styles.textCenter}>
      <StaticImage
        src="../images/jeff-tian.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      />
      <h1>
        《<b><a href="/MachineLearningTomMitchell.pdf" target="_blank" rel="noopener noreferer">机器学习</a></b>》课后作业
      </h1>
      <h2></h2>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>
            <Link to={`${node.fields.slug}`}>
              {node.fields.slug}
            </Link>
          </h3>
          <p>{node.excerpt}</p>
        </div>
      ))}
      <p className={styles.intro}>
        <b>Example pages:</b>{" "}
        {samplePageLinks.map((link, i) => (
          <React.Fragment key={link.url}>
            <Link to={link.url}>{link.text}</Link>
            {i !== samplePageLinks.length - 1 && <> · </>}
          </React.Fragment>
        ))}
        <br />
        Edit <code>src/pages/index.js</code> to update this page.
      </p>
    </div>
  </Layout>
)

export const query = graphql`
    query {
        allMarkdownRemark {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    wordCount {
                        paragraphs
                        sentences
                        words
                    }
                    frontmatter {
                        title
                    }
                    excerpt
                    children {
                        id
                    }
                    html
                }
            }
        }
    }
`
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
