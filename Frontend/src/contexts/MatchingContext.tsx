import React, { createContext, useState } from 'react'

// Tạo Context
const MyContext = createContext()

export const MyProvider = ({ children }) => {
   // Dữ liệu cần chia sẻ qua Context
   const [value, setValue] = useState('Hello, World!')

   return <MyContext.Provider value={{ value, setValue }}>{children}</MyContext.Provider>
}

export default MyContext
