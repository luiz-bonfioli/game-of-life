import {act, fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../src/App'
import * as LifeService from '../src/services/LifeService'
import * as Config from '../src/common/Config'

// Mock the Universe component
jest.mock('../src/components/Universe', () => ({
    __esModule: true,
    default: () => <div data-testid="universe"></div>, // Mocked component
}))

// Mock the service functions
jest.mock('../src/services/LifeService', () => ({
    fetchEmptyMatrixAsync: jest.fn(),
    fetchSeedGliderGunMatrixAsync: jest.fn(),
    fetchNextGenAsync: jest.fn(),
}))

// Mock the `getMatrixDimension` function from Config
jest.mock('../src/common/Config', () => ({
    getMatrixDimension: jest.fn(),
}))

const mockedLifeService = LifeService as jest.Mocked<typeof LifeService>
const mockedConfig = Config as jest.Mocked<typeof Config>

const mockedEmptyMatrix = Array(50).fill(Array(50).fill(0))
const mockedGliderGunMatrix = Array(50).fill(Array(50).fill(1))
const mockedNextGenMatrix = Array(50).fill(Array(50).fill(2))

describe('App Component', () => {

    beforeEach(() => {
        jest.resetAllMocks()
        mockedLifeService.fetchEmptyMatrixAsync.mockResolvedValue(mockedEmptyMatrix)
        mockedLifeService.fetchSeedGliderGunMatrixAsync.mockResolvedValue(mockedGliderGunMatrix)
        mockedLifeService.fetchNextGenAsync.mockResolvedValue(mockedNextGenMatrix)
        mockedConfig.getMatrixDimension.mockReturnValue(50)
    })

    test('renders initial UI elements', async () => {
        render(<App/>)

        expect(screen.getByText(/Play/)).toBeInTheDocument()
        expect(screen.getByText(/Stop/)).toBeInTheDocument()
        expect(screen.getByText(/Next/)).toBeInTheDocument()
        expect(screen.getByText(/Move 1 Step/)).toBeInTheDocument()
    })

    test('calls fetchEmptyMatrixAsync and sets the initial matrix', async () => {
        render(<App/>)

        await waitFor(() => {
            expect(mockedLifeService.fetchEmptyMatrixAsync).toHaveBeenCalledWith(50)
            expect(mockedLifeService.fetchEmptyMatrixAsync).toHaveBeenCalledTimes(1)
        })
    })

    test('clicking Play button sets playing state to true', async () => {
        render(<App/>)

        const playButton = screen.getByText(/Play/)
        await act(async () => {
            fireEvent.click(playButton)
        })

        expect(playButton).toBeDisabled()
        expect(screen.getByText(/Stop/)).not.toBeDisabled()
    })

    test('clicking Stop button sets playing state to false', async () => {
        render(<App/>)

        // Start the game
        const playButton = screen.getByText(/Play/)
        fireEvent.click(playButton)

        const stopButton = screen.getByText(/Stop/)
        await act(async () => {
            fireEvent.click(stopButton)
        })

        expect(playButton).not.toBeDisabled()
        expect(stopButton).toBeDisabled()
    })

    test('clicking Next button calls fetchNextGenAsync', async () => {
        render(<App/>)

        const nextButton = screen.getByText(/Next/)
        await act(async () => {
            fireEvent.click(nextButton)
        })

        await waitFor(() => {
            expect(mockedLifeService.fetchNextGenAsync).toHaveBeenCalledTimes(1)
        })
    })

    test('clicking Matrix Glider button calls fetchSeedGliderGunMatrixAsync', async () => {
        render(<App/>)

        const gliderButton = screen.getByText(/Matrix Glider/)
        await act(async () => {
            fireEvent.click(gliderButton)
        })

        await waitFor(() => {
            expect(mockedLifeService.fetchSeedGliderGunMatrixAsync).toHaveBeenCalledWith(50)
            expect(mockedLifeService.fetchSeedGliderGunMatrixAsync).toHaveBeenCalledTimes(1)
        })
    })

    test('clicking Move Step button updates steps', async () => {
        render(<App/>)

        const moveButton = screen.getByText(/Move 1 Step/)
        const inputField = screen.getByRole('spinbutton')

        fireEvent.change(inputField, {target: {value: '3'}})

        await act(async () => {
            fireEvent.click(moveButton)
        })

        expect(screen.getByText(/Move 3 Step/)).toBeInTheDocument()
    })

    test('the matrix updates after clicking on the Matrix Glider button', async () => {
        render(<App/>)

        const gliderButton = screen.getByText(/Matrix Glider/)
        await act(async () => {
            fireEvent.click(gliderButton)
        })

        await waitFor(() => {
            expect(mockedLifeService.fetchSeedGliderGunMatrixAsync).toHaveBeenCalledTimes(1)
        })
    })
})
