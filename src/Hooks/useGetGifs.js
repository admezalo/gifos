import { useState } from "react";

export const useGetGifs = (query) => {
    const [gifsFetch, setGifs] = useState([]);
    const [isLoadingFetch, setIsLoading] = useState(false);
    const [hasErrorFetch, setHasError] = useState(false);

    const fecthGifs = (query) => {
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
                setGifs(response);
                setIsLoading(false);
            })
            .catch(err => {
                setHasError(true);
                setIsLoading(false);
            })
    }

    fecthGifs(query);

    return { gifsFetch, isLoadingFetch, hasErrorFetch };
}