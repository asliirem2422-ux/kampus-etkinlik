import { events } from "./data.js";

const container = document.querySelector("#detay-konteyner");
const baslik = document.querySelector("#detay-baslik");
const id = new URLSearchParams(window.location.search).get("id");

const event = events.find(e => e.id === id);

if (!event) {
  document.title = "Etkinlik Bulunamadı";
  if (baslik) baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `
    <div class="hata-kutusu">
      <p><strong>"${id || 'Geçersiz'}"</strong> numaralı bir etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
      <p><a href="etkinlikler.html" class="btn">Listeye dön</a></p>
    </div>
  `;
} else {
  document.title = event.title;
  if (baslik) baslik.textContent = event.title;

  const parts = event.date.split("-");
  const okunurTarih = parts.length === 3 ? `${parts[0]} Ekim 2026` : event.date;

  container.innerHTML = `
    <div class="detay-konteyner">
      <figure>
        <img src="afis.jpg" alt="${event.title} Afişi">
        <figcaption><small>${event.title} afişi</small></figcaption>
      </figure>

      <div class="detay-bilgi">
        <h3>Etkinlik Künyesi</h3>
        <dl>
          <dt>Tarih</dt>
          <dd>${event.date}, ${event.time}</dd>
          <dt>Yer</dt>
          <dd>${event.location}</dd>
          <dt>Kategori</dt>
          <dd>${event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>${event.capacity} kişi</dd>
        </dl>
        
        <h3>Açıklama</h3>
        <p>${event.description}</p>

        <div class="detay-butonlar">
          <a href="etkinlikler.html" class="btn">← Listeye dön</a>
          <a href="etkinlik-guncelle.html?id=${event.id}" class="btn">Bu etkinliği güncelle</a>
        </div>
      </div>
    </div>
  `;
}