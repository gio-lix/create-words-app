import Board from "./components/Board";
import KeyBoard from "./components/KeyBoard";
import Word from "./components/Word";
import {useAppSelector} from "./redux/store";

function App() {
    const {currentIndex} = useAppSelector((state) => state.board)

    console.log("currentIndex  ", currentIndex)

    return (
        <main>
            <Word />
            <Board/>
            <KeyBoard />
        </main>
    )
}

export default App
