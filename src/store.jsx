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
  todayMovies: [],
  fetchTodayMovies(today) {
    fetch(`${baseUrl}/public`)
      .then((resp) => resp.json())
      .then((moviesFromServer) => {
        set({ todayMovies: moviesFromServer });
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
  lastestEvent: "",
  fetchLastEvent: () => {
    fetch(`${baseUrl}/events/lastest`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (!resp) return;
        const orginaldate = new Date(resp.date);
        const modifiedDate = orginaldate.setDate(orginaldate.getDate() + 1);
        const newDate = new Date(modifiedDate).toISOString();
        set({ lastestEvent: newDate });
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
  fail: false,
  toggleFail: () => {
    set({ fail: !get().fail });
  },

  updateUser: (data) => {
    return fetch(`http://localhost:4000/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((updatedUser) => {
        set({ currentUser: updatedUser });
      });
  },

  updateGuestPassword: ({ originPassword, newPassword }) => {
    return fetch(`http://localhost:4000/user/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ originPassword, newPassword }),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((updateResult) => {
        if (
          typeof updateResult === "string" &&
          updateResult.includes("successfully")
        ) {
          alert("you changed password successfully");
        } else {
          alert("orginal password doesnt match");
        }

        return true;
      });
  },
}));

export default useStore;
