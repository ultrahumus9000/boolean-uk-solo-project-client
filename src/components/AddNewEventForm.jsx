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
const today = new Date().toISOString();
const modifiedToday = today.slice(0, 10);
const initialEventForm = {
  date: modifiedToday,
  cinemaId: 1,
  movies: [],
  repeat: "none",
};
export default function AddNewEventForm() {
  const [createNewEvent, setCreateNewEvent] = useState(false);
  const [repeatSchedule, setRepeatSchedule] = useState(false);

  const movies = useStore((store) => store.movies);
  const fetchAllMovies = useStore((store) => store.fetchAllMovies);
  const cinema = useStore((store) => store.cinema);
  const getCinemaInfo = useStore((store) => store.getCinemaInfo);
  const [checkBoxQuantity, setCheckBoxQuantity] = useState(0);
  const [eventForm, setEventForm] = useState(initialEventForm);
  const lastestEvent = useStore((store) => store.lastestEvent);
  const fetchLastEvent = useStore((store) => store.fetchLastEvent);

  console.log("eventForm", eventForm);
  const initialAgenda = {
    quantity: cinema.capacity,
    showTime: ["11:00", "14:00", "17:00", "20:00"],
    screening: cinema.screening,
  };

  useEffect(() => {
    fetchAllMovies();
    getCinemaInfo();
    fetchLastEvent();
  }, []);

  function postNewEvent(form) {
    return fetch(`http://localhost:4000/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.includes("fail")) {
          alert("this event has been created, do you want to modify instead?");
        } else {
          alert("you have created successfully");
        }
      });
  }

  function toggleDisplayNewEventForm() {
    setCreateNewEvent(!createNewEvent);
    setRepeatSchedule(false);
    setEventForm(initialEventForm);
  }
  function toggleRepeatSchedule() {
    setRepeatSchedule(!repeatSchedule);
    setCreateNewEvent(false);
    setEventForm(initialEventForm);
  }

  function handleInputChange(e) {
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
    const modifiedDate = new Date(modifiedFormData.date).toISOString();
    modifiedFormData = { ...modifiedFormData, date: modifiedDate };

    postNewEvent(modifiedFormData).then(() => {
      setEventForm(initialEventForm);
      setCreateNewEvent(false);
      setRepeatSchedule(false);
      setCheckBoxQuantity(0);
    });
  }

  return (
    <section className="agenda-section">
      <div className="button-div">
        {repeatSchedule ? (
          <button className="cancel-btn" onClick={toggleRepeatSchedule}>
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
              // min={modifiedToday}
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

          <p>Repeat Event From {lastestEvent.date.slice(0, 10)}</p>

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
