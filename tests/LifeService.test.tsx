import {fetchEmptyMatrixAsync, fetchNextGenAsync} from "../src/services/LifeService"

describe('matrix API async functions', () => {
    describe('fetchNextGenAsync', () => {
        test('returns the next generation matrix', async () => {
            const blinker = [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ]
            const expected = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ]

            const result = await fetchNextGenAsync(blinker)
            expect(result).toEqual(expected)
        })

        test('works on empty matrix', async () => {
            const empty = [
                [0, 0],
                [0, 0],
            ]

            const result = await fetchNextGenAsync(empty)
            expect(result).toEqual(empty)
        })
    })

    describe('fetchEmptyMatrixAsync', () => {
        test('returns an empty matrix of correct dimensions', async () => {
            const dimension = 3
            const result = await fetchEmptyMatrixAsync(dimension)

            expect(result.length).toBe(dimension)
            result.forEach(row => {
                expect(row.length).toBe(dimension)
                row.forEach(cell => expect(cell).toBe(0))
            })
        })

        test('returns a 0x0 matrix when dimension is 0', async () => {
            const result = await fetchEmptyMatrixAsync(0)
            expect(result).toEqual([])
        })
    })
})
