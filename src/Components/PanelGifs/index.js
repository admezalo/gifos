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
                    return (
                        <div className="img_gif" key={gif.id}>
                            <img 
                                key={gif.id} 
                                src={gif.images.downsized.url} 
                                alt="animated gif" 
                                onLoad={handleOnLoad} />
                        </div>
                    )
                })}
            </div>
        </div>
    )

    return(
        <>{(state.gifs.length > 0) && containerPanelGifs}</>
    )
}