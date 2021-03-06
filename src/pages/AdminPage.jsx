import { useEffect } from "react";
import AddNewEventForm from "../components/AddNewEventForm";
import CinemaInfo from "../components/CinemaInfo";
import DeleteBoard from "../components/DeleteBoard";
import RecommedationCard from "../components/RecommendationCard";
import SimpleFilmCard from "../components/SimpleFilmCard";
import useStore from "../store";

export default function AdminPage() {
  const todayMovies = useStore((store) => store.todayMovies);
  const fetchTodayMovies = useStore((store) => store.fetchTodayMovies);

  useEffect(() => {
    fetchTodayMovies();
  }, []);

  return (
    <div className="admin-div">
      <section className="event">
        <p className="board-p">Films for Today</p>
        <section className="event-on-day">
          {todayMovies.length &&
            todayMovies.map((movie, index) => (
              <SimpleFilmCard key={index} movie={movie} />
            ))}
        </section>
      </section>
      <section className="recomadation-card">
        <p className="board-p">Recommadation For today </p>
        <RecommedationCard />
      </section>
      <section className="outdated-card">
        <p className="board-p">Outdated Films </p>
        <DeleteBoard />
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
