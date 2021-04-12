import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

import "./styles.css";

export default function ButtonLightDark(props){
    const { state, setState } = useContext(AppContext);

    const handleClick = () => {
        setState((prevState) => ({...prevState, isDark: !state.isDark}))
    }

    return(
        <div>
            <button className={state.isDark ? "btn btn_dark" : "btn btn_light"} onClick={handleClick}>
                {state.isDark ? "MODO LIGHT" : "MODO DARK"}
            </button>
        </div>
    )
}