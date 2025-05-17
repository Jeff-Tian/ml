import {render} from '@testing-library/react';
import {groupFiles, NestedTree, Tree} from "../../src/pages/resource_4.11";

describe('tests for resource 4.11', () => {
    describe('groupedFiles', () => {
        it('groups empty files', () => {
            // arrange
            const files = []

            // act
            const groupedFiles = groupFiles(files);

            // assert
            expect(groupedFiles).toBeDefined();
            expect(groupedFiles).toStrictEqual({});
        })

        it('groups one file', () => {
            // arrange
            const files = [
                {
                    name: 'test.txt',
                    relativePath: 'test.txt',
                    publicURL: '/test.txt',
                },
            ]

            // act
            const groupedFiles = groupFiles(files);

            // assert
            expect(groupedFiles).toBeDefined();
            expect(groupedFiles).toStrictEqual({
                'test.txt':
                    {
                        name: 'test.txt',
                        relativePath: 'test.txt',
                        publicURL: '/test.txt',
                    },
            });
        })

        it('groups one folder', () => {
            // arrange
            const files = [{
                name: 'test.txt',
                relativePath: 'test.txt',
                publicURL: '/test.txt',
            }, {
                name: 'test1.txt',
                relativePath: 'dir1/test1.txt',
                publicURL: '/dir1/test1.txt',
            }]

            // act
            const groupedFiles = groupFiles(files);

            // assert
            expect(groupedFiles).toBeDefined();
            expect(groupedFiles).toStrictEqual({
                'test.txt':
                    {
                        name: 'test.txt',
                        relativePath: 'test.txt',
                        publicURL: '/test.txt',
                    },
                'dir1': {
                    'dir1/test1.txt': {
                        name: 'test1.txt',
                        relativePath: 'dir1/test1.txt',
                        publicURL: '/dir1/test1.txt',
                    },
                },
            })
        })

        it('groups nested folders', () => {
            // arrange
            const files = [
                {
                    name: 'test.txt',
                    relativePath: 'test.txt',
                    publicURL: '/test.txt',
                },
                {
                    name: 'test.txt',
                    relativePath: 'dir1/test.txt',
                    publicURL: '/dir1/test.txt',
                },
                {
                    name: 'test2.txt',
                    relativePath: 'dir1/test2/test2.txt',
                    publicURL: '/dir1/test2/test2.txt',
                }
            ]

            // act
            const groupedFiles = groupFiles(files);

            // assert
            expect(groupedFiles).toBeDefined();
            expect(groupedFiles).toStrictEqual({
                'test.txt': {
                    name: 'test.txt',
                    relativePath: 'test.txt',
                    publicURL: '/test.txt',
                },
                'dir1': {
                    'dir1/test.txt': {
                        name: 'test.txt',
                        relativePath: 'dir1/test.txt',
                        publicURL: '/dir1/test.txt',
                    },
                    'test2': {
                        'dir1/test2/test2.txt': {
                            name: 'test2.txt',
                            relativePath: 'dir1/test2/test2.txt',
                            publicURL: '/dir1/test2/test2.txt',
                        }
                    }
                }
            })
        })
    })

    describe('nestedTree', () => {
        it('displays empty groupedFiles', async () => {
            // arrange
            const files = {}

            // act
            const result = await NestedTree({groupedFiles: files, level: 1});

            // assert
            expect(result).toBeDefined();

            const ul = result;
            expect(ul.props.children.length).toBe(0);
        })
    })

    describe('tree', () => {
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
            expect(container).toMatchSnapshot();
        })
    })
});
