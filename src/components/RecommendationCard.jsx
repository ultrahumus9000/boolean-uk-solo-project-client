import useStore from "../store";

import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function RecommedationCard() {
  const newMovies = useStore((store) => store.newMovies);
  const fetchRecommendMovies = useStore((store) => store.fetchRecommendMovies);
  const [view, setView] = useState(false);

  function toggleView() {
    setView(!view);
  }

  useEffect(() => {
    fetchRecommendMovies();
  }, []);

  if (newMovies.length === 0) {
    return <Loading />;
  }
  return (
    <div>
      {newMovies.map((movie) => {
        return view ? (
          <div className="film-card recommend-card" onClick={toggleView}>
            <img src={movie.poster} alt="" />
            <div className="movie-info">
              <p>
                <span className={`${movie.genre} movie-features`}>
                  {movie.genre}
                </span>
                <span> {movie.duration}</span>{" "}
              </p>
              <p className="movie-date">Release Date {movie.releaseDate}</p>
              <p className="movie-title">{movie.title}</p>
              <p className="movie-overview">Overview: {movie.overview}</p>
            </div>
          </div>
        ) : (
          <div className="simple-film-card" onClick={toggleView}>
            <img src={movie.poster} alt="" />
            <p className="simple-movie-title">{movie.title}</p>
          </div>
        );
      })}
    </div>
  );
}
