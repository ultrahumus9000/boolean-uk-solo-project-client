import create from "zustand";

let baseUrl = process.env.API_URL;

const generalGere = ["Adventure", "Fantasy", "Romance", "Comedy", "Tradgedy"];
const showTime = ["90 mins", "100 mins", "120 mins"];

const useStore = create((set, get) => ({
  currentUser: {},
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
  movies: [],
  fetchAllMovies: () => {
    return fetch(`${baseUrl}/movies`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((moviesFromServer) => {
        set({ movies: moviesFromServer });
        return moviesFromServer;
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
    return fetch(`${baseUrl}/user`, {
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
    return fetch(`${baseUrl}/user/password`, {
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
  tempMovies: [],
  newMovies: [],
  fetchRecommendMovies: () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d214ecb9bda367118385bcbdb9cd776f&language=en-US&page=2`
    )
      .then((resp) => resp.json())
      .then((newFilms) => {
        const fetchAllMovies = get().fetchAllMovies;
        fetchAllMovies().then((databaseMovies) => {
          const modifiedMovies = newFilms.results.map((movie) => {
            const newMovie = {
              releaseDate: movie.release_date,
              genre:
                generalGere[Math.floor(Math.random() * generalGere.length)],
              title: movie.title,
              overview: movie.overview,
              poster: `https://image.tmdb.org/t/p/w342${movie.backdrop_path}`,
              duration: showTime[Math.floor(Math.random() * showTime.length)],
            };
            return newMovie;
          });

          const databaseMovieTitles = databaseMovies.map(
            (movie) => movie.title
          );
          const newMoviesTitles = modifiedMovies.map((movie) => movie.title);

          let difference = newMoviesTitles.filter(
            (title) => !databaseMovieTitles.includes(title)
          );

          if (difference.length >= 3) {
            difference = difference.slice(0, 3);
          }

          const newMovies = modifiedMovies.filter((movie) =>
            difference.includes(movie.title)
          );

          console.log("newMovie", newMovies);

          set({ newMovies });
        });
      });
  },
  outdatedMovies: [],
  fetchOutDatedMovies: () => {
    fetch(`${baseUrl}/movies`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((movies) => {
        if (movies.length > 20) {
          const outDatedFilmsNumber = movies.length - 20;

          const outdatedMovies = movies.slice(0, outDatedFilmsNumber);

          set({ outdatedMovies });
        }
      });
  },
  addToDatabase: (data) => {
    fetch(`${baseUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then(() => {
        const fetchAllMovies = get().fetchAllMovies;
        fetchAllMovies();
      })
      .then(() => {
        const fetchOutDatedMovies = get().fetchOutDatedMovies;
        fetchOutDatedMovies();
      })
      .then(() => {
        alert("you added film into database successfully");
        const fetchRecommendMovies = get().fetchRecommendMovies;
        fetchRecommendMovies();
      });
  },

  deleteToDatabase: (id) => {
    fetch(`${baseUrl}/movies/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        const fetchAllMovies = get().fetchAllMovies;
        fetchAllMovies();
      })
      .then(() => {
        const fetchOutDatedMovies = get().fetchOutDatedMovies;
        fetchOutDatedMovies();
      });
  },
  shoppingCartMovies: {},
  setShoppingCartMovies: (data) => {
    set({ shoppingCartMovies: data });
  },
  addTransactions: (data) => {
    return fetch(`${baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((resp) => resp.json());
  },
  revenue: 0,
  getRevenue: () => {
    return fetch(`${baseUrl}/transactions/revenue`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((revenue) => {
        set({ revenue });
      });
  },
}));

export default useStore;
