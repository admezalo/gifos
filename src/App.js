import React from "react";
import AppContextProvider from "./Context/AppContext";
import Mainpage from "./Pages/Mainpage";

import "./App.css";

export default function App(){

    return(
        <AppContextProvider>
                <Mainpage />
        </AppContextProvider>
    )
}