import Loading from "../components/Loading";
import useStore from "../store";
import { useState } from "react";
import addmore from "../asset/addmore.svg";
import minus from "../asset/minus.svg";

export default function PurchasePage() {
  const shoppingCartMovies = useStore((store) => store.shoppingCartMovies);
  const [showtime, setShowtime] = useState("");
  const { movie, adult, children, total, policy } = shoppingCartMovies;

  console.log("line 8", movie, adult, children, total, policy);
  if (!shoppingCartMovies.movie) {
    return <Loading />;
  }

  function handleChange(e) {
    const tagetValue = e.target.value;
    setShowtime(tagetValue);
  }

  return (
    <div className="purchase-section">
      <div className="film-card">
        <img src={movie.poster} alt="" />
        <div className="movie-info">
          <p className={`${movie.genre} movie-features `}>{movie.genre}</p>
          <p className="movie-date">Release Date {movie.releaseDate}</p>
          <p className="movie-title">{movie.title}</p>
          <p className="movie-overview">Overview: {movie.overview}</p>
          <p>
            <span className="movie-duration"> {movie.duration}</span>{" "}
          </p>
          <section className="time-selection">
            <span className="span-show-time time-option-label">
              Select Show Time
            </span>

            <ul className="time-section">
              {movie.agendas.map((agenda, index) => (
                <li key={index} className="time-list">
                  <label
                    className={`time-list-label ${
                      showtime === agenda.showTime
                        ? "time-list-label-checked"
                        : null
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="time-list-input"
                      onClick={handleChange}
                      value={agenda.showTime}
                    />
                    {agenda.showTime.slice(11, 16)}
                  </label>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="shopping-cart">
        <p>
          Buy any {policy.condition} tickets, get {policy.discount}%discount,
          apply automatically
        </p>
        <p className="price-p">
          <td className="price-tag">Adult £{policy.adultPrice} </td>
          <span className="add-minus-span">
            <button className="add-minus-btn">
              <img className="minus-img" src={minus} alt="" />
            </button>
            {adult}
            <button className="add-minus-btn">
              <img src={addmore} className="add-img" alt="" />
            </button>
          </span>
        </p>
        <p className="price-p">
          <td className="price-tag">Child £{policy.childPrice} </td>
          <span className="add-minus-span">
            <button className="add-minus-btn">
              {" "}
              <img className="minus-img" src={minus} alt="" />
            </button>
            {children}
            <button className="add-minus-btn">
              <img className="add-img" src={addmore} alt="" />
            </button>
          </span>
        </p>

        <p>Total £{total}</p>
        <p>
          {" "}
          <button className="buy-btn">PURCHASE</button>{" "}
        </p>
      </div>
    </div>
  );
}
