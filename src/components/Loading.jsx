import cinema from "../asset/cinema.svg";

export default function Loading() {
  return (
    <h1 className="not-found">
      <img className="not-found-img" src={cinema} />
      Loading
    </h1>
  );
}
