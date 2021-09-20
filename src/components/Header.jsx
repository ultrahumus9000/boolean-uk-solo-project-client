import { Link } from "react-router-dom";
import movie from "../asset/movie.svg";
import user from "../asset/user.svg";

export default function Header() {
  return (
    <header>
      <img className="header-img" src={movie} />
      <h1>
        Nos Cinema <span>Sheffield</span>
      </h1>
      <Link to="/login">
        <button>
          <img className="header-img" src={user} />
        </button>
      </Link>
    </header>
  );
}
