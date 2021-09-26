import AddNewEventForm from "../components/AddNewEventForm";
import CinemaInfo from "../components/CinemaInfo";

export default function AdminPage() {
  return (
    <div className="admin-div">
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
      <section className="recomadation-card">
        <p>Recommadation For today </p>
        <p>this film</p>
        <p>this film</p>
        <p>this film</p>
        <p>this film</p>
        <p>this film</p>
      </section>
      <section className="add-event-section">
        <AddNewEventForm />
      </section>
      <section className="cinema-infomation">
        <CinemaInfo />
      </section>
    </div>
  );
}
