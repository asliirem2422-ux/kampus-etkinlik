import { useParams, Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import { formatDate } from "../utils/format-date";
import NotFoundPage from "./NotFoundPage";

function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  return (
    <section>
      <h2>{event.title}</h2>
      <div className="detay-konteyner">
        {event.image && (
          <figure>
            <img src={event.image} alt={event.title} />
          </figure>
        )}
        <div className="detay-bilgi">
          <h3>Etkinlik Künyesi</h3>
          <dl>
            <dt>Tarih</dt><dd>{formatDate(event.date)}, {event.time}</dd>
            <dt>Yer</dt><dd>{event.location}</dd>
            <dt>Kategori</dt><dd>{event.category}</dd>
            <dt>Kontenjan</dt><dd>{event.capacity} kişi</dd>
          </dl>
          <h3>Açıklama</h3>
          <p>{event.description}</p>
          <div className="detay-butonlar">
            <Link className="btn" to="/events">← Listeye dön</Link> &nbsp;
            <Link className="btn" to={`/admin/${event.id}/edit`}>Bu etkinliği güncelle</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default EventDetailPage;