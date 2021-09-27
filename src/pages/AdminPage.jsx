import { useEffect } from "react";
import AddNewEventForm from "../components/AddNewEventForm";
import CinemaInfo from "../components/CinemaInfo";
import Loading from "../components/Loading";
import SimpleFilmCard from "../components/SimpleFilmCard";
import useStore from "../store";

export default function AdminPage() {
  const todayMovies = useStore((store) => store.todayMovies);
  const fetchTodayMovies = useStore((store) => store.fetchTodayMovies);
  console.log("todayMovies 8", todayMovies);
  useEffect(() => {
    fetchTodayMovies();
  }, []);

  if (todayMovies.length === 0) {
    return <Loading />;
  }

  return (
    <div className="admin-div">
      <section className="event">
        <p className="board-p">Films for Today</p>
        <section className="event-on-day">
          {todayMovies.map((movie, index) => (
            <SimpleFilmCard key={index} movie={movie} />
          ))}
        </section>
      </section>
      <section className="recomadation-card">
        <p className="board-p">Recommadation For today </p>
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
