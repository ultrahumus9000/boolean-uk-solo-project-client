import useStore from "../store";
import eyeclose from "../asset/eyeclose.svg";
import eyeopen from "../asset/eyeopen.svg";

import { useState } from "react";

export default function EditGuestPassword({ toggle }) {
  const updateGuestPassword = useStore((store) => store.updateGuestPassword);
  const [seePassword, setSeePassword] = useState(false);
  const [seePasswordTwo, setSeePasswordTwo] = useState(false);
  function cancel() {
    toggle();
  }

  function togglePassword() {
    setSeePassword(!seePassword);
  }

  function togglePasswordTwo() {
    setSeePasswordTwo(!seePasswordTwo);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const originPassword = e.target.old.value;
    const newPassword = e.target.new.value;
    console.log(originPassword, newPassword);
    if (originPassword === newPassword) {
      alert("YOU CAN NOT CHOOSE SAME PASSWORD AGAIN");
      return;
    }
    updateGuestPassword({ originPassword, newPassword }).then(() => {
      toggle();
    });
  }

  return (
    <div>
      <form
        className="guest-info guest-form password-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="" className="label-password">
          <span>Orginal Password</span>
          <input type={`${seePassword ? "text" : "password"}`} name="old" />
          {seePassword ? (
            <button
              className="button-eye label-eye"
              type="button"
              onClick={togglePassword}
            >
              <img className="eye" src={eyeopen} />
            </button>
          ) : (
            <button
              className="button-eye label-eye"
              type="button"
              onClick={togglePassword}
            >
              <img className="eye" src={eyeclose} />
            </button>
          )}
        </label>
        <label htmlFor="" className="label-password">
          <span>New Password</span>
          <input type={`${seePasswordTwo ? "text" : "password"}`} name="new" />
          {seePasswordTwo ? (
            <button
              className="button-eye label-eye"
              type="button"
              onClick={togglePasswordTwo}
            >
              <img className="eye" src={eyeopen} />
            </button>
          ) : (
            <button
              className="button-eye label-eye"
              type="button"
              onClick={togglePasswordTwo}
            >
              <img className="eye" src={eyeclose} />
            </button>
          )}
        </label>

        <button type="submit" className="guest-btn">
          Confirm
        </button>
        <button className="password-btn" type="button" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
