export default function FilmCard({ movie }) {
  return (
    <div className="film-card">
      <img src={movie.poster} alt="" />
      <div className="movie-info">
        <p className={`${movie.genre} movie-features `}>{movie.genre}</p>
        <p className="movie-date">Release Date {movie.releaseDate}</p>
        <p className="movie-title">{movie.title}</p>
        <p className="movie-overview">Overview: {movie.overview}</p>
        <p>
          <span className="movie-duration"> {movie.duration}</span>{" "}
          <button className="buy-btn"> Buy Ticket</button>
        </p>
        <section className="time-selection">
          <span className="span-show-time">SHOW TIME </span>
          <ul>
            {movie.agendas.map((agenda) => (
              <span className="show-time">{agenda.showTime.slice(11, 16)}</span>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

// {
//   "id": 1,
//   "releaseDate": "2021-07-21",
//   "genre": "Romance",
//   "title": "Old",
//   "overview": "A group of families on a tropical holiday discover that the secluded beach where they are staying is somehow causing them to age rapidly – reducing their entire lives into a single day.",
//   "poster": "https://image.tmdb.org/t/p/w342/iTgM25ftE7YtFgZwUZupVp8A61S.jpg",
//   "duration": "120 mins",
//   "agendas": [
//     {
//       "id": 1,
//       "movieId": 1,
//       "screening": 1,
//       "showTime": "1970-01-01T10:00:00.000Z",
//       "eventId": 1,
//       "quantity": 60
//     },
//     {
//       "id": 2,
//       "movieId": 1,
//       "screening": 1,
//       "showTime": "1970-01-01T13:00:00.000Z",
//       "eventId": 1,
//       "quantity": 60
//     },
//     {
//       "id": 3,
//       "movieId": 1,
//       "screening": 1,
//       "showTime": "1970-01-01T16:00:00.000Z",
//       "eventId": 1,
//       "quantity": 60
//     },
//     {
//       "id": 4,
//       "movieId": 1,
//       "screening": 1,
//       "showTime": "1970-01-01T19:00:00.000Z",
//       "eventId": 1,
//       "quantity": 60
//     }
//   ]
// }
