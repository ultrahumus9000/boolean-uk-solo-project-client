import { useEffect } from "react";
import FilmCard from "../components/FilmCard";
import Loading from "../components/Loading";
import useStore from "../store";

export default function HomePage() {
  const movies = useStore((store) => store.movies);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <div className="movie-container">
      {movies.map((movie) => {
        // return <FilmCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
}
