import { useState } from "react";
import eyeclose from "../asset/eyeclose.svg";
import eyeopen from "../asset/eyeopen.svg";

export default function LoginPage() {
  const [seePassword, setSeePassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("i submit");
  }

  function togglePassword() {
    setSeePassword(!seePassword);
  }

  return (
    <div className="login-div">
      <h2>Log In to Nos Cinema</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" />
        <input
          id="password"
          type={`${seePassword ? "text" : "password"}`}
          placeholder="Password"
        />
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
          <button className="sign-up-button" type="button">
            here
          </button>
        </p>
      </form>
    </div>
  );
}
