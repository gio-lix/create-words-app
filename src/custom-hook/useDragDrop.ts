import {DragEvent, useState} from "react";
import {setWordToBoard} from "../redux/wordsBoardSlice";
import {useAppDispatch,} from "../redux/store";

interface KeyPair<T, U> {
    id: T;
    value: U;
}

interface ClassesType {
    drag?: KeyPair<number | null, string>
    over?: KeyPair<number | null, string>
}

export const useDragDrop = (board: string[]) => {
    const dispatch = useAppDispatch()

    const [currentBoardIndex, setCurrentBoardIndex] = useState<(number | null)[]>([null, null])

    const [classes, setClasses] = useState<ClassesType>({
        drag: {id: null, value: ""},
        over: {id: null, value: ""}
    })

    const handleDragStart = (e: DragEvent<HTMLDivElement>, item: number) => {
        setCurrentBoardIndex([item, null])
        setClasses({drag: {id: item, value: "visible-none"}})
    }
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const handleDragOver = (e: DragEvent<HTMLDivElement>, item: number) => {
        e.preventDefault()
        setClasses({over: {id: item, value: "board-word-hover"}})
    }

    const handleDragEnter = (e: DragEvent<HTMLDivElement>, item: number) => {
        e.preventDefault()
        setCurrentBoardIndex([currentBoardIndex[0], item])
    }

    const handleDrag = () => {
        setClasses({drag: {id: null, value: ""}})
        setClasses({over: {id: null, value: ""}})
        let a = currentBoardIndex[0] as number
        let b = currentBoardIndex[1] as number

        if (!a && !b) return

        const _board = [...board]

        let value1 = _board[a]
        let value2 = _board[b]

        _board.splice(a, 1, value2)
        _board.splice(b, 1, value1)

        dispatch(setWordToBoard(_board))
    }

    return {
        handleDragStart,
        handleDragLeave,
        handleDragOver,
        handleDragEnter,
        handleDrag,
        classes
    }
}
