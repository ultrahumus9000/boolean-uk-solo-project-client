import cinema from "../asset/cinema.svg";

export default function PageNotFound() {
  return (
    <h1 className="not-found">
      <img className="not-found-img" src={cinema} />
      Page Not Found
    </h1>
  );
}
