import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

import "./styles.css";

export default function PanelGifts(){

    const { state, fnNumberGifLoades } = useContext(AppContext);
    const [numberOfGifLoaded, setNumberOfGifLoaded] = useState(0);

    const handleOnLoad = () => {
        fnNumberGifLoades(numberOfGifLoaded);
        setNumberOfGifLoaded(numberOfGifLoaded+1);
        if(numberOfGifLoaded === 11){
            setNumberOfGifLoaded(0);
        }
    }

    const containerPanelGifs = (
        <div className={`container_panel_gifts ${state.isDark ? "cpg_dark" : "cpg_light"}`}>
            <div className={`container_gifs`}>
                {state.gifs.map(gif => {
                    return <iframe key={gif.id} src={gif.embed_url} title={gif.title} onLoad={handleOnLoad}></iframe>
                    //return <img key={gif.id} src={gif.images.downsized.url} alt="animated gif"/>
                })}
            </div>
        </div>
    )

    return(
        <>{(state.gifs.length > 0) && containerPanelGifs}</>
    )
}