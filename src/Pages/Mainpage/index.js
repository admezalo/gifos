import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import PanelSearchGifs from "../../Components/PanelSearchGifs";
import PanelGifs from "../../Components/PanelGifs";

import "./styles.css";

export default function Mainpage(){

    const { state } = useContext(AppContext);

    return(
        <div className={`container_main_page ${state.isDark === true ? "cmp_dark": "cmp_ligth"}`}>
            <div className={`container_main_page_border ${!(state.gifs.length > 0) && "cmpb_vport"}`}>
                    <PanelSearchGifs />
                    <PanelGifs />
            </div>
        </div>
    )
}