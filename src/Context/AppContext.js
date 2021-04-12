import React, { useEffect, useState } from "react";

export const AppContext = React.createContext({});

const initialState = {
    gifs: [],
    isDark: false,
    isLoading: false,
    hasError: false,
    areThereGifsLoaded: false
}

export default function AppContextProvider(props){

    const [state, setState] = useState(initialState);
    const [isDark, setDark] = useState(initialState.isDark);
    const [gifs, setGifs] = useState(initialState.gifs);
    const [isLoading, setIsLoading] = useState(initialState.isLoading);
    const [hasError, setHasError] = useState(initialState.hasError);
    const [query, setQuery] = useState("");
    const [numberGifsLoaded, setNumberGifsLoades] = useState(0);

    const fnSearchGifs = (query) => {
        const URL = `https://api.giphy.com/v1/gifs/search?api_key=ye61aPhLiiIS871RxxNNlcrW3f98fC9z&q=${query}&limit=12`;
        setIsLoading(true);
        fetch(URL)
            .then(response => {
                if(!response.ok){
                    setHasError(true);
                    setIsLoading(false);
                }
                return response.json();
            })
            .then(response => {
                if(query.length === 0){
                    setHasError(false);
                    setIsLoading(false);
                    setGifs([]);
                }
                else if(query.length > 0 && response.data.length === 0){
                    setHasError(true);
                    setIsLoading(false);
                }
                else {
                    setGifs(response.data);
                    setIsLoading(false);
                    setState((prevState) => ({...prevState, areThereGifsLoaded: false}));
                }
            })
            .catch(err => {
                setHasError(true);
                setIsLoading(false);
            })
    }

    const fnNumberGifLoades = (number) => {
        setNumberGifsLoades(number);
    }
    
    const fnSetQueryGif = (q) => {
        setQuery(q);
    }

    const fnIsDark = () => {
        setDark(!isDark);
    }

    useEffect(() => {
        setState((prevState) => ({...prevState, isLoading}));
    }, [isLoading]);
    
    useEffect(() => {
        setState((prevState) => ({...prevState, hasError}));
    }, [hasError]);

    useEffect(() => {
        setState((prevState) => ({...prevState, gifs}));
    }, [gifs]);

    useEffect(() => {
        setState((prevState) => ({...prevState, isDark}));
    }, [isDark]);

    useEffect(() => {
        fnSearchGifs(query);
    }, [query]);

    useEffect(() => {
        if(numberGifsLoaded === 11){
            setState((prevState) => ({...prevState, areThereGifsLoaded: true}));
            setNumberGifsLoades(0);
        }       
    }, [numberGifsLoaded]);

    return(
        <AppContext.Provider value={{state, setState, fnIsDark, fnSetQueryGif, fnNumberGifLoades}}>
            {props.children}
        </AppContext.Provider>
    )
}