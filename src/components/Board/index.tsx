import "./board.css"
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {ChangeEvent, useRef} from "react";
import {setCurrentIndex} from "../../redux/wordsBoardSlice";
import {useDragDrop} from "../../custom-hook/useDragDrop";
import {useKey} from "../../custom-hook/useKey";


const Board = () => {
    const {key} = useKey()
    const dispatch = useAppDispatch()
    const {board, correctWord} = useAppSelector((state: RootState) => state.board)

    const {
        handleDragLeave,
        handleDragOver,
        handleDragStart,
        handleDragEnter,
        handleDrag,
        classes
    } = useDragDrop(board)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleFocus = (item: string,idx: number) => {
        dispatch(setCurrentIndex(idx))
    }
    const handleInputValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        e.stopPropagation()
        // const _board = [...board]
        // _board[index] = key
        //
        // dispatch(setWordToBoard(_board))
        //
        // if (!inputRef.current) return
        //
        // inputRef.current.blur()
        // dispatch(incCurrentIndex())
    }


    const lettersArray = [...correctWord]

    let newLettersArray: boolean[] = []
    lettersArray.forEach((letter, index) => {
        if (letter === board.join("")[index]) {
            newLettersArray.push(true)
        } else {
            newLettersArray.push(false)
        }
    })


    return (
        <section className="board-box">
            {board.map((item, index) => (
                <div
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragLeave={(e) => handleDragLeave(e)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragEnd={handleDrag}
                    draggable={true}
                    id={String(index)}
                    style={{
                        background: board.join("").length === 5 ? newLettersArray[index] ? "green" : "red" : ""
                    }}
                    className={`board-word 
                        ${board.join("").length === 5 ? "full" : ""}
                        ${classes.drag?.id === index ? classes.drag?.value : null}
                        ${classes.over?.id === index ? classes.over?.value : null}`
                    }
                    key={index}
                >
                    <input
                        type="text"
                        value={item}
                        ref={inputRef}
                        onChange={(e) => handleInputValue(e,index)}
                        onFocus={() => handleFocus(item,index)}
                    />
                </div>
            ))}
        </section>
    );
};

export default Board;
