import Universe from "./universe/Uniserse.tsx"
import {useState} from "react"

// Helper function to create the initial matrix
const createMatrix = (dimension: number) =>
    Array.from({length: dimension}, () => Array(dimension).fill(0))

const randomizeMatrix = (matrix: number[][], min = 0, max = 9, changes = 100): number[][] => {
    const dimension = matrix.length
    const newMatrix = matrix.map(row => [...row])

    for (let i = 0; i < changes; i++) {
        const row = Math.floor(Math.random() * dimension)
        const col = Math.floor(Math.random() * matrix[row].length)
        newMatrix[row][col] = Math.floor(Math.random() * (max - min + 1)) + min
    }

    return newMatrix
}

function App() {
    const dimension = 100

    // Initialize matrix in state
    const [matrix, setMatrix] = useState(() =>
        createMatrix(dimension)
    )

    const handleNext = () => {
        console.log('Next clicked')
        setMatrix(randomizeMatrix(matrix))
    }

    const handlePlay = () => {
        console.log('Play clicked')
    }

    const handleCellSelected = (row: number, col: number, value: number) => {
        // Toggle the selected cell
        const newMatrix = matrix.map(row => [...row])
        newMatrix[row][col] = newMatrix[row][col] === 0 ? 1 : 0
        setMatrix(newMatrix)
        console.log(`Cell selected at row ${row}, col ${col}, value ${value}`)
        console.log(`Cell selected at row ${row}, col ${col}, new value ${newMatrix[row][col]}`)
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="mb-2">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                        onClick={handleNext}>
                        Next
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={handlePlay}>
                        Play
                    </button>
                </div>
                <Universe
                    matrixInput={matrix}
                    onNext={handleNext}
                    onPlay={handlePlay}
                    onCellSelected={handleCellSelected}
                />
            </div>
        </>
    )
}

export default App
