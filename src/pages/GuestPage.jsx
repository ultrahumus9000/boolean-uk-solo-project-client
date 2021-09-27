import useStore from "../store";

export default function GuestPage() {
  const currentUser = useStore((store) => store.currentUser);
  console.log("currentUser", currentUser);
  return (
    <div className="guest-info">
      <p>
        username: <span>{currentUser.username}</span>
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
      <button className="guest-btn">Edit Your Account</button>
      <button className="password-btn">Edit Your Password</button>
    </div>
  );
}
// avatar: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
// email: "PARIS1900LLL@GMAIL.COM"
// firstName: "LINLIN"
// lastName: "LI"
// role: "Guest"
// username: "linlinisCool"
