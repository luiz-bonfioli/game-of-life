import {useEffect, useState} from "react"
import Universe from "./components/Universe.tsx"
import {
    fetchEmptyMatrixAsync,
    fetchNextGenAsync,
    fetchSeedGliderGunMatrixAsync,
    fetchSeedLWSSMatrixAsync
} from "./services/LifeService.ts"

function App() {
    const dimension = 50
    const [matrix, setMatrix] = useState<number[][]>([])
    const [playing, setPlaying] = useState(false)
    const [steps, setSteps] = useState(1)

    const handleGliderGunMatrix = async () => {
        const gliderGunMatrix = await fetchSeedGliderGunMatrixAsync(dimension)
        setMatrix(gliderGunMatrix)
    }

    const handleWSSMatrix = async () => {
        const lwssMatrix = await fetchSeedLWSSMatrixAsync(dimension)
        setMatrix(lwssMatrix)
    }

    const handleNext = async () => {
        const nextMatrix = await fetchNextGenAsync(matrix)
        setMatrix(nextMatrix)
    }

    const handlePlay = () => setPlaying(true)
    const handleStop = () => setPlaying(false)

    const handleCellSelected = (row: number, col: number) => {
        const newMatrix = matrix.map(rowArr => [...rowArr])
        newMatrix[row][col] = newMatrix[row][col] === 0 ? 1 : 0
        setMatrix(newMatrix)
    }

    const handleMoveForward = async (numSteps: number) => {
        let newMatrix = matrix
        for (let i = 0; i < numSteps; i++) {
            newMatrix = await fetchNextGenAsync(newMatrix)
        }
        setMatrix(newMatrix)
    }

    useEffect(() => {
        const updateMatrix = async () => {
            if (playing) {
                const nextMatrix = await fetchNextGenAsync(matrix)
                setMatrix(nextMatrix)
            }
        }

        if (playing) {
            const interval = setInterval(updateMatrix, 300)
            return () => clearInterval(interval)
        }
    }, [playing, matrix])

    useEffect(() => {
        fetchEmptyMatrixAsync(dimension).then(emptyMatrix => setMatrix(emptyMatrix))
    }, [dimension])

    return (
        <div className="flex flex-col items-center">
            <div className="m-4">
                <button
                    className={`px-4 py-2 ${playing ? 'bg-yellow-500' : 'bg-green-500'} text-white rounded mr-2 hover:bg-green-600`}
                    onClick={handlePlay}
                    disabled={playing}>
                    Play
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded mr-2 hover:bg-red-600"
                    onClick={handleStop}
                    disabled={!playing}>
                    Stop
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                    onClick={handleNext}>
                    Next
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                    onClick={handleGliderGunMatrix}>
                    Matrix Glider
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                    onClick={handleWSSMatrix}>
                    Matrix WSS
                </button>
                <div className="mt-2">
                    <button
                        className="px-4 py-2 bg-indigo-500 text-white rounded mr-2 hover:bg-indigo-600"
                        onClick={() => handleMoveForward(steps)}>
                        Move {steps} Step(s)
                    </button>
                    <input
                        type="number"
                        value={steps}
                        onChange={(e) => setSteps(Number(e.target.value))}
                        min="1"
                        className="px-4 py-2 border rounded w-[100px]"
                    />
                </div>
            </div>
            <Universe
                matrixInput={matrix}
                onCellSelected={handleCellSelected}
            />
        </div>
    )
}

export default App
