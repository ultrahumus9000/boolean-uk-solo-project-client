import useStore from "../store";

import { useEffect, useState } from "react";
import Loading from "./Loading";
import RecommandFilm from "./RecommandFilm";

export default function RecommedationCard() {
  const newMovies = useStore((store) => store.newMovies);
  const fetchRecommendMovies = useStore((store) => store.fetchRecommendMovies);

  useEffect(() => {
    fetchRecommendMovies();
  }, []);

  if (newMovies.length === 0) {
    return <Loading />;
  }
  return (
    <div>
      {newMovies.map((movie) => {
        return <RecommandFilm movie={movie} />;
      })}
    </div>
  );
}
