import Universe from "./universe/Uniserse.tsx";

function App() {
    const dimension = 50;
    const initialMatrix = Array.from({length: dimension}, () => Array(dimension).fill(0));

    const handleNext = () => {
        console.log('Next clicked');
    };

    const handlePlay = () => {
        console.log('Play clicked');
    };

    const handleCellSelected = (row: number, col: number) => {
        console.log(`Cell selected at row ${row}, col ${col}`);
    };

    return (
        <>
            <Universe
                matrixInput={initialMatrix}
                onNext={handleNext}
                onPlay={handlePlay}
                onCellSelected={handleCellSelected}
            />
        </>
    );
}

export default App;
