import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p><strong>{event.category}</strong></p>
      <p>Tarih: {formatDate(event.date)}, {event.time}</p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <p>
        <Link to={`/events/${event.id}`}>Detayları gör</Link>
      </p>
    </article>
  );
}
export default EventCard;