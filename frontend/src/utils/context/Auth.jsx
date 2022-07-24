import { createContext } from "react"
import { useState } from "react"

export default React.createContext({
    isAuthenticated: false
})

//    const [isAuthenticated, setIsAuthenticated] = useState(false)
//    const toggleUserConnected = () => {
//     setIsAuthenticated(isAuthenticated === false ? true : false)
//    }

//    return (
//     <UserContext.Provider value={{isAuthenticated, toggleUserConnected }} >
//         {children}
//     </UserContext.Provider>
//    )