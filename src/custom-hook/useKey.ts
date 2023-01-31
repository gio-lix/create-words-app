import {useEffect, useState} from "react";

export const useKey = () => {
    const [key, setKey] = useState("")

    const handleKey = (event: KeyboardEvent) => {
        if (event.keyCode >= 65 && event.keyCode <= 89) {
            setKey(prev => prev = event.key)
        }
    }
    useEffect(() => {
        window.addEventListener("keyup", handleKey)
        return () => {
            window.removeEventListener("keyup", handleKey)
        }
    },[])



    return {key}
}
