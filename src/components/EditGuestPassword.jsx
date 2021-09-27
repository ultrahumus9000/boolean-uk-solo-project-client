import useStore from "../store";

import { useState } from "react";

export default function EditGuestPassword({ toggle }) {
  const updateGuestPassword = useStore((store) => store.updateGuestPassword);
  function cancel() {
    toggle();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const originPassword = e.target.old.value;
    const newPassword = e.target.new.value;
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
        <label htmlFor="">
          <span>Orginal Password</span>
          <input type="text" name="old" />
        </label>
        <label htmlFor="">
          <span>New Password</span>
          <input type="text" name="new" />
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
