import React from "react";
import Loading from "../components/Loading";
import useStore from "../store";
import { useState } from "react";
import { useHistory } from "react-router";
import addmore from "../asset/addmore.svg";
import minus from "../asset/minus.svg";
import StripeCheckout from "react-stripe-checkout";
const api = process.env.REACT_APP_API_URL;

export default function PurchasePage() {
  const shoppingCartMovies = useStore((store) => store.shoppingCartMovies);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showtime, setShowtime] = useState("");
  let { movie, adult, children, total, policy } = shoppingCartMovies;

  const setShoppingCartMovies = useStore(
    (store) => store.setShoppingCartMovies
  );
  const history = useHistory();
  const addTransactions = useStore((store) => store.addTransactions);

  let totalQuantity = adult + children;

  const date = new Date().toISOString().slice(11, 13);

  const filteredMovieAgendas = movie.agendas.filter((agenda) => {
    return agenda.showTime.slice(11, 13) > date;
  });

  if (!shoppingCartMovies.movie) {
    return <Loading />;
  }

  if (filteredMovieAgendas.length === 0) {
    alert("not show today");
    history.push("/");
    return <Loading />;
  }
  let selectedAgenda = filteredMovieAgendas.find((agenda) =>
    agenda.showTime.includes(showtime)
  );

  const makePayment = (token) => {
    fetch(`${api}/charges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ token, total }),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("resp", resp);
        setShowReceipt(true);
      })
      .then(() => {
        setShowReceipt(false);
        history.push("/");
      });
  };

  function handleSubmit() {
    if (total === 0 || showtime === "") {
      return;
    }
    const newTransactionInfo = {
      policyId: policy.id,
      movieId: movie.id,
      quantity: totalQuantity,
      total,
      agendaId: selectedAgenda.id,
    };

    addTransactions(newTransactionInfo).then(() => {
      setShowtime("");
      setShowReceipt(true);
      setTimeout(() => {
        history.push("/");
        setShowReceipt(false);
      }, 5000);
    });
  }

  function handleChange(e) {
    const tagetValue = e.target.value;
    setShowtime(tagetValue);
  }

  function minusChilrenTicket() {
    if (children > 0) {
      if (totalQuantity <= 4) {
        const oldTotal =
          adult * policy.adultPrice + children * policy.childPrice;
        setShoppingCartMovies({
          ...shoppingCartMovies,
          children: children - 1,
          total: oldTotal - policy.childPrice,
        });
      } else {
        const oldTotal =
          (children - 1) * policy.childPrice + adult * policy.adultPrice;
        setShoppingCartMovies({
          ...shoppingCartMovies,
          children: children - 1,
          total: oldTotal * 0.9,
        });
      }
    } else {
      return;
    }
  }
  //add 4 more tickets and minus 4
  function addChilrenTicket() {
    if (children < 8) {
      if (totalQuantity >= 3) {
        const oldTotal =
          (children + 1) * policy.childPrice + adult * policy.adultPrice;

        setShoppingCartMovies({
          ...shoppingCartMovies,
          children: children + 1,
          total: oldTotal * 0.9,
        });
      } else {
        setShoppingCartMovies({
          ...shoppingCartMovies,
          children: children + 1,
          total: total + policy.childPrice,
        });
      }
    } else {
      return;
    }
  }

  function addAdultTicket() {
    if (adult < 5) {
      if (totalQuantity >= 3) {
        const oldTotal =
          (adult + 1) * policy.adultPrice + children * policy.childPrice;
        setShoppingCartMovies({
          ...shoppingCartMovies,
          adult: adult + 1,
          total: oldTotal * 0.9,
        });
      } else {
        setShoppingCartMovies({
          ...shoppingCartMovies,
          adult: adult + 1,
          total: total + policy.adultPrice,
        });
      }
    } else {
      return;
    }
  }

  function minusAdultTicket() {
    if (adult > 0) {
      if (totalQuantity <= 4) {
        const oldTotal =
          adult * policy.adultPrice + children * policy.childPrice;
        setShoppingCartMovies({
          ...shoppingCartMovies,
          adult: adult - 1,
          total: oldTotal - policy.adultPrice,
        });
      } else {
        const oldTotal =
          children * policy.childPrice + (adult - 1) * policy.adultPrice;
        setShoppingCartMovies({
          ...shoppingCartMovies,
          adult: adult - 1,
          total: oldTotal * 0.9,
        });
      }
    } else {
      return;
    }
  }

  return (
    <div>
      {showReceipt ? (
        <div className="receipt-section">
          <div className="modal">
            <p>Total £{total}</p>
            <p>Tickets {totalQuantity}</p>
            <p>ShowTime {selectedAgenda.showTime.slice(11, 16)}</p>
            <p>Screening {selectedAgenda.screening}</p>
            <p>Enjoy Your Movie,Reciept has sent to your email</p>
          </div>
        </div>
      ) : null}

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
                {filteredMovieAgendas.map((agenda, index) => (
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
            Buy any {policy.condition} tickets, get {policy.discount}
            %discount, apply automatically
          </p>
          <p className="price-p">
            <td className="price-tag">Adult £{policy.adultPrice} </td>
            <span className="add-minus-span">
              <button className="add-minus-btn">
                <img
                  className="minus-img"
                  src={minus}
                  alt=""
                  onClick={minusAdultTicket}
                />
              </button>
              {adult}
              <button className="add-minus-btn">
                <img
                  src={addmore}
                  className="add-img"
                  alt=""
                  onClick={addAdultTicket}
                />
              </button>
            </span>
          </p>
          <p className="price-p">
            <td className="price-tag">Child £{policy.childPrice} </td>
            <span className="add-minus-span">
              <button className="add-minus-btn">
                {" "}
                <img
                  className="minus-img"
                  src={minus}
                  alt=""
                  onClick={minusChilrenTicket}
                />
              </button>
              {children}
              <button className="add-minus-btn">
                <img
                  className="add-img"
                  src={addmore}
                  alt=""
                  onClick={addChilrenTicket}
                />
              </button>
            </span>
          </p>

          <p>Total £{total.toFixed(2)}</p>
          <p>
            <button className="buy-btn" onClick={handleSubmit}>
              PURCHASE
            </button>{" "}
            {totalQuantity && showtime ? (
              <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={makePayment}
                amount={total * 100}
                name="Buy Movie"
              >
                <button className="buy-btn green">Real Buy</button>
              </StripeCheckout>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}
