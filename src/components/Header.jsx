import { Link, useHistory } from "react-router-dom";
import movie from "../asset/movie.svg";
import user from "../asset/user.svg";
import useStore from "../store";

export default function Header() {
  const currentUser = useStore((store) => store.currentUser);
  const setCurrentUser = useStore((store) => store.setCurrentUser);
  const history = useHistory();

  function handleLogOut() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
    }).then(() => {
      setCurrentUser({});
      history.push("/");
    });
  }

  return (
    <header className={currentUser.role ? "header-with-user" : null}>
      <img className="header-img" src={movie} />
      <h1>
        Nos Cinema <span>Sheffield</span>
      </h1>
      <Link to="/login">
        <button className="user-icon">
          <img className="header-img" src={user} />
        </button>
      </Link>
      {currentUser.role && (
        <button className="log-out" onClick={handleLogOut}>
          Log Out
        </button>
      )}
    </header>
  );
}
