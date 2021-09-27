import { useState } from "react";

export default function SimpleFilmCard({ movie }) {
  const [view, setView] = useState(false);

  function toggleView() {
    setView(!view);
  }
  return (
    <div>
      {view ? (
        <div className="film-card" onClick={toggleView}>
          <img src={movie.poster} alt="" />
          <div className="movie-info">
            <p className={`${movie.genre} movie-features `}>{movie.genre}</p>
            <p className="movie-date">Release Date {movie.releaseDate}</p>
            <p className="movie-title">{movie.title}</p>
            <p className="movie-overview">Overview: {movie.overview}</p>
            <p>
              <span className="movie-duration"> {movie.duration}</span>{" "}
              <span className="span-show-time">SHOW TIME </span>
            </p>
            <section className="time-selection">
              <ul>
                {movie.agendas.map((agenda) => (
                  <span className="show-time">
                    {agenda.showTime.slice(11, 16)}
                  </span>
                ))}
              </ul>
            </section>
          </div>
        </div>
      ) : (
        <div className="simple-film-card" onClick={toggleView}>
          <img src={movie.poster} alt="" />
          <p className="simple-movie-title">{movie.title}</p>
        </div>
      )}
    </div>
  );
}
