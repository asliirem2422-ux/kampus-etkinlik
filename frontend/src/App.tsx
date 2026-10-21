import { useState, useEffect } from "react";
import "./App.css";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  // Tahtadaki 3. kural: EventDetail sayfasında Title ve Header'da etkinlik adı görünüyor
  const pageTitle =
    page === "detail" && selectedEvent
      ? selectedEvent.title
      : page === "add"
      ? "Etkinlik Ekle"
      : page === "update"
      ? "Etkinlik Güncelle"
      : page === "events"
      ? "Tüm Etkinlikler"
      : "Kampüs Etkinlikleri";

  const headerText =
    page === "events"
      ? "Ekim ayında kampüste düzenlenen etkinlikler."
      : page === "detail" || page === "add" || page === "update"
      ? undefined
      : "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const upcoming = [...events]
    .sort((a, b) => a.date.split("-").reverse().join("").localeCompare(b.date.split("-").reverse().join("")))
    .slice(0, 2);

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  const categories = [...new Set(events.map((e) => e.category))];

  return (
    <>
      <Header title={pageTitle} text={headerText} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
              columnsClass="grid-2"
            />
            <p>
              <br />
              <button className="btn" onClick={() => go("events")}>
                Tüm etkinlikleri gör
              </button>
            </p>
          </section>
        )}

        {page === "events" && (
          <section>
            <EventFilter
              searchText={searchText}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setSelectedCategory}
            />
            <p className="sonuc-metni">
              {filteredEvents.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>
            <EventList
              events={filteredEvents}
              onShowDetail={(id) => go("detail", id)}
              columnsClass="grid-3"
            />
          </section>
        )}

        {page === "detail" && (
          <section>
            <EventDetail
              event={selectedEvent}
              onBack={() => go("events")}
              onEdit={(id) => go("update", id)}
            />
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <EventForm
              isUpdate={page === "update"}
              onSubmit={() => window.scrollTo(0, 0)}
            />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;