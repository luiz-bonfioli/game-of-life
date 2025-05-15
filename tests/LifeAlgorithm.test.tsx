import {nextGen} from "../src/common/LifeAlgorithm"

describe('Game of Life logic', () => {
    describe('nextGen', () => {
        test('correctly computes next generation for blinker (oscillator)', () => {
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
            expect(nextGen(blinker)).toEqual(expected)
        })

        test('correctly computes next generation for block', () => {
            const block = [
                [1, 1],
                [1, 1],
            ]
            const expected = [
                [1, 1],
                [1, 1],
            ]
            expect(nextGen(block)).toEqual(expected)
        })

        test('correctly computes next generation for empty grid', () => {
            const empty = [
                [0, 0],
                [0, 0],
            ]
            const expected = [
                [0, 0],
                [0, 0],
            ]
            expect(nextGen(empty)).toEqual(expected)
        })

        // Edge case tests below:

        test('handles single live cell dying due to underpopulation', () => {
            const input = [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0],
            ]
            const expected = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ]
            expect(nextGen(input)).toEqual(expected)
        })

        test('handles live cell with exactly two neighbors surviving', () => {
            const input = [
                [1, 1, 0],
                [1, 1, 0],
                [0, 0, 0],
            ]
            const expected = [
                [1, 1, 0],
                [1, 1, 0],
                [0, 0, 0],
            ]
            expect(nextGen(input)).toEqual(expected)
        })

        test('handles reproduction: dead cell with exactly three live neighbors becomes alive', () => {
            const input = [
                [1, 1, 0],
                [0, 1, 0],
                [0, 0, 0],
            ]
            const expected = [
                [1, 1, 0],
                [1, 1, 0],
                [0, 0, 0],
            ]
            expect(nextGen(input)).toEqual(expected)
        })

        test('handles border cells correctly without errors', () => {
            const input = [
                [1, 0],
                [0, 1],
            ]
            // Expect the function to process edges properly (live cells with < 2 neighbors die)
            const expected = [
                [0, 0],
                [0, 0],
            ]
            expect(nextGen(input)).toEqual(expected)
        })
    })
})
