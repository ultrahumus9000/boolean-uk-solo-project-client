import { useState } from "react";
import { useEffect } from "react";
import useStore from "../store";
import Waiting from "./Waiting";

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
const today = new Date().toISOString();
const modifiedToday = today.slice(0, 10);
const initialEventForm = {
  date: modifiedToday,
  cinemaId: 1,
  movies: [],
  repeat: "none",
};
const api = process.env.REACT_APP_API_URL;
export default function AddNewEventForm() {
  const [createNewEvent, setCreateNewEvent] = useState(false);
  const movies = useStore((store) => store.movies);
  const fetchAllMovies = useStore((store) => store.fetchAllMovies);
  const cinema = useStore((store) => store.cinema);
  const getCinemaInfo = useStore((store) => store.getCinemaInfo);
  const [checkBoxQuantity, setCheckBoxQuantity] = useState(0);
  const [eventForm, setEventForm] = useState(initialEventForm);
  const waiting = useStore((store) => store.waiting);
  const toggleFail = useStore((store) => store.toggleFail);
  const displayWaiting = useStore((store) => store.displayWaiting);
  const doNotDisplayWaiting = useStore((store) => store.doNotDisplayWaiting);
  const toggleSucceed = useStore((store) => store.toggleSucceed);
  const lastestEvent = useStore((store) => store.lastestEvent);
  const fetchLastEvent = useStore((store) => store.fetchLastEvent);
  let modifiedLastDate = lastestEvent.slice(0, 10);

  const initialAgenda = {
    quantity: cinema.capacity,
    showTime: ["11:00", "14:00", "17:00", "20:00"],
    screening: cinema.screening,
  };
  console.log("waiting", waiting);
  useEffect(() => {
    fetchAllMovies();
    getCinemaInfo();
    fetchLastEvent();
  }, []);

  function postNewEvent(form) {
    return fetch(`${api}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (typeof resp === "string" && resp.includes("succeed")) {
          toggleSucceed();
          fetchLastEvent();
          setTimeout(() => {
            doNotDisplayWaiting();
          }, 1000);
        } else {
          toggleFail();
          setTimeout(() => {
            doNotDisplayWaiting();
          }, 1000);
        }
      });
  }

  function toggleDisplayNewEventForm() {
    setCreateNewEvent(!createNewEvent);
    setCheckBoxQuantity(0);
    setEventForm(initialEventForm);
  }

  function handleInputChange(e) {
    if (eventForm.movies.length < 5) {
      alert("you need to arrange 5 films on that day");
      return;
    }

    setEventForm({ ...eventForm, date: e.target.value });
  }

  function changeCheckBoxQuantity(e) {
    if (e.target.checked) {
      if (checkBoxQuantity >= cinema.screening) {
        e.target.checked = false;
        alert(`this cinema can only hold ${cinema.screening} films per day`);
      } else {
        setCheckBoxQuantity(checkBoxQuantity + 1);

        setEventForm({
          ...eventForm,
          movies: [...eventForm.movies, Number(e.target.value)],
        });
      }
    } else {
      setCheckBoxQuantity(checkBoxQuantity - 1);
      const updateValues = eventForm.movies.filter(
        (movieId) => movieId !== Number(e.target.value)
      );
      setEventForm({
        ...eventForm,
        movies: updateValues,
      });
    }
  }

  function handleRadioInput(e) {
    setEventForm({
      ...eventForm,
      repeat: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    let modifiedFormData = { ...eventForm, ...initialAgenda };

    displayWaiting();

    postNewEvent(modifiedFormData).then(() => {
      setEventForm(initialEventForm);
      setCreateNewEvent(false);
      setCheckBoxQuantity(0);
    });
  }

  return (
    <section className="agenda-section">
      {waiting && (
        <div className="waiting-div">
          <Waiting />
        </div>
      )}

      <div className="button-div">
        {createNewEvent ? (
          <button className="cancel-btn" onClick={toggleDisplayNewEventForm}>
            Cancel
          </button>
        ) : (
          <button
            className="create-event-btn"
            onClick={toggleDisplayNewEventForm}
          >
            Create New Event
          </button>
        )}
      </div>

      {createNewEvent && (
        <form className="agenda-form" onSubmit={handleSubmit}>
          <label htmlFor="">
            Select Event Date:
            <input
              type="date"
              min={lastestEvent ? modifiedLastDate : modifiedToday}
              className="date-input"
              name="date"
              value={eventForm.date}
              onChange={handleInputChange}
            />
          </label>

          <ul className="movie-list">
            {movies.map((movie, index) => {
              return (
                <li className="checkbox-section" key={index}>
                  <input
                    type="checkbox"
                    className="movie-checkbox"
                    id={movie.title}
                    value={movie.id}
                    name="movieName"
                    onChange={changeCheckBoxQuantity}
                  />
                  <label className="movie-label" htmlFor={movie.title}>
                    {movie.title}
                  </label>
                </li>
              );
            })}
          </ul>
          {lastestEvent && <p>Repeat Event From {modifiedLastDate}</p>}

          <label htmlFor="" className="radio-label">
            <input
              type="radio"
              value="one"
              name="repeatRadio"
              onChange={handleRadioInput}
            />{" "}
            One Week
          </label>
          <label htmlFor="" className="radio-label">
            <input
              type="radio"
              value="two"
              name="repeatRadio"
              onChange={handleRadioInput}
            />{" "}
            Two Week
          </label>
          <label htmlFor="" className="radio-label">
            <input
              type="radio"
              value="whole"
              name="repeatRadio"
              onChange={handleRadioInput}
            />{" "}
            One Month
          </label>
          <label htmlFor="" className="radio-label">
            <input
              type="radio"
              value="none"
              name="repeatRadio"
              onChange={handleRadioInput}
            />{" "}
            No Need
          </label>

          <button className="confirm-btn" type="submit">
            Confirm
          </button>
        </form>
      )}
    </section>
  );
}
