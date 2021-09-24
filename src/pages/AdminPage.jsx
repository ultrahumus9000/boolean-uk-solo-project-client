import AddNewEventForm from "../components/AddNewEventForm";
import CinemaInfo from "../components/CinemaInfo";

// id           Int           @id @default(autoincrement())
// movie        Movie         @relation(fields: [movieId], references: [id], onDelete: Cascade)
// movieId      Int
// screening    Int
// showTime     DateTime      @db.Time
// event        Event         @relation(fields: [eventId], references: [id])
// eventId      Int
// transactions Transaction[]
// quantity     Int

export default function AdminPage() {
  return (
    <div className="admin-div">
      <AddNewEventForm />
      <section className="recomadation-card">
        <p>this film</p>
        <p>this film</p>
        <p>this film</p>
        <p>this film</p>
        <p>this film</p>
      </section>
      <section className="cinema-infomation">
        <CinemaInfo />
      </section>
      <section className="event">
        <p>Films for Today</p>
        <section className="event-on-day">
          <p>this film</p>
          <p>this film</p>
          <p>this film</p>
          <p>this film</p>
          <p>this film</p>
        </section>
      </section>
    </div>
  );
}
