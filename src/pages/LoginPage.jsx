import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import eyeclose from "../asset/eyeclose.svg";
import eyeopen from "../asset/eyeopen.svg";
import useStore from "../store";
const api = process.env.API_URL;

export default function LoginPage() {
  const [seePassword, setSeePassword] = useState(false);

  const setCurrentUser = useStore((store) => store.setCurrentUser);
  const history = useHistory();

  function loginUser(userCreds) {
    return fetch(`${api}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userFromServer) => {
        if (userFromServer.role === "Admin") {
          setCurrentUser(userFromServer);
          history.push("/admin");
        } else if (userFromServer.role === "Guest") {
          setCurrentUser(userFromServer);
          history.push("/");
        } else {
          alert("User Info doesnt match");
        }
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const userInfo = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    loginUser(userInfo).then(() => {
      e.target.reset();
    });
  }

  function togglePassword() {
    setSeePassword(!seePassword);
  }

  return (
    <div className="login-div">
      <h2>Log In to Nos Cinema</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" />
        <input
          id="password"
          name="password"
          type={`${seePassword ? "text" : "password"}`}
          placeholder="Password"
        />
        <input className="input-submit" type="submit" value="SUBMIT" />
        {seePassword ? (
          <button className="button-eye" type="button" onClick={togglePassword}>
            <img className="eye" src={eyeopen} />
          </button>
        ) : (
          <button className="button-eye" type="button" onClick={togglePassword}>
            <img className="eye" src={eyeclose} />
          </button>
        )}
        <p>
          Dont have a account? Register{" "}
          <Link to="/signup">
            <button className="sign-up-button" type="button">
              here
            </button>
          </Link>
        </p>
      </form>
    </div>
  );
}
