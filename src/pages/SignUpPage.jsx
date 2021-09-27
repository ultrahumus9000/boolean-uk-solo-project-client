import { useHistory } from "react-router";

export default function SignUpPage() {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const targetEvent = e.target;
    const newUser = {
      username: targetEvent.username.value,
      password: targetEvent.password.value,
      firstName: targetEvent.firstName.value,
      lastName: targetEvent.lastName.value,
      email: targetEvent.email.value,
      role: "Guest",
      avatar:
        "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      cinemaId: 1,
    };

    fetch("http://localhost:4000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(() => {
      targetEvent.reset();
      history.push("/");
    });
  }

  return (
    <div className="sign-up-div">
      <h2>Register Here</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" />

        <input type="password" placeholder="Password" name="password" />

        <input type="text" placeholder="First Name" name="firstName" />

        <input type="text" placeholder="Last Name" name="lastName" />

        <input type="text" placeholder="Email" name="email" />

        <button>Submit</button>
      </form>
    </div>
  );
}

//   username     String        @unique
//   password     String
//   firstName    String
//   lastName     String
//   email        String
//   role         Role          @default(Guest)
//   avatar       String
//   cinema       Cinema?       @relation(fields: [cinemaId], references: [id], onDelete: Cascade)
//   cinemaId     Int?
