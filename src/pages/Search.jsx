import React, {useEffect, useRef, useState} from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

const Search = () => {
    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
    };

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
        getSearchedMovies(searchWithQueryURL);
    }, [query]);

    const scrollContainer = useRef(null);

    const scroll = (scrollOffset) => {
        scrollContainer.current.scrollLeft += scrollOffset;
    }

    return (
        <div className={"container"}>
            <h2 className={"title"}>
                Resultados para: <span className={"queryText"}>{query}</span>
            </h2>
            <div className="scrollButtons">
                <AiOutlineArrowLeft onClick={() => scroll(-500)} />
                <AiOutlineArrowRight onClick={() => scroll(500)} />
            </div>
            <div ref={scrollContainer} className={"moviesContainer"}>
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>
    );
};

export default Search;