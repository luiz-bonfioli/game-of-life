import Game from "./components/Game";
import styles from './App.module.css';

function App() {

    return (
        <>
            <div className={styles.layoutWrapper}>
                <div className={styles.layoutTopbar}>
                    <i className="pi pi-fw pi-file m-2 !text-2xl"></i>
                    <span className="!text-xl">Game of Life</span>
                </div>
                <div className={styles.layoutContainer}>
                    <Game></Game>
                </div>
            </div>
        </>
    )
}

export default App
