import { useState, useEffect } from "react";
import useStore from "../store";
import employee from "../asset/employee.svg";
import location from "../asset/location.svg";
import Loading from "./Loading";

export default function CinemaInfo() {
  const cinema = useStore((store) => store.cinema);

  const policy = useStore((store) => store.policy);
  const getPolicy = useStore((store) => store.getPolicy);
  const revenue = useStore((store) => store.revenue);
  const getRevenue = useStore((store) => store.getRevenue);

  useEffect(() => {
    getPolicy();
    getRevenue();
  }, []);

  if (
    cinema.staff === undefined ||
    policy.adultPrice === undefined ||
    revenue === 0
  ) {
    return <Loading />;
  }
  return (
    <div className="cinema-info">
      <p className="cinema-dashboard-p">Nos Cinema DashBoard</p>
      <div className="policy-section">
        <section className="policy-price-section">
          <span>Adult: £{policy.adultPrice}</span>
          <span>Child: £{policy.childPrice}</span>
        </section>
        <span>Discount:{policy.discount}%</span>
        <span>Apply for: more than {policy.condition} tickets</span>
      </div>
      <p className="cinema-dashboard-p">Employee DashBoard</p>
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
        <span>Revenue £{revenue[0]._sum.total}</span>
      </section>
    </div>
  );
}
