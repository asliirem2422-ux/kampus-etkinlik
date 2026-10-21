import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event?: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  if (!event) {
    return (
      <div className="hata-kutusu">
        <p>Geçersiz bir etkinlik seçildi. Listeden bir etkinlik seçin.</p>
        <button className="btn" onClick={onBack}>
          Listeye dön
        </button>
      </div>
    );
  }

  return (
    <div className="detay-konteyner">
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} Afişi`} />
          <figcaption>
            <small>{event.title} afişi</small>
          </figcaption>
        </figure>
      )}

      <div className="detay-bilgi">
        <h3>Etkinlik Künyesi</h3>
        <dl>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)}, {event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>

        <h3>Açıklama</h3>
        <p>{event.description}</p>

        <div className="detay-butonlar">
          <button className="btn" onClick={onBack}>
            ← Listeye dön
          </button>
          &nbsp;
          <button className="btn" onClick={() => onEdit(event.id)}>
            Bu etkinliği güncelle
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;