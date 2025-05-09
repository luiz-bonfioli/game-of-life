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
    const matrix = matrixInput
    const numRows = matrix.length
    const numCols = matrix[0]?.length || 0
    const cellSize = 10

    const Cell = ({columnIndex, rowIndex, style}: GridChildComponentProps) => {
        const value = matrix[rowIndex][columnIndex]

        const handleClick = () => {
            if (onCellSelected) onCellSelected(rowIndex, columnIndex)
        }

        return (
            <span role="gridcell"
                style={{
                    ...style,
                    backgroundColor: value === 1 ? 'black' : 'lightgray',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    display: 'inline-block',
                }}
                onClick={handleClick}/>
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
