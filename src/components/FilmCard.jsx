import useStore from "../store";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
export default function FilmCard({ movie }) {
  const currentUser = useStore((store) => store.currentUser);
  const policy = useStore((store) => store.policy);
  const setShoppingCartMovies = useStore(
    (store) => store.setShoppingCartMovies
  );
  const history = useHistory();
  const getPolicy = useStore((store) => store.getPolicy);

  useEffect(() => {
    getPolicy();
  }, []);

  // guest     User     @relation(fields: [guestId], references: [id], onDelete: Cascade)
  // guestId   Int
  // orderTime DateTime @default(now())
  // agenda    Agenda   @relation(fields: [agendaId], references: [id])
  // quantity  Int
  // total     Float
  // agendaId  Int
  // cinema    Cinema   @relation(fields: [cinemaId], references: [id])
  // cinemaId  Int
  // policy    Policy   @relation(fields: [policyId], references: [id])
  // policyId  Int

  // adultPrice   Float         @default(10.00)
  // childPrice   Float         @default(6.00)
  // discount     Int           @default(10)
  // condition    Int

  function direction() {
    if (currentUser.role === "Guest") {
      setShoppingCartMovies({
        movie,
        adult: 0,
        children: 0,
        total: 0,
        policy,
        screen: 0,
      });
      history.push("/purchase");
    } else {
      alert("you need login in first");
      history.push("/login");
    }
  }
  return (
    <div className="film-card">
      <img src={movie.poster} alt="" />
      <div className="movie-info">
        <p className={`${movie.genre} movie-features `}>{movie.genre}</p>
        <p className="movie-date">Release Date {movie.releaseDate}</p>
        <p className="movie-title">{movie.title}</p>
        <p className="movie-overview">Overview: {movie.overview}</p>
        <p>
          <span className="movie-duration"> {movie.duration}</span>{" "}
          <button className="buy-btn" onClick={direction}>
            {" "}
            Buy Ticket
          </button>
        </p>
        <section className="time-selection">
          <span className="span-show-time">SHOW TIME </span>
          <ul>
            {movie.agendas.map((agenda) => (
              <span className="show-time">{agenda.showTime.slice(11, 16)}</span>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
