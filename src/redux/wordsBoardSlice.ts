import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BoardType} from "../inderface";
import worldList from "../word.json";

interface State extends BoardType {
    correctWord: string
    currentIndex: number
    status: "correct" | "wrong" | "almost" | ""
}


const initialState: State = {
    board: [...new Array(5).fill("")],
    correctWord: worldList.words[Math.floor(Math.random() * worldList.words.length)],
    currentIndex: 0,
    status: ""
}

const wordsBoardSlice = createSlice({
    name: "words",
    initialState,
    reducers: {
        setWordToBoard: (state, action: PayloadAction<string[]>) => {
            state.board = action.payload
        },
        setCurrentIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload
        },
        incCurrentIndex: (state) => {
            state.currentIndex++
        },
        decCurrentIndex: (state) => {
            state.currentIndex--
        },
        check: (state, action: PayloadAction<string>) => {
            if (state.correctWord.includes(action.payload)) {
                console.log("correct answer")
                state.status = "correct"
            }
            if (!state.correctWord.includes(action.payload)) {
                console.log("wrong answer")
                state.status = "wrong"
            }
        },
        setNextWord: (state)  => {
            state.correctWord = worldList.words[Math.floor(Math.random() * worldList.words.length)]
        },
        setReset: (state) => {
            state.board = [...new Array(5).fill("")]
            state.currentIndex = 0
        }
    }
})

export const {
    setWordToBoard,
    incCurrentIndex,
    decCurrentIndex,
    setCurrentIndex,
    setNextWord,
    setReset,
    check,
} = wordsBoardSlice.actions
export default wordsBoardSlice.reducer
