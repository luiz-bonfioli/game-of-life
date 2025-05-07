import React, {useState} from 'react';
import {FixedSizeGrid as Grid, type GridChildComponentProps} from 'react-window';

interface UniverseProps {
    onNext?: () => void;
    onPlay?: () => void;
    onCellSelected?: (row: number, col: number) => void;
    matrixInput?: number[][];
}

export default function Universe({
                                     onNext,
                                     onPlay,
                                     onCellSelected,
                                     matrixInput = [],
                                 }: UniverseProps) {

    const [matrix] = useState(matrixInput);
    const numRows = matrix.length;
    const numCols = matrix[0]?.length || 0;
    const cellSize = 10; // each cell is 10x10px

    const cell = ({columnIndex, rowIndex, style}: GridChildComponentProps) => {
        const value = matrix[rowIndex][columnIndex];

        const handleClick = () => {
            if (onCellSelected) onCellSelected(rowIndex, columnIndex);
        };

        return (
            <span
                style={{
                    ...style,
                    backgroundColor: value ? 'black' : 'lightgray',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    display: 'inline-block',
                }}
                onClick={handleClick}
            />
        );
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-2">
                {onNext && (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                            onClick={onNext}>
                        Next
                    </button>
                )}
                {onPlay && (
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={onPlay}>
                        Play
                    </button>
                )}
            </div>
            <Grid
                columnCount={numCols}
                rowCount={numRows}
                columnWidth={cellSize}
                rowHeight={cellSize}
                width={Math.min(window.innerWidth, numCols * cellSize)}
                height={Math.min(window.innerHeight, numRows * cellSize)}
            >
                {cell}
            </Grid>
        </div>
    );
}
