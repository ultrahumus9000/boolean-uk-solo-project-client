import create from "zustand";

let baseUrl = "http://localhost:4000";

const useStore = create((set, get) => ({
  currentUser: {},
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
  movies: [],
  fetchAllMovies: () => {
    fetch(`${baseUrl}/movies`)
      .then((resp) => resp.json())
      .then((moviesFromServer) => {
        set({ movies: moviesFromServer });
      });
  },
}));

export default useStore;
