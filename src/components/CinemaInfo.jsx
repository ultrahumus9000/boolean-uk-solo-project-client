import { useState } from "react";
import useStore from "../store";
import employee from "../asset/employee.svg";
import location from "../asset/location.svg";
import Loading from "./Loading";

export default function CinemaInfo() {
  const cinema = useStore((store) => store.cinema);
  const [viewCinemaInfo, setViewCinemaInfo] = useState(false);

  function toggleDashboard() {
    setViewCinemaInfo(!viewCinemaInfo);
  }

  if (cinema.staff === undefined) {
    return <Loading />;
  }
  return (
    <div className="cinema-info">
      <button>Nos Cinema DashBoard</button>
      <p>Employee DashBoard</p>
      <div className="staff-section">
        {cinema.staff.map((staff, index) => {
          return (
            <p key={index} className="staff-name">
              <img src={employee} className="employee-pic" />
              <span>{staff.firstName}</span>
              <span>{staff.lastName}</span>
            </p>
          );
        })}
      </div>
      <section>
        <span className="cinema-location">
          {" "}
          <img className="employee-pic" src={location} alt="" />{" "}
          {cinema.location}
        </span>
        <span>capacity: {cinema.capacity}</span>
        <span>screening: {cinema.screening}</span>
        <span>Revenue</span>
      </section>
    </div>
  );
}
