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
    })
})
