import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
  columnsClass?: string;
}

function EventList({
  events,
  emptyText = "Aramanıza uygun etkinlik bulunamadı.",
  columnsClass = "grid-3"
}: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc-metni">{emptyText}</p>;
  }

  return (
    <div className={`etkinlik-grid ${columnsClass}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
export default EventList;