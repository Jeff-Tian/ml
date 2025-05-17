import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {graphql} from "gatsby"

export const Head = () => <Seo title="《机器学习》第 4 章 4.11 题目资源"/>


export const NestedTree = ({groupedFiles, level}) => {
    return <>
        {Object.keys(groupedFiles).map((key) => {
            const file = groupedFiles[key]
            if (file.relativePath) {
                return <dd key={file.relativePath} style={{paddingLeft: 20 * (level + 1) + 'px'}}>
                    <a href={file.publicURL} target="_blank" rel="noopener noreferrer">{file.name}</a>
                    <br/>
                    <a href={file.publicURL} target="_blank" rel="noopener noreferrer">{file.relativePath}</a>
                </dd>
            }

            return <details style={{paddingLeft: 20 * level + 'px'}} key={'detail-' + key}>
                <summary>目录：{key}</summary>
                <NestedTree groupedFiles={file} level={level + 1}/>
            </details>
        })}
    </>
};

export const Tree = ({data, level = 1}) => {
    const files = data.allFile.nodes
    const groupedFiles = groupFiles(files)

    return <NestedTree groupedFiles={groupedFiles} level={level}/>
}

function groupFileIntoResult(result, file, level = 1) {
    const parts = file.relativePath.split('/');

    if (parts.length === level) {
        result[file.relativePath] = file;

        return;
    }

    if (!result[parts[level - 1]]) {
        result[parts[level - 1]] = {}
    }

    groupFileIntoResult(result[parts[level - 1]], file, level + 1);
}

export const groupFiles = (files, level = 1) => {
    const result = {};

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        groupFileIntoResult(result, file);
    }

    return result;
}

const FourOneOne = ({
                        data
                    }) => {
    return (
        <Layout>
            <h1>《机器学习》第 4 章 4.11 题目资源</h1>
            <Tree data={data} level={1}/>
        </Layout>)
}

export default FourOneOne


export const query = graphql`
    query TargetFiles {
        allFile(
            filter
            :
            {
                relativeDirectory: {
                    glob: "第四章 人工神经网络/**/*"
                }
                extension: {
                    nin: ["DS_Store", "tmp"]
                }
            }
        )
        {
            nodes
            {
                id
                name
                relativePath
                publicURL

                childMarkdownRemark
                {
                    frontmatter
                    {
                        title
                    }
                }
            }
        }
    }`
