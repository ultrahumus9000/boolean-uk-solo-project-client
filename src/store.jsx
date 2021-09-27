import create from "zustand";

let baseUrl = "http://localhost:4000";

const useStore = create((set, get) => ({
  currentUser: {},
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
  movies: [],
  fetchAllMovies: () => {
    fetch(`${baseUrl}/movies`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((moviesFromServer) => {
        set({ movies: moviesFromServer });
      });
  },
  cinema: {},
  getCinemaInfo: () => {
    fetch(`${baseUrl}/cinema`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((cinema) => {
        set({ cinema });
      });
  },
  policy: {},
  getPolicy: () => {
    fetch(`${baseUrl}/policy`, { credentials: "include" })
      .then((resp) => resp.json())
      .then((policy) => {
        set({ policy });
      });
  },
  modifyPolicy: () => {},
  getValidateCurrToken: () => {
    fetch(`${baseUrl}/token`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((userToken) => {
        set({ currentUser: userToken });
      })
      .catch((error) => {
        console.error("doesnt have token", error);
      });
  },
  lastestEvent: {},
  fetchLastEvent: () => {
    fetch(`${baseUrl}/events/lastest`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        set({ lastestEvent: resp });
      });
  },
  waiting: false,
  toggleWaiting: () => {
    set({ waiting: !get().waiting });
  },
  succeed: false,
  toggleSucceed: () => {
    set({ succeed: !get().succeed });
  },
}));

export default useStore;
