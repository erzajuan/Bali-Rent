import React, { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [myState, setMyState] = useState([])

    return (
        <AppContext.Provider value={{myState, setMyState}}>
            {children}
        </AppContext.Provider>
    )
}