import {useEffect, useState} from "react"
import Universe from "../components/Universe"
import {fetchEmptyMatrixAsync, fetchNextGenAsync, fetchSeedGliderGunMatrixAsync} from "../services/LifeService"
import Logger from "../common/Logger";
import {getMatrixDimension} from "../common/Config";
import styles from "../App.module.css";

/*
This React application implements Conway's Game of Life.

Overview of the solution:
The `Game` component manages the entire game state and orchestrates updates to the universe grid.

Core features:
- The universe grid is represented by a 2D matrix (`number[][]`), where `1` is a live cell and `0` is a dead cell.
- It provides user controls to:
    - Play: Start automatic generation updates.
    - Stop: Pause automatic updates.
    - Next: Step forward by one generation.
    - Move N Steps: Advance multiple generations at once.
    - Matrix Glider: Load a preset glider gun pattern.

Key logic points:
- State is managed using React’s `useState` for the matrix, play state, and step count.
- The game logic (calculating next generations) is abstracted into asynchronous service
functions (`fetchNextGenAsync`, `fetchEmptyMatrixAsync`, etc.) to simulate backend APIs requests.
- `useEffect` handles the play mode: it sets up an interval timer that updates the grid every 300 ms.
- Clicking cells toggles their state (`alive` <> `dead`) directly in the matrix.

Component breakdown:
- `<Universe />` displays the grid and passes cell selection events back to the Game.
- Service functions implemented to make matrix computations, keeping the UI code clean.

Why this structure:
- Splitting visual rendering (`Universe`) from game logic (`GameGame` + services) increases modularity.
- Using async service calls allows potential future extensions (like server-based computations).
- React state hooks and effects provide an elegant, declarative way to control updates and timers.

This structure ensures the app remains responsive, extendable, and easy to maintain.
*/
export default function Game() {
    const dimension = getMatrixDimension()
    const [matrix, setMatrix] = useState<number[][]>([])
    const [playing, setPlaying] = useState(false)
    const [steps, setSteps] = useState(1)

    const handlePlay = () => {
        Logger.logInfo('Playing')
        setPlaying(true)
    }
    const handleStop = () => {
        Logger.logInfo('Stopped')
        setPlaying(false)
    }

    const handleGliderGunMatrix = () => {
        fetchSeedGliderGunMatrixAsync(dimension)
            .then(gliderGunMatrix => {
                setMatrix(gliderGunMatrix)
            })
            .catch(error => {
                Logger.logError('Failed to fetch glider gun matrix:', error)
            })
    }

    const handleNext = async () => {
        Logger.logInfo('Next generation matrix')
        fetchNextGenAsync(matrix)
            .then(nextMatrix => {
                setMatrix(nextMatrix)
            })
            .catch(error => {
                Logger.logError('Failed to fetch next matrix:', error)
            })
    }

    const handleMoveForward = (numSteps: number) => {
        Logger.logInfo(`Moving ${numSteps} steps forward`)
        let newMatrix = matrix
        let promise = Promise.resolve(newMatrix)

        for (let i = 0; i < numSteps; i++) {
            promise = promise.then((currentMatrix) =>
                fetchNextGenAsync(currentMatrix).then((result) => {
                    newMatrix = result
                    return result
                })
            )
        }
        promise
            .then(() => {
                setMatrix(newMatrix)
            })
            .catch((error) => {
                Logger.logError('Error while moving forward:', error)
            })
    }

    const handleCellSelected = (row: number, col: number) => {
        const newMatrix = matrix.map(rowArr => [...rowArr])
        newMatrix[row][col] = newMatrix[row][col] === 0 ? 1 : 0
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
        <>
        <div className={styles.layoutSidebar}>
            <div className="flex flex-col gap-4 mt-2">
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
                <div >
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
        </div>
        <div className="flex flex-col items-center mt-2">
            <Universe matrixInput={matrix} onCellSelected={handleCellSelected}/>
        </div>
        </>
    )
}