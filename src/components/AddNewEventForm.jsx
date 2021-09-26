import { useState } from "react";
import { useEffect } from "react";
import useStore from "../store";

// id           Int           @id @default(autoincrement())
// movie        Movie         @relation(fields: [movieId], references: [id], onDelete: Cascade)
// movieId      Int
// screening    Int
// showTime     DateTime      @db.Time
// event        Event         @relation(fields: [eventId], references: [id])
// eventId      Int
// transactions Transaction[]
// quantity     Int

// id       Int      @id @default(autoincrement())
// date     DateTime @unique @db.Date
// agendas  Agenda[]
// cinema   Cinema   @relation(fields: [cinemaId], references: [id])
// cinemaId Int

export default function AddNewEventForm() {
  const [createNewEvent, setCreateNewEvent] = useState(false);
  const [repeatSchedule, setRepeatSchedule] = useState(false);
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
    screening: cinema.screening,
  };

  useEffect(() => {
    fetchAllMovies();
    getCinemaInfo();
  }, []);

  function toggleDisplayNewEventForm() {
    setCreateNewEvent(!createNewEvent);
  }
  function toggleRepeatSchedule() {
    setRepeatSchedule(!repeatSchedule);
  }

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

  function handleRepeatSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="agenda-section">
      <div className="button-div">
        <button
          className="create-event-btn"
          onClick={toggleDisplayNewEventForm}
        >
          Create New Event
        </button>
        <button className="create-event-btn" onClick={toggleRepeatSchedule}>
          Repeat Schedule
        </button>
      </div>

      {createNewEvent && (
        <form className="agenda-form" onSubmit={handleSubmit}>
          <label htmlFor="">
            Select Event Date:
            <input type="date" min={modifiedToday} />
          </label>

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

      {repeatSchedule && (
        <form className="repeat-form" onSubmit={handleRepeatSubmit}>
          <select name="" id="">
            <option value="one">One Week</option>
            <option value="two">Two Week</option>
            <option value="whole">One Month</option>
          </select>
          <button>Confirm</button>
          <button onClick={toggleRepeatSchedule}>Cancel</button>
        </form>
      )}
    </section>
  );
}
