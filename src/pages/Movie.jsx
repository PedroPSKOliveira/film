import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import{
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill
} from "react-icons/bs";

import MovieCard from "../components/MovieCard.jsx";
import "./Movie.css";

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Movie = () => {

    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        setMovie(data)
    }

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`
            getMovie(movieURL)
    }
    , [])

    return (
        <div className={"moviePage"}>
            {movie && (
                <div className={"infos"}>
                    <MovieCard movie={movie} showLink={false}/>
                    <p className={"tagline"}>
                        {movie.tagline}
                    </p>
                    <div className={"info"}>
                        <h3>
                            <BsWallet2 /> Orçamento:
                        </h3>
                        <p>{movie.budget.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                    </div>
                    <div className={"info"}>
                        <h3>
                            <BsGraphUp /> Faturamento:
                        </h3>
                        <p>{movie.revenue.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                    </div>
                    <div className={"info"}>
                        <h3>
                            <BsHourglassSplit /> Duração:
                        </h3>
                        <p>{movie.runtime} minutos</p>
                    </div>
                    <div className={"description"}>
                        <h3>
                            <BsFillFileEarmarkTextFill /> Descrição:
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Movie