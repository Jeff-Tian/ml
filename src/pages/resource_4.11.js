import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {graphql} from "gatsby";

export const Head = () => <Seo title="《机器学习》第 4 章 4.11 题目资源"/>


export const Tree = ({data}) => {
    // 将查询出来的文件，以目录浏览的方式展示：
    // 1. 先将文件按目录分组
    // 2. 再将每个目录下的文件按名称排序
    // 3. 最后将每个目录下的文件按名称排序
    const files = data.allFile.nodes;
    const groupedFiles = files.reduce((acc, file) => {
        const dir = file.relativePath.split("/")[0];
        if (!acc[dir]) {
            acc[dir] = [];
        }
        acc[dir].push(file);
        return acc;
    }, {});

    const sortedGroupedFiles = Object.keys(groupedFiles).sort().reduce((acc, key) => {
        acc[key] = groupedFiles[key].sort((a, b) => a.name.localeCompare(b.name));
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(sortedGroupedFiles).map((dir) => (
                <div key={dir}>
                    <h2>{dir}</h2>
                    <ul>
                        {sortedGroupedFiles[dir].map((file) => (
                            <li key={file.id}>
                                <a href={file.publicURL} target="_blank" rel="noopener noreferrer">
                                    {file.childMarkdownRemark?.frontmatter?.title || file.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}


const FourOneOne = ({data}) => {
    return (
        <Layout>
            <h1>《机器学习》第 4 章 4.11 题目资源</h1>
            <Tree data={data}/>
        </Layout>);
}

export default FourOneOne;


export const query = graphql`
    query TargetFiles {
        allFile(
            filter: {
                relativeDirectory: { glob: "第四章 人工神经网络/**/*" }
                extension: { nin: ["DS_Store", "tmp"] }
            }
        ) {
            nodes {
                id
                name
                relativePath
                publicURL

                childMarkdownRemark {
                    frontmatter {
                        title
                    }
                }
            }
        }
    }`
