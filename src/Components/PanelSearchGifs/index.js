import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import ButtonLightDark from "../ButtonLightDark";
import SvgClose from "../SvgClose";

import ImgLogoDesktopLighted from "./images/logo-desktop-lighted.svg";
import ImgLogoDesktopDark from "./images/logo-desktop-dark.svg";
import ImgIlustraHeader from "./images/ilustra-header.svg";
import ImgIconSearchDark from "./images/icon-search-dark.svg";
import ImgIconSearchLighted from "./images/icon-search-lighted.svg";

import "./styles.css";

export default function PanelSearchGifs(){

    const { state, fnSetQueryGif } = useContext(AppContext);
    const [query, setQuery] = useState("");
    const [autocomplete, setAutocomplete] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const STR_RESULT = "Resultados de la búsqueda";
    const STR_SEARCH = "Busca los GIFS! que te gusten";
    const STR_ERROR = "No se encontraron GIFS :`(";
    const STR_LOADING = ".....  cargando los GIFS!   ....."

    const handleChange = (event) => {
        setIsClicked(false);
        setQuery(event.target.value);
    }

    const handleOnsubmit = (event) => {
        event.preventDefault();
        setIsClicked(true);
    }

    const handleClick = () => {
        setQuery("");
        setIsClicked(false);
    }

    const handleClickAutocomplete = (event) => {
        setQuery(event.target.innerText);
        setIsClicked(true);
    }

    const cssDynamicForInput = () => {
        let result;
        if(state.isDark === true){
            if(autocomplete.length > 0) result = "input_dark boderAutocomplete_dark";
            else result = "input_dark";
        }
        else {
            if(autocomplete.length > 0) result = "input_light boderAutocomplete_light";
            else result = "input_light";
        }
        return result;
    }

    const cssDynamicForH6Text = () => {
        let result;
        if(state.isDark){
            if(state.gifs.length > 0){
                if(state.areThereGifsLoaded) result = "hx_dark";
                else result = "hx_dark green_loading";
            }
            else result = "hx_dark";
        }
        else {
            if(state.gifs.length > 0){
                if(state.areThereGifsLoaded) result = "hx_light";
                else result = "hx_light red_loading";
            }
            else result = "hx_light";
        }
        return result;
    }

    const cssDynamicForList = () => {
        let result;
        if(state.isDark){
            if(autocomplete.length > 0) result = "search_autocomplete boderList_Dark";
            else result = "search_autocomplete";
        }
        else{
            if(autocomplete.length > 0) result = "search_autocomplete boderList_Light";
            else result = "search_autocomplete";
        }
        return result;
    }

    const fnAutocompleteSearch = (q) => {
        const URL = `https://api.giphy.com/v1/gifs/search/tags?api_key=ye61aPhLiiIS871RxxNNlcrW3f98fC9z&q=${q}`;
        fetch(URL)
            .then(response => response.json())
            .then(response => setAutocomplete(response.data))
    }

    useEffect(() => {
        if(isClicked === false){
            //setAutocomplete([]);
            fnAutocompleteSearch(query);
        }
        if(isClicked === true){
            setAutocomplete([]);
            fnSetQueryGif(query);
        }
        if(query.length === 0){
            setAutocomplete([]);
            setQuery("");
            fnSetQueryGif(query);
        }
    }, [query, isClicked]);

    const searchAutocompleteList = (
        <div className={cssDynamicForList()}>
            {(autocomplete.length > 0) && autocomplete.map((item, index) => {
                return (
                    <li 
                        key={index} 
                        value={item.name} 
                        onClick={handleClickAutocomplete}
                        className={state.isDark === true ? "li_dark": "li_light"}>
                            <span>
                                <img src={state.isDark === true ? ImgIconSearchDark : ImgIconSearchLighted}/>
                            </span>
                            {item.name}
                    </li>
                )
            })}
        </div>
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
                        className={cssDynamicForInput()}
                        value={query}
                        placeholder="busca gifs"/>
                    {state.isDark ? (
                        <div 
                            className={`btn_search_dark ${(query.length > 0 && autocomplete.length > 0) ? "btn_search_no_border" : "btn_search_border"}`}
                            onClick={handleClick}>
                            {query.length > 0 ? (
                                    <SvgClose fill="white" width="20px"/>
                                ) : (
                                    <img src={ImgIconSearchDark} alt="search"/>
                                )}
                        </div>
                        ) : (
                        <div 
                            className={`btn_search_light ${(query.length > 0 && autocomplete.length > 0) ? "btn_search_no_border" : "btn_search_border"}`} 
                            onClick={handleClick}>
                            {query.length > 0 ? (
                                <SvgClose fill="white" width="20px"/>
                            ) : (
                                <img src={ImgIconSearchDark} alt="search"/>
                            )}
                        </div>
                    )}
                </div>
                {searchAutocompleteList}
            </form>
            {autocomplete.length === 0 && (
                <h6 className={cssDynamicForH6Text()}>
                    {state.hasError ? STR_ERROR : (state.gifs.length > 0 ? (state.areThereGifsLoaded ? STR_RESULT : STR_LOADING) : STR_SEARCH)}
                </h6>
            )}
        </div>
    )
}