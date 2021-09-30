import useStore from "../store";

import { useEffect } from "react";
import DeleteFilm from "./DeleteFilm";
import Loading from "./Loading";

export default function DeleteBoard() {
  const outdatedMovies = useStore((store) => store.outdatedMovies);
  const fetchOutDatedMovies = useStore((store) => store.fetchOutDatedMovies);

  useEffect(() => {
    fetchOutDatedMovies();
  }, []);

  // if (outdatedMovies.length === 0) return <Loading />;
  return (
    <>
      {/* {outdatedMovies.map((movie, index) => (
        <DeleteFilm key={index} movie={movie} />
      ))} */}
    </>
  );
}
