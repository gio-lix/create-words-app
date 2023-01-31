import "./word.css"
import {useAppSelector} from "../../redux/store";
import {useCallback, useEffect, useState} from "react";

const Word = () => {
    const {correctWord} = useAppSelector((state) => state.board)

    const [word, setWord] = useState<string>("")

    const changeWords = useCallback((arrOfWords: string[], num: number): string => {
        let from = Math.floor(Math.random() * num);
        let to = Math.floor(Math.random() * num);

        [arrOfWords[from], arrOfWords[to]] = [arrOfWords[to], arrOfWords[from]]
        return arrOfWords.join("")
    }, [correctWord])

    useEffect(() => {
        let changedWords
        changedWords = changeWords([...correctWord], 5)
        if (changedWords === correctWord) {
            changedWords = changeWords([...correctWord], 5)
        }
        setWord(changedWords)
    }, [changeWords, correctWord])


    return (
        <div className="word">
            <h1> {word}</h1>
        </div>
    );
};

export default Word;
