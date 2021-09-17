import create from "zustand";

let baseUrl = "http://localhost:4000";

const useStore = create((set, get) => {
  movies: [];
  fetchAllMovies: () => {};
});
