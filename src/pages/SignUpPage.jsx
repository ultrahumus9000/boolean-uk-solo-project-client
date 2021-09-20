export default function SignUpPage() {
  function handleSubmit() {}
  return (
    <div className="sign-up-div">
      <h2>Register Here</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" />

        <input type="password" placeholder="Password" />

        <input type="text" placeholder="First Name" />

        <input type="text" placeholder="Last Name" />

        <input type="text" placeholder="Email" />

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
