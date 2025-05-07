export const emptyMatrix = (dimension: number): number[][] => {
    return Array.from({length: dimension}, () => Array(dimension).fill(0))
}

export const seedLWSSMatrix = (dimension: number): number[][] => {
    const rows = dimension
    const cols = dimension

    // Initialize empty matrix with 0s
    const matrix = Array.from({length: rows}, () => Array(cols).fill(0))

    // Define LWSS pattern (5x5 block)
    const lwss = [
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0],
    ]

    // Calculate start row and col to center LWSS
    const startRow = Math.floor((rows - lwss.length) / 2)
    const startCol = Math.floor((cols - lwss[0].length) / 2)

    // Insert LWSS pattern centered
    for (let i = 0; i < lwss.length; i++) {
        for (let j = 0; j < lwss[i].length; j++) {
            matrix[startRow + i][startCol + j] = lwss[i][j]
        }
    }

    return matrix
}


export const seedGliderGunMatrix = (dimension: number): number[][] => {
    const rows = dimension
    const cols = dimension

    // Initialize empty matrix
    const matrix = Array.from({length: rows}, () => Array(cols).fill(0))

    // Gosper Glider Gun pattern (relative coordinates)
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

    // Optional: center the gun pattern in the matrix
    const gunHeight = 10 // rough bounding box height
    const gunWidth = 38  // rough bounding box width

    const startRow = Math.floor((rows - gunHeight) / 2)
    const startCol = Math.floor((cols - gunWidth) / 2)

    // Place the gun on the grid
    for (const [r, c] of gunCoords) {
        const row = startRow + r
        const col = startCol + c
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
            matrix[row][col] = 1
        }
    }

    return matrix
}
