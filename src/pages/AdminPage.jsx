import { useState } from "react/cjs/react.development";
import AddNewEventForm from "../components/AddNewEventForm";
import useStore from "../store";

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
      <section className="recomadation-card"></section>
      <section className="cinema-info">
        <span>Revenue</span>
      </section>
      <section className="event">
        <p>Films for Today</p>
        <section className="event-on-day"></section>
      </section>
    </div>
  );
}
