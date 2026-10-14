import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  // Sayfa değiştirme fonksiyonu (Router olmadan state ile)
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Tarih biçimlendirme
  function formatDate(dateStr: string) {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }
    }
    return dateStr;
  }

  // Sekme Başlığını Güncelleme
  useEffect(() => {
    if (page === "home") document.title = "Kampüs Etkinlikleri";
    else if (page === "events") document.title = "Kampüs Etkinlikleri - Tüm Etkinlikler";
    else if (page === "detail") {
      const current = selectedId ? findEventById(events, selectedId) : undefined;
      document.title = current
        ? `Kampüs Etkinlikleri - ${current.title}`
        : "Kampüs Etkinlikleri - Etkinlik Bulunamadı";
    } else if (page === "add") document.title = "Kampüs Etkinlikleri - Etkinlik Ekle";
    else if (page === "update") document.title = "Kampüs Etkinlikleri - Etkinlik Güncelle";
  }, [page, selectedId]);

  // Yaklaşan 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => {
      const da = a.date.split("-").reverse().join("-");
      const db = b.date.split("-").reverse().join("-");
      return da.localeCompare(db);
    })
    .slice(0, 2);

  // Filtreli etkinlikler
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  const categories = [...new Set(events.map((e) => e.category))];

  // Ortak Kart Şablonu
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p><strong>{event.category}</strong></p>
        <p>Tarih: {formatDate(event.date)}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <p>
          <a
            href="#detay"
            onClick={(e) => {
              e.preventDefault();
              go("detail", event.id);
            }}
          >
            Detayları gör
          </a>
        </p>
      </article>
    );
  }

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <>
      <header className="site-baslik">
        <h1>
          {page === "detail" && selectedEvent
            ? selectedEvent.title
            : page === "add"
            ? "Etkinlik Ekle"
            : page === "update"
            ? "Etkinlik Güncelle"
            : page === "events"
            ? "Tüm Etkinlikler"
            : "Kampüs Etkinlikleri"}
        </h1>
        <p>
          {page === "events"
            ? "Ekim ayında kampüste düzenlenen etkinlikler."
            : "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."}
        </p>

        <nav className="menu">
          <a
            href="#home"
            className={page === "home" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
          >
            Ana Sayfa
          </a>
          <a
            href="#events"
            className={page === "events" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              go("events");
            }}
          >
            Etkinlikler
          </a>
          <a
            href="#add"
            className={page === "add" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              go("add");
            }}
          >
            Ekle
          </a>
        </nav>
      </header>

      <main>
        {/* 1. SAYFA: ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-grid grid-2">
              {upcoming.map(renderCard)}
            </div>
            <p>
              <br />
              <button
                className="btn"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör
              </button>
            </p>
          </section>
        )}

        {/* 2. SAYFA: ETKİNLİKLER (Arama & Filtre) */}
        {page === "events" && (
          <section>
            <form
              className="filtre-kutusu"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="search-input">Etkinlik ara</label>
                <input
                  id="search-input"
                  type="search"
                  placeholder="Örn: atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category-select">Kategori</label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p className="sonuc-metni">
              {filteredEvents.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <div className="etkinlik-grid grid-3">
              {filteredEvents.map(renderCard)}
            </div>
          </section>
        )}

        {/* 3. SAYFA: DETAY SAYFASI */}
        {page === "detail" && (
          <section>
            {!selectedEvent ? (
              <div className="hata-kutusu">
                <p>
                  <strong>"{selectedId || "Geçersiz"}"</strong> numaralı bir
                  etkinlik bulunamadı. Listeden bir etkinlik seçin.
                </p>
                <button className="btn" onClick={() => go("events")}>
                  Listeye dön
                </button>
              </div>
            ) : (
              <div className="detay-konteyner">
                {selectedEvent.image && (
                  <figure>
                    <img
                      src={selectedEvent.image}
                      alt={`${selectedEvent.title} Afişi`}
                    />
                    <figcaption>
                      <small>{selectedEvent.title} afişi</small>
                    </figcaption>
                  </figure>
                )}

                <div className="detay-bilgi">
                  <h3>Etkinlik Künyesi</h3>
                  <dl>
                    <dt>Tarih</dt>
                    <dd>
                      {formatDate(selectedEvent.date)}, {selectedEvent.time}
                    </dd>
                    <dt>Yer</dt>
                    <dd>{selectedEvent.location}</dd>
                    <dt>Kategori</dt>
                    <dd>{selectedEvent.category}</dd>
                    <dt>Kontenjan</dt>
                    <dd>{selectedEvent.capacity} kişi</dd>
                  </dl>

                  <h3>Açıklama</h3>
                  <p>{selectedEvent.description}</p>

                  <div className="detay-butonlar">
                    <button className="btn" onClick={() => go("events")}>
                      ← Listeye dön
                    </button>
                    &nbsp;
                    <button
                      className="btn"
                      onClick={() => go("update", selectedEvent.id)}
                    >
                      Bu etkinliği güncelle
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* 4 & 5. SAYFA: EKLE VE GÜNCELLE FORMU */}
        {(page === "add" || page === "update") && (
          <section>
            <p>
              <small>
                Bu sprintte form sadece görünüm; kayıt yapılmaz.
              </small>
            </p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Örn: Kariyer Günleri 2026"
                  maxLength={80}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div className="form-grup">
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" />
              </div>

              <div className="form-grup">
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" />
              </div>

              <div className="form-grup">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Örn: A Blok Konferans Salonu"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" type="number" />
              </div>

              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>

              <button type="submit" className="btn">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Aslı İrem Şahin · 2321032061 · 2026</p>
      </footer>
    </>
  );
}

export default App;