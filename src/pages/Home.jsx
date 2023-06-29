import React, {useRef} from 'react'
import {useState, useEffect} from "react";
import MovieCard from "../components/MovieCard.jsx";
import './MoviesGrid.css';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {

    const [topMovies, setTopMovies] = useState([])
    const [exhibitionMovies, setExhibitionMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])

    const getTopRatedMovies = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        setTopMovies(data.results)
    }

    const getExhibitionMovies = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        setExhibitionMovies(data.results)
    }

    const getUpcomingMovies = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        setUpcomingMovies(data.results)
    }

    const getPopularMovies = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        setPopularMovies(data.results)
    }

    useEffect(() => {

        const topRatedMoviesURL = `${moviesURL}top_rated?${apiKey}&language=pt-BR&page=1`
        const exhibitionMoviesURL = `${moviesURL}now_playing?${apiKey}&language=pt-BR&page=1`
        const upcomingMoviesURL = `${moviesURL}upcoming?${apiKey}&language=pt-BR&page=1`
        const popularMoviesURL = `${moviesURL}popular?${apiKey}&language=pt-BR&page=1`


        getTopRatedMovies(topRatedMoviesURL)
        getExhibitionMovies(exhibitionMoviesURL)
        getUpcomingMovies(upcomingMoviesURL)
        getPopularMovies(popularMoviesURL)

    }
    , [])

    const scrollContainer1 = useRef(null);
    const scrollContainer2 = useRef(null);
    const scrollContainer3 = useRef(null);
    const scrollContainer4 = useRef(null);

    const scroll = (scrollOffset, scrollContainer) => {
        scrollContainer.current.scrollLeft += scrollOffset;
    }

    return (
        <>
            <div className={"container"}>
                <h2 className={"title"}>
                    Melhores filmes
                </h2>
                <div className="scrollButtons">
                    <AiOutlineArrowLeft onClick={() => scroll(-500, scrollContainer1)} />
                    <AiOutlineArrowRight onClick={() => scroll(500, scrollContainer1)} />
                </div>
                <div ref={scrollContainer1} className={"moviesContainer"}>
                    {topMovies.length === 0 && <p>Carregando...</p>}
                    {topMovies.length > 0 && topMovies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
                </div>
            </div>
            <div className={"container"}>
                <h2 className={"title"}>
                    Filmes populares
                </h2>
                <div className="scrollButtons">
                    <AiOutlineArrowLeft onClick={() => scroll(-500, scrollContainer2)} />
                    <AiOutlineArrowRight onClick={() => scroll(500, scrollContainer2)} />
                </div>
                <div ref={scrollContainer2} className={"moviesContainer"}>
                    {popularMovies.length === 0 && <p>Carregando...</p>}
                    {popularMovies.length > 0 && popularMovies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
                </div>
            </div>
            <div className={"container"}>
                <h2 className={"title"}>
                    Filmes em exibição
                </h2>
                <div className="scrollButtons">
                    <AiOutlineArrowLeft onClick={() => scroll(-500, scrollContainer3)} />
                    <AiOutlineArrowRight onClick={() => scroll(500, scrollContainer3)} />
                </div>
                <div ref={scrollContainer3} className={"moviesContainer"}>
                    {exhibitionMovies.length === 0 && <p>Carregando...</p>}
                    {exhibitionMovies.length > 0 && exhibitionMovies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
                </div>
            </div>
            <div className={"container"}>
                <h2 className={"title"}>
                    Filmes que estão por vir
                </h2>
                <div className="scrollButtons">
                    <AiOutlineArrowLeft onClick={() => scroll(-500, scrollContainer4)} />
                    <AiOutlineArrowRight onClick={() => scroll(500, scrollContainer4)} />
                </div>
                <div ref={scrollContainer4} className={"moviesContainer"}>
                    {upcomingMovies.length === 0 && <p>Carregando...</p>}
                    {upcomingMovies.length > 0 && upcomingMovies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
                </div>
            </div>
        </>
    )
}

export default Home