import {nextGen} from "../common/LifeAlgorithm.ts";

// Helper function to create an empty matrix of a specific dimension
const createEmptyMatrix = (dimension: number): number[][] => {
    return Array.from({length: dimension}, () => Array(dimension).fill(0));
}

// Helper function to centralize a seed in a matrix
const centralizeSeed = (matrix: number[][], seed: number[][]): number[][] => {
    const seedRows = seed.length;
    const seedCols = seed[0].length;
    const startRow = Math.floor((matrix.length - seedRows) / 2);
    const startCol = Math.floor((matrix[0].length - seedCols) / 2);

    for (let i = 0; i < seedRows; i++) {
        for (let j = 0; j < seedCols; j++) {
            matrix[startRow + i][startCol + j] = seed[i][j];
        }
    }
    return matrix;
}

// Fetch the next generation of the matrix
export const fetchNextGenAsync = (matrixInput: number[][]): Promise<number[][]> => {
    return Promise.resolve(nextGen(matrixInput))
}

// Fetch empty matrix
export const fetchEmptyMatrixAsync = (dimension: number): Promise<number[][]> => {
    const emptyMatrix = createEmptyMatrix(dimension);
    return Promise.resolve(emptyMatrix);
}

// Fetch Glider Gun pattern centralized in the matrix
export const fetchSeedGliderGunMatrixAsync = (dimension: number): Promise<number[][]> => {
    const seedGliderGunMatrix: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const matrix = createEmptyMatrix(dimension);
    const centralizedMatrix = centralizeSeed(matrix, seedGliderGunMatrix);
    return Promise.resolve(centralizedMatrix);
}

// Fetch LWSS pattern centralized in the matrix
export const fetchSeedLWSSMatrixAsync = (dimension: number): Promise<number[][]> => {
    const seedLWSSMatrix: number[][] = [
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ];

    const matrix = createEmptyMatrix(dimension);
    const centralizedMatrix = centralizeSeed(matrix, seedLWSSMatrix);
    return Promise.resolve(centralizedMatrix);
}
