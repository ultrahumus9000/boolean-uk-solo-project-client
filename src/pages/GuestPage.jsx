import useStore from "../store";
import { useState } from "react";
import EditUserForm from "../components/EditUserForm";
import Loading from "../components/Loading";
import EditGuestPassword from "../components/EditGuestPassword";

export default function GuestPage() {
  const currentUser = useStore((store) => store.currentUser);
  const [editStatus, setEditStatus] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  console.log("currentUser", currentUser);

  function toggleEditInfo() {
    setEditStatus(!editStatus);
  }

  function toggleEditPassword() {
    setEditStatus(!editStatus);
    setEditPassword(!editPassword);
  }

  if (!currentUser.role) {
    return <Loading />;
  }

  return (
    <div>
      {editStatus ? (
        editPassword ? (
          <EditGuestPassword toggle={toggleEditPassword} />
        ) : (
          <EditUserForm toggle={toggleEditInfo} />
        )
      ) : (
        <div className="guest-info">
          <p>
            Username: <span>{currentUser.username}</span>
          </p>

          <p>
            Email: <span> {currentUser.email} </span>
          </p>
          <p>
            First Name: <span> {currentUser.firstName} </span>
          </p>
          <p>
            Last Name: <span> {currentUser.lastName} </span>
          </p>
          <button className="guest-btn" onClick={toggleEditInfo}>
            Edit Your Account
          </button>
          <button className="password-btn" onClick={toggleEditPassword}>
            Edit Your Password
          </button>
        </div>
      )}
    </div>
  );
}
// avatar: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
// email: "PARIS1900LLL@GMAIL.COM"
// firstName: "LINLIN"
// lastName: "LI"
// role: "Guest"
// username: "linlinisCool"
