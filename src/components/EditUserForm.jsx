import useStore from "../store";

import { useState } from "react";

export default function EditUserForm({ toggle }) {
  const currentUser = useStore((store) => store.currentUser);
  const setCurrentUser = useStore((store) => store.setCurrentUser);
  const [form, setForm] = useState(currentUser);
  console.log("currentUser", currentUser);

  function updateUser(data) {
    return fetch(`http://localhost:4000/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        toggle();
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(form);
  }

  function cancel() {
    setForm(currentUser);
    toggle();
  }

  function handleChange(e) {
    const targetEvent = e.target;
    console.log("targetEvent", targetEvent.name);
    setForm({ ...form, [targetEvent.name]: targetEvent.value });
  }

  return (
    <div>
      <form className="guest-info guest-form" onSubmit={handleSubmit}>
        <label htmlFor="">
          <span> username</span>
          <input
            type="text"
            value={form.username}
            name="username"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <span>Email</span>

          <input
            type="text"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <span> First Name</span>
          <input
            type="text"
            value={form.firstName}
            name="firstName"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <span> Last Name</span>
          <input
            type="text"
            value={form.lastName}
            name="lastName"
            onChange={handleChange}
          />
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
