import {render} from '@testing-library/react';
import {Tree} from "../../src/pages/resource_4.11";

describe('tests for resource 4.11', () => {
    describe('tree', () => {
        it('should return empty when no files', async () => {
            // arrange
            const data = {
                allFile: {
                    nodes: [],
                },
            };

            // act
            const result = await Tree({data});

            // assert
            expect(result).toBeDefined();
            expect(result.props.children).toBeDefined();
            expect(result.props.children).toStrictEqual([]);
        });

        it('should return one file when one file', async () => {
            // arrange
            const data = {
                allFile: {
                    nodes: [
                        {
                            id: '1',
                            name: 'file1',
                            relativePath: 'dir1/file1.md',
                            publicURL: '/dir1/file1.md',
                            childMarkdownRemark: {
                                frontmatter: {
                                    title: 'File 1',
                                },
                            },
                        },
                    ],
                },
            };

            // act
            const result = await Tree({data});
            const {container} = render(result);

            // assert
            expect(result).toBeDefined();
            expect(result.props.children).toBeDefined();
            expect(result.props.children.length).toBe(1);
            expect(container).toMatchSnapshot();
        })
    })
});
