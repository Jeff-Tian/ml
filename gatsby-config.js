/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `Tom M. Mitchell 著《机器学习》之作业练习`,
        description: `自学《机器学习》之作业练习`,
        author: `@zizhujy`,
        siteUrl: `https://ml.jiwai.win/`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/src/posts`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800,
                            linkImagesToOriginal: true,
                            showCaptions: [`title`],
                            wrapperStyle: `margin: 0 auto;`,
                        }
                    },
                    {
                        resolve: `gatsby-remark-katex`,
                        options: {
                            // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
                            strict: `ignore`,
                            macros: {
                                "\\title": "\\textbf{\\Large #1}",
                            }
                        }
                    },
                    {
                        resolve: `gatsby-remark-mermaid`,
                        options: /** @type {import('gatsby-remark-mermaid').Options} */ ({
                            mermaidConfig: {
                                theme: 'neutral',
                                themeCSS: '.node rect { fill: #fff; }'
                            },
                        })
                    }
                ],
            }
        },
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                // This will impact how browsers show your PWA/website
                // https://css-tricks.com/meta-theme-color-and-trickery/
                // theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-static-folders`,
            options: {
                folders: [
                    `./src`,
                ]
            }
        }
    ],
}
