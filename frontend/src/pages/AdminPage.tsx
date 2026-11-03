import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" etkinliğini silmek istediğinizden emin misiniz?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>Etkinlik Yönetimi</h2>
        <Link to="/admin/new" className="btn">+ Yeni Etkinlik</Link>
      </div>
      <table className="tablo">
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Tarih</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td data-baslik="Etkinlik">{e.title}</td>
              <td data-baslik="Tarih">{formatDate(e.date)}</td>
              <td data-baslik="Kategori">{e.category}</td>
              <td className="islemler" data-baslik="İşlemler">
                <Link to={`/admin/${e.id}/edit`} className="btn">Düzenle</Link> &nbsp;
                <button onClick={() => handleDelete(e.id, e.title)} className="btn buton-sil">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default AdminPage;