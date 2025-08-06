import { useState } from "react"

const useProfileEditMenu = () => {
       // ========== STATE MANAGEMENT ========== //
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return {
        isOpen,
        setIsOpen,
    }
}

export default useProfileEditMenu