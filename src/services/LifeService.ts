import {nextGen} from "../common/LifeAlgorithm"

/**
 * Matrix Utilities for Conway's Game of Life
 *
 * This module provides utility functions to generate, update, and seed matrices
 * used in the Game of Life simulation.
 *
 * Exports:
 *
 * - fetchNextGenAsync(matrixInput): Promise<number[][]>
 *   Runs the next generation of the matrix using the LifeAlgorithm (pure function).
 *
 * - fetchEmptyMatrixAsync(dimension): Promise<number[][]>
 *   Generates and returns a promise with an empty square matrix of the given size.
 *
 * - fetchSeedGliderGunMatrixAsync(dimension): Promise<number[][]>
 *   Generates a square matrix of the given size with the famous Gosper Glider Gun
 *   pattern centralized in the grid.
 *
 * Internals:
 * - createEmptyMatrix(dimension): Creates a 2D array filled with zeros.
 * - centralizeSeed(dimension, patternCoords, patternHeight, patternWidth):
 *   Inserts a given pattern (list of live cell coordinates) centered into an empty matrix.
 *
 * Notes:
 * - All matrix data is represented as a 2D array of numbers (0 = dead cell, 1 = live cell).
 * - Async functions are wrapped with Promise.resolve for API consistency, even if they are synchronous internally.
 *
 */

// Helper to create an empty matrix
const createEmptyMatrix = (dimension: number): number[][] => {
    return Array.from({length: dimension}, () => Array(dimension).fill(0))
}

// Fetch the next generation of the matrix
export const fetchNextGenAsync = (matrixInput: number[][]): Promise<number[][]> => {
    return Promise.resolve(nextGen(matrixInput))
}

// Fetch empty matrix
export const fetchEmptyMatrixAsync = (dimension: number): Promise<number[][]> => {
    return Promise.resolve(createEmptyMatrix(dimension))
}

// Helper to insert coordinates centered into matrix
const centralizeSeed = (
    dimension: number,
    patternCoords: number[][],
    patternHeight: number,
    patternWidth: number
): number[][] => {
    const matrix = createEmptyMatrix(dimension)
    const offsetRow = Math.floor((dimension - patternHeight) / 2)
    const offsetCol = Math.floor((dimension - patternWidth) / 2)

    for (const [row, col] of patternCoords) {
        const targetRow = offsetRow + row
        const targetCol = offsetCol + col
        if (targetRow >= 0 && targetRow < dimension && targetCol >= 0 && targetCol < dimension) {
            matrix[targetRow][targetCol] = 1
        }
    }

    return matrix
}

// Fetch Glider Gun pattern
export const fetchSeedGliderGunMatrixAsync = (dimension: number): Promise<number[][]> => {
    const gunCoords = [
        [5, 1], [5, 2], [6, 1], [6, 2],
        [5, 11], [6, 11], [7, 11],
        [4, 12], [8, 12],
        [3, 13], [9, 13],
        [3, 14], [9, 14],
        [6, 15],
        [4, 16], [8, 16],
        [5, 17], [6, 17], [7, 17],
        [6, 18],
        [3, 21], [4, 21], [5, 21],
        [3, 22], [4, 22], [5, 22],
        [2, 23], [6, 23],
        [1, 25], [2, 25], [6, 25], [7, 25],
        [3, 35], [4, 35], [3, 36], [4, 36]
    ]
    const gunHeight = 11 // based on max row index + 1
    const gunWidth = 38  // based on max col index + 1

    const matrix = centralizeSeed(dimension, gunCoords, gunHeight, gunWidth)
    return Promise.resolve(matrix)
}
