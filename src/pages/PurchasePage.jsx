import Loading from "../components/Loading";
import useStore from "../store";

export default function PurchasePage() {
  const shoppingCartMovies = useStore((store) => store.shoppingCartMovies);
  const { movie, adult, children, total, policy } = shoppingCartMovies;

  console.log("line 8", movie, adult, children, total, policy);
  if (!shoppingCartMovies.movie) {
    return <Loading />;
  }
  return (
    <div>
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
                  <label htmlFor="">
                    <input type="radio" />
                    {agenda.showTime.slice(11, 16)}
                  </label>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="shopping-cart"></div>
    </div>
  );
}
