import {FixedSizeGrid as Grid, type GridChildComponentProps} from 'react-window'

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
