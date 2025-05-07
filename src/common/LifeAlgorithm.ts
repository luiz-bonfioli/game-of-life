// Creates an empty matrix with the given number of rows and columns, initializing all cells to 0
const createEmptyMatrix = (rows: number, cols: number): number[][] => {
    return Array.from({length: rows}, () => Array(cols).fill(0))
}

// Counts the number of live neighbors around a given cell
const countLiveNeighbors = (matrixInput: number[][], r: number, c: number, rows: number, cols: number): number => {
    // Directions to check: 8 neighbors (top-left, top, top-right, left, right, bottom-left, bottom, bottom-right)
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ]
    let count = 0
    for (const [dr, dc] of directions) {
        const nr = r + dr // New row index
        const nc = c + dc // New column index
        // Check if the neighbor is within bounds
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            count += matrixInput[nr][nc] // Increment count if the neighbor is alive (1)
        }
    }
    return count
}

// Determines the next state of a cell based on its current state and the number of live neighbors
const getNextCellState = (currentCell: number, liveNeighbors: number): number => {
    const LIVE = 1
    const DEAD = 0

    if (currentCell === LIVE) {
        // Rule 1: Any live cell with fewer than two live neighbors dies, as if by underpopulation
        // Rule 2: Any live cell with two or three live neighbors lives on to the next generation
        // Rule 3: Any live cell with more than three live neighbors dies, as if by overpopulation
        return (liveNeighbors === 2 || liveNeighbors === 3) ? LIVE : DEAD
    } else {
        // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction
        return (liveNeighbors === 3) ? LIVE : DEAD
    }
}

// Main function to calculate the next generation of the matrix
export const nextGen = (matrixInput: number[][]): number[][] => {
    const rows = matrixInput.length // Get the number of rows
    const cols = matrixInput[0].length // Get the number of columns
    const nextMatrix = createEmptyMatrix(rows, cols) // Create a new empty matrix for the next generation

    // Iterate through each cell in the matrix to compute the next state
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Count the number of live neighbors for the current cell
            const liveNeighbors = countLiveNeighbors(matrixInput, r, c, rows, cols)
            const currentCell = matrixInput[r][c] // Get the current state of the cell
            // Get the next state of the cell and store it in the nextMatrix
            nextMatrix[r][c] = getNextCellState(currentCell, liveNeighbors)
        }
    }

    // Return the new matrix representing the next generation
    return nextMatrix
}
