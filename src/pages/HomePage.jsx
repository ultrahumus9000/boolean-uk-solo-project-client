import FilmCard from "../components/FilmCard";
import Loading from "../components/Loading";
import { useEffect } from "react";
import useStore from "../store";

export default function HomePage() {
  const todayMovies = useStore((store) => store.todayMovies);
  const fetchTodayMovies = useStore((store) => store.fetchTodayMovies);

  useEffect(() => {
    fetchTodayMovies();
  }, []);

  if (todayMovies.length === 0) {
    return <Loading />;
  }

  return (
    <div className="movie-container">
      {todayMovies.map((movie) => {
        return <FilmCard key={todayMovies.id} movie={movie} />;
      })}
    </div>
  );
}
