import {FaStar} from 'react-icons/fa'
import {Link} from "react-router-dom";

const imageURL = import.meta.env.VITE_IMG
const MovieCard = ({movie, showLink = true}) => {
    return (
        <div className={"movieCard"}>
            <img src={imageURL + movie.poster_path} alt={movie.title}/>
            <h2>
                {movie.title}
            </h2>
            <p>
                <FaStar/> {movie.vote_average}
            </p>
            {showLink && <Link to={`/movie/${movie.id}`} style={{cursor:'pointer'}}>Detalhes</Link>}
        </div>
    )
}

export default MovieCard