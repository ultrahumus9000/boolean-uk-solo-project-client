import { useState } from "react";
import add from "../asset/add.svg";
import useStore from "../store";

export default function RecommandFilm({ movie }) {
  const [view, setView] = useState(false);
  const addToDatabase = useStore((store) => store.addToDatabase);
  function toggleView() {
    setView(!view);
  }

  return view ? (
    <div className="film-card recommend-card">
      <img
        className="big-film-img"
        src={movie.poster}
        alt=""
        onClick={toggleView}
      />
      <p className="surface">
        <img
          className="add"
          src={add}
          alt=""
          onClick={() => {
            addToDatabase(movie);
          }}
        />
        <span className="text-overlay">add to database</span>
      </p>
      <div className="movie-info">
        <p>
          <span className={`${movie.genre} movie-features`}>{movie.genre}</span>
          <span> {movie.duration}</span>{" "}
        </p>
        <p className="movie-date">Release Date {movie.releaseDate}</p>
        <p className="movie-title">{movie.title}</p>
        <p className="movie-overview">Overview: {movie.overview}</p>
      </div>
    </div>
  ) : (
    <div className="simple-film-card simple-recommend-card">
      <img
        className="film-img"
        src={movie.poster}
        alt=""
        onClick={toggleView}
      />
      <p className="surface">
        <img
          className="add"
          src={add}
          alt=""
          onClick={() => {
            addToDatabase(movie);
          }}
        />
        <span className="text-overlay">add to database</span>
      </p>
      <p className="simple-movie-title">{movie.title}</p>
    </div>
  );
}
