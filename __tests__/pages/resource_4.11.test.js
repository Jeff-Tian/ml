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
            const result = await Tree({ data });

            // assert
            expect(result).toBeDefined();
            expect(result.props.children).toBeDefined();
            expect(result.props.children).toStrictEqual([]);
        });
    })
});
