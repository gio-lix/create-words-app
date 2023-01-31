import "./keyboard.css"
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {
    check,
    decCurrentIndex,
    incCurrentIndex,
    setNextWord,
    setReset,
    setWordToBoard
} from "../../redux/wordsBoardSlice";

import {SyntheticEvent, useEffect} from "react";
const KeyBoard = () => {
    const dispatch = useAppDispatch()
    const {currentIndex, board} = useAppSelector((state) => state.board)

    const rows: string[] = [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m",
    ];

    useEffect(() => {
        if (currentIndex === 5) {
            dispatch(check(board.join("")))
        }
    },[currentIndex])

    const recursionFunc: any = (arr: string[], idx: number, str: string) =>  {
        if (arr[idx] === "") {
            arr[idx] = str
            dispatch(setWordToBoard(arr))
            return
        }
        return recursionFunc(arr, idx + 1 ,str)
    }
    const handleLetter = (str: string) => {
        if (currentIndex > 4) return

        const _board = [...board]

        if (_board[currentIndex] !== "") {
            return  recursionFunc(_board, currentIndex, str)
        }

        _board[currentIndex] = str

        dispatch(setWordToBoard(_board))
        dispatch(incCurrentIndex())
    }


    const clickBack = (e: SyntheticEvent) => {
        e.stopPropagation()
        const _board = [...board]

        if (currentIndex === 0) {
            _board[currentIndex] = ""
            dispatch(setWordToBoard(_board))
            return
        }

        if (_board[currentIndex] !== "") {
            _board[currentIndex] = ""
            dispatch(setWordToBoard(_board))
            return;
        }

        _board[currentIndex - 1] = ""
        dispatch(setWordToBoard(_board))
        dispatch(decCurrentIndex())
    }
    const handleEnter = () => {
        dispatch(setNextWord())
        dispatch(setReset())
    }

    return (
        <section className="key-board">
            {rows.map((element,index) => (
                <div className="chart" key={index}>
                    {index === 2 ? (
                        <span className="letter-enter" onClick={handleEnter} >
                           Swap
                        </span>
                    ) : null}
                    {element.split(" ").map((letter, idx) => (
                        <div onClick={() => handleLetter(letter)}  key={idx}
                        >
                            {letter}
                            {
                                letter === "m"
                                ? <span className="letter-back" onClick={(e) => {
                                        if (board.join("").length >= 5) return
                                        clickBack(e)
                                    }}>Back</span> : null
                            }
                        </div>
                    ))}
                </div>
            ))}
        </section>
    );
};

export default KeyBoard;
