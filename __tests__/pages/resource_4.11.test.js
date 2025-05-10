import {render} from '@testing-library/react';
import {Tree} from "../../src/pages/resource_4.11";
import {expect} from "playwright/test";

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

        it('should return 2 elements when 2 files', async () => {
            // arrange
            const data = {
                allFile: {
                    nodes: [
                        {
                            name: 'test.txt',
                            relativePath: 'test.txt',
                            publicURL: '/test.txt',
                        },
                        {
                            name: 'test2.txt',
                            relativePath: 'test2.txt',
                            publicURL: '/test2.txt',
                        },
                    ],
                },
            };

            // act
            const result = await Tree({data});

            // assert
            expect(result).toBeDefined();
            expect(result.props.children).toBeDefined();
            expect(result.props.children).toHaveLength(2);
            expect(result.props.children[0].props.children).toBeDefined();

            const fileDiv = result.props.children[0];
            expect(fileDiv.type).toBe('div')

            const h2 = fileDiv.props.children[0];
            expect(h2.type).toBe('h2');

            const ul = fileDiv.props.children[1];
            expect(ul.type).toBe('ul');

            const li1 = ul.props.children[0];
            expect(li1.type).toBe('li');

            const a1 = li1.props.children;
            expect(a1.type).toBe('a');
            expect(a1.props.href).toBe('/test.txt');
            expect(a1.props.children).toBe('test.txt');
            expect(a1.props.target).toBe('_blank');
            expect(a1.props.rel).toBe('noopener noreferrer');

            const fileDiv2 = result.props.children[1];
            expect(fileDiv2.type).toBe('div')

            const h22 = fileDiv2.props.children[0];
            expect(h22.type).toBe('h2');

            const ul2 = fileDiv2.props.children[1];
            expect(ul2.type).toBe('ul');
            expect(ul2.props.children).toHaveLength(1);

            const li2 = ul2.props.children[0];
            expect(li2.type).toBe('li');
            const a2 = li2.props.children;
            expect(a2.type).toBe('a');
            expect(a2.props.href).toBe('/test2.txt');
            expect(a2.props.children).toBe('test2.txt');
            expect(a2.props.target).toBe('_blank');
            expect(a2.props.rel).toBe('noopener noreferrer');
        })

        it('should return 1 element when 1 file in 2 directories', async () => {
            // arrange
            const data = {
                allFile: {
                    nodes: [
                        {
                            name: 'test.txt',
                            relativePath: 'dir1/test.txt',
                            publicURL: '/dir1/test.txt',
                        },
                        {
                            name: 'test2.txt',
                            relativePath: 'dir2/test2.txt',
                            publicURL: '/dir2/test2.txt',
                        },
                    ],
                },
            };

            // act
            const result = await Tree({data});

            // assert
            expect(result).toBeDefined();
            expect(result.props.children).toBeDefined();
            expect(result.props.children).toHaveLength(2);
            expect(result.props.children[0].props.children).toBeDefined();
            const fileDiv = result.props.children[0];
            expect(fileDiv.type).toBe('div')
            const h2 = fileDiv.props.children[0];
            expect(h2.type).toBe('h2');
            expect(h2.props.children).toBe('dir1');
            const ul = fileDiv.props.children[1];
            expect(ul.type).toBe('ul');
            expect(ul.props.children).toHaveLength(1);
            const li = ul.props.children[0];
            expect(li.type).toBe('li');
            const a = li.props.children;
            expect(a.type).toBe('a');
            expect(a.props.href).toBe('/dir1/test.txt');
            expect(a.props.children).toBe('test.txt');
            expect(a.props.target).toBe('_blank');
            expect(a.props.rel).toBe('noopener noreferrer');
            const fileDiv2 = result.props.children[1];
            expect(fileDiv2.type).toBe('div')
            const h22 = fileDiv2.props.children[0];
            expect(h22.type).toBe('h2');
            expect(h22.props.children).toBe('dir2');
            const ul2 = fileDiv2.props.children[1];
            expect(ul2.type).toBe('ul');
            expect(ul2.props.children).toHaveLength(1);
            const li2 = ul2.props.children[0];
            expect(li2.type).toBe('li');
            const a2 = li2.props.children;
            expect(a2.type).toBe('a');
            expect(a2.props.href).toBe('/dir2/test2.txt');
            expect(a2.props.children).toBe('test2.txt');
            expect(a2.props.target).toBe('_blank');
            expect(a2.props.rel).toBe('noopener noreferrer');
        })
    })
});
