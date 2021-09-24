import { useState } from "react";
import { useEffect } from "react";
import useStore from "../store";

export default function AddNewEventForm() {
  const [createNewEvent, setCreateNewEvent] = useState(false);
  const today = new Date().toISOString();
  const modifiedToday = today.slice(0, 10);
  const movies = useStore((store) => store.movies);
  const fetchAllMovies = useStore((store) => store.fetchAllMovies);
  const cinema = useStore((store) => store.cinema);
  const getCinemaInfo = useStore((store) => store.getCinemaInfo);
  const [checkBoxQuantity, setCheckBoxQuantity] = useState(0);

  const initialAgenda = {
    quantity: cinema.capacity,
    showTime: ["11:00", "14:00", "17:00", "20:00"],
  };

  function toggleDisplayNewEventForm() {
    setCreateNewEvent(!createNewEvent);
  }
  useEffect(() => {
    fetchAllMovies();
    getCinemaInfo();
  }, []);

  function changeCheckBoxQuantity(e) {
    if (e.target.checked) {
      if (checkBoxQuantity >= cinema.screening) {
        e.target.checked = false;
        alert(`this cinema can only hold ${cinema.screening} films per day`);
      } else {
        setCheckBoxQuantity(checkBoxQuantity + 1);
      }
    } else {
      setCheckBoxQuantity(checkBoxQuantity - 1);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="agenda-section">
      <button className="create-event-btn" onClick={toggleDisplayNewEventForm}>
        Create New Event
      </button>

      {createNewEvent && (
        <form className="agenda-form" onSubmit={handleSubmit}>
          <input type="date" min={modifiedToday} />
          <ul className="movie-list">
            {movies.map((movie) => {
              return (
                <li className="checkbox-section">
                  <input
                    type="checkbox"
                    className="movie-checkbox"
                    id={movie.title}
                    value={movie.id}
                    onChange={changeCheckBoxQuantity}
                  />
                  <label className="movie-label" htmlFor={movie.title}>
                    {movie.title}
                  </label>
                </li>
              );
            })}
          </ul>
        </form>
      )}
    </section>
  );
}
