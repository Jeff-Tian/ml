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

        it('should return 1 element when 1 file', async () => {
            // arrange
            const data = {
                allFile: {
                    nodes: [
                        {
                            name: 'test.txt',
                            relativePath: 'test.txt',
                            publicURL: '/test.txt',
                        },
                    ],
                },
            };

            // act
            const result = await Tree({data});

            // assert
            expect(result).toBeDefined();
            expect(result.props.children).toBeDefined();
            expect(result.props.children).toHaveLength(1);
            expect(result.props.children[0].props.children).toBeDefined();

            const fileDiv = result.props.children[0];
            expect(fileDiv.type).toBe('div')

            const h2 = fileDiv.props.children[0];
            expect(h2.type).toBe('h2');

            const ul = fileDiv.props.children[1];
            expect(ul.type).toBe('ul');

            const li = ul.props.children[0];
            expect(li.type).toBe('li');

            const a = li.props.children;
            expect(a.type).toBe('a');
            expect(a.props.href).toBe('/test.txt');
            expect(a.props.children).toBe('test.txt');
            expect(a.props.target).toBe('_blank');
            expect(a.props.rel).toBe('noopener noreferrer');
        })
    })
});
