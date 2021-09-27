import colorclip from "../asset/colorclip.svg";
import useStore from "../store";

export default function Waiting() {
  const succeed = useStore((store) => store.succeed);
  return (
    <div>
      <h1 className="not-found waiting">
        <img className="not-found-img " src={colorclip} />
        {succeed ? "Successfully added" : "Adding New Event"}
      </h1>
    </div>
  );
}
