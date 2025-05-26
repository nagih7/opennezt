import { useState } from "react"

const useProjectBox = () => {
    const [errorBG, setErrorBG] = useState<boolean>(false)

    return {
        errorBG,
        setErrorBG
    }
}

export default useProjectBox