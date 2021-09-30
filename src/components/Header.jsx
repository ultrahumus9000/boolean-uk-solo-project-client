import { Link, useHistory } from "react-router-dom";
import movie from "../asset/movie.svg";
import user from "../asset/user.svg";
import admin from "../asset/admin.svg";
import useStore from "../store";
const api = process.env.API_URL;
export default function Header() {
  const currentUser = useStore((store) => store.currentUser);
  const setCurrentUser = useStore((store) => store.setCurrentUser);
  const history = useHistory();

  function handleLogOut() {
    fetch(`${api}/logout`, {
      credentials: "include",
    }).then(() => {
      setCurrentUser({});
      history.push("/");
    });
  }

  function handleLoginOptions() {
    if (!currentUser.role) {
      history.push("/login");
    } else if (currentUser.role === "Guest") {
      history.push("/guest");
    } else {
      history.push("/admin");
    }
  }
  return (
    <header className={currentUser.role ? "header-with-user" : null}>
      <img
        className="header-img"
        alt=""
        src={movie}
        onClick={() => {
          history.push("/");
        }}
      />
      <h1>
        Nos Cinema <span>Sheffield</span>
      </h1>

      <button className="user-icon" onClick={handleLoginOptions}>
        <img
          className="header-img"
          alt=""
          src={currentUser.role === "Admin" ? admin : user}
        />
      </button>

      {currentUser.role && (
        <button className="log-out" onClick={handleLogOut}>
          Log Out
        </button>
      )}
    </header>
  );
}
