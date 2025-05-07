import Universe from "./universe/Universe.tsx"
import {useEffect, useState} from "react"
import {nextGen} from "./universe/LifeAlgorithm.ts"
import {emptyMatrix, seedGliderGunMatrix, seedLWSSMatrix} from "./universe/Seeds.ts"

function App() {

    const dimension = 50
    const [matrix, setMatrix] = useState(() => emptyMatrix(dimension))
    const [playing, setPlaying] = useState(false)
    const [steps, setSteps] = useState(1)

    const handleNext = () => {
        setMatrix((prev: number[][]) => nextGen(prev))
    }

    const handlePlay = () => {
        setPlaying(true)
    }

    const handleStop = () => {
        setPlaying(false)
    }

    const handleCellSelected = (row: number, col: number) => {
        const newMatrix = matrix.map(rowArr => [...rowArr])
        newMatrix[row][col] = newMatrix[row][col] === 0 ? 1 : 0
        setMatrix(newMatrix)
    }

    const handleMoveForward = (numSteps: number) => {
        let newMatrix = matrix
        for (let i = 0; i < numSteps; i++) {
            newMatrix = nextGen(newMatrix)
        }
        setMatrix(newMatrix)
    }

    const handleWSSMatrix = () => {
        setMatrix(seedLWSSMatrix(dimension))
    }

    const handleGliderGunMatrix = () => {
        setMatrix(seedGliderGunMatrix(dimension))
    }

    useEffect(() => {
        if (!playing) return

        const interval = setInterval(() => {
            setMatrix(prev => nextGen(prev))
        }, 300)

        return () => {
            clearInterval(interval)
        }
    }, [playing])

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="m-2">
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
                    <div className="mt-4">
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
                    <div className="mt-4">

                    </div>
                </div>
                <Universe
                    matrixInput={matrix}
                    onCellSelected={handleCellSelected}
                />
            </div>
        </>
    )
}

export default App
