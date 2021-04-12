import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import ButtonLightDark from "../ButtonLightDark";
import SvgClose from "../SvgClose";

import ImgLogoDesktopLighted from "./images/logo-desktop-lighted.svg";
import ImgLogoDesktopDark from "./images/logo-desktop-dark.svg";
import ImgIlustraHeader from "./images/ilustra-header.svg";
import ImgIconSearchDark from "./images/icon-search-dark.svg";

import "./styles.css";

export default function PanelSearchGifs(){

    const { state, fnSetQueryGif } = useContext(AppContext);
    const [query, setQuery] = useState("");
    const [autocomplete, setAutocomplete] = useState([]);
    const STR_RESULT = "Resultados de la búsqueda";
    const STR_SEARCH = "Busca los GIFS! que te gusten";
    const STR_ERROR = "No se encontraron GIFS :`(";
    const STR_LOADING = "... cargando los GIFS! ..."

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleOnsubmit = (event) => {
        event.preventDefault();
        fnSetQueryGif(query);
    }

    const handleClick = () => {
        setQuery("");
    }

    const fnAutocompleteSearch = (q) => {
        const URL = `https://api.giphy.com/v1/gifs/search/tags?api_key=ye61aPhLiiIS871RxxNNlcrW3f98fC9z&q=${q}`;
        fetch(URL)
            .then(response => response.json())
            .then(response => setAutocomplete(response.data))
    }

    useEffect(() => {
        fnAutocompleteSearch(query);
    }, [query]);

    useEffect(() => {
        if(query.length === 0){
            fnSetQueryGif(query);
        }
    }, [query]);

    const searchDataList = (
        <datalist id="search_gifs">
            {(autocomplete.length > 0) && autocomplete.map((item, index) => {
                return <option key={index} value={item.name}></option>;
            })}
        </datalist>
    )

    const imgLogo = state.isDark === true ? (
        <img src={ImgLogoDesktopDark} alt="logo lighted" width="65px"/>
    ) : (
        <img src={ImgLogoDesktopLighted} alt="logo lighted" width="65px"/>
    )
    
    return(
        <div className={`container_panel_search_gifs ${state.isDark === true ? "cpsg_dark": "cpsg_light"}`}>
            <header>
                <div>
                    <div className="img_logo_size">
                        {imgLogo}
                    </div>
                    <ButtonLightDark />
                </div>
            </header>
            <h4 className={state.isDark === true ? "hx_dark": "hx_light"}>
                ¡Inspirate y busca los mejores <span>GIFS!</span>
            </h4>
            <form onSubmit={handleOnsubmit}>
                <img src={ImgIlustraHeader} alt="logo principal"/>
                <div>
                    <input 
                        onChange={handleChange}
                        onSubmit={(event) => handleOnsubmit(event, "input")}
                        list="search_gifs"
                        className={state.isDark === true ? "input_dark": "input_light"}
                        value={query}
                        placeholder="busca gifs"/>
                {state.isDark ? (
                    <div className="btn_search_dark" onClick={handleClick}>
                        {query.length > 0 ? (
                                <SvgClose fill="white" width="20px"/>
                            ) : (
                                <img src={ImgIconSearchDark} alt="search"/>
                            )}
                    </div>
                    ) : (
                    <div className="btn_search_light" onClick={handleClick}>
                        {query.length > 0 ? (
                            <SvgClose fill="white" width="20px"/>
                        ) : (
                            <img src={ImgIconSearchDark} alt="search"/>
                        )}
                    </div>
                )}
                </div>
                {searchDataList}
            </form>
            <h6 className={state.isDark === true ? "hx_dark": "hx_light"}>
                {state.hasError ? STR_ERROR : (state.gifs.length > 0 ? (state.areThereGifsLoaded ? STR_RESULT : STR_LOADING) : STR_SEARCH)}
            </h6>
        </div>
    )
}