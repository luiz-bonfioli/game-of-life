import { render, screen, fireEvent, act } from '@testing-library/react'
import Universe from "../src/components/Universe"


// Helper to generate matrix
const createMatrix = (rows: number, cols: number, fill = 0) =>
    Array.from({ length: rows }, () => Array(cols).fill(fill))

describe('Universe component', () => {
    test('renders grid with correct number of rows and columns', () => {
        const matrix = createMatrix(3, 4)
        render(<Universe matrixInput={matrix} />)

        const cells = screen.getAllByRole('gridcell')
        expect(cells.length).toBeGreaterThan(0)
    })

    test('renders black background for value=1 and lightgray for value=0', () => {
        const matrix = [
            [0, 1],
            [1, 0],
        ]
        render(<Universe matrixInput={matrix} />)

        const cells = screen.getAllByRole('gridcell')
        expect(cells.length).toBeGreaterThan(0)

        cells.forEach((cell) => {
            const bg = cell.style.backgroundColor
            expect(['black', 'lightgray']).toContain(bg)
        })
    })

    test('calls onCellSelected when a cell is clicked', () => {
        const matrix = createMatrix(2, 2)
        const onCellSelected = jest.fn()

        render(<Universe matrixInput={matrix} onCellSelected={onCellSelected} />)

        const cells = screen.getAllByRole('gridcell')
        expect(cells.length).toBeGreaterThan(0)

        act(() => {
            fireEvent.click(cells[0])
        })

        expect(onCellSelected).toHaveBeenCalled()
    })

    test('passes correct row and column index on cell click', () => {
        const matrix = createMatrix(2, 2)
        const onCellSelected = jest.fn()

        render(<Universe matrixInput={matrix} onCellSelected={onCellSelected} />)

        const cells = screen.getAllByRole('gridcell')

        act(() => {
            fireEvent.click(cells[0]) // row 0, col 0
        })
        expect(onCellSelected).toHaveBeenCalledWith(0, 0)

        act(() => {
            fireEvent.click(cells[1]) // row 0, col 1
        })
        expect(onCellSelected).toHaveBeenCalledWith(0, 1)
    })
})
