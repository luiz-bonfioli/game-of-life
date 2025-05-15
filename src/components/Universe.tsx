import {FixedSizeGrid as Grid, type GridChildComponentProps} from 'react-window'

/**
 * Universe Component
 *
 * A virtualized grid component that renders a matrix of cells using react-window's FixedSizeGrid.
 *
 * Props:
 * - matrixInput (number[][]): A 2D array where each cell contains 0 or 1, representing the grid state.
 *   - 1 -> rendered as a black cell
 *   - 0 -> rendered as a light gray cell
 * - onCellSelected (function): Callback triggered when a cell is clicked, providing the row and column indices.
 *
 * Features:
 * - Uses react-window for efficient rendering of large grids by only rendering visible cells.
 * - Responsive sizing: window size limits grid dimensions.
 * - Each cell is a clickable <span> that triggers onCellSelected if provided.
 *
 * Example usage:
 * <Universe
 *   matrixInput={[[0,1,0], [1,0,1]]}
 *   onCellSelected={(row, col) => console.log(`Clicked cell at ${row}, ${col}`)}
 * />
 *
 * Note:
 * - Adjust `cellSize` if you want larger or smaller cells.
 */

export interface UniverseProps {
    onCellSelected?: (row: number, col: number) => void
    matrixInput?: number[][]
}

export default function Universe({
                                     onCellSelected,
                                     matrixInput = []
                                 }: UniverseProps) {
    // Store the input matrix and derive dimensions
    const matrix = matrixInput
    const numRows = matrix.length
    const numCols = matrix[0]?.length || 0

    // Define the size of each cell in pixels
    const cellSize = 10

    // Cell component rendered inside a virtualized grid
    const Cell = ({columnIndex, rowIndex, style}: GridChildComponentProps) => {
        // Get the value of the current cell (1 = alive, 0 = dead)
        const value = matrix[rowIndex][columnIndex]

        // Handle click on the cell: notify parent via callback if defined
        const handleClick = () => {
            if (onCellSelected) onCellSelected(rowIndex, columnIndex)
        }

        // Render a <span> as the visual cell
        return (
            <span
                role="gridcell"
                style={{
                    ...style, // Positioning & sizing provided by react-window
                    backgroundColor: value === 1 ? 'black' : 'lightgray', // Alive = black, Dead = gray
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    display: 'inline-block',
                }}
                onClick={handleClick} // Handle user click
            />
        )
    }

    return (
        <Grid
            columnCount={numCols}
            rowCount={numRows}
            columnWidth={cellSize}
            rowHeight={cellSize}
            width={Math.min(window.innerWidth, numCols * cellSize)}
            height={Math.min(window.innerHeight, numRows * cellSize)}>
            {Cell}
        </Grid>
    )
}
