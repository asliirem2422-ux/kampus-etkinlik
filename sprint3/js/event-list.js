import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucText = document.querySelector("#sonuc");

// GG-AA-YYYY formatındaki tarihi Türkçe okunabilir tarihe çevirir (Slayt 5)
function formatTurkishDate(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    }
  }
  return dateStr;
}

// Kart şablonu (Slayt 5)
function createCard(event) {
  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p><strong>${event.category}</strong></p>
      <p>Tarih: ${formatTurkishDate(event.date)}, ${event.time}</p>
      <p>Yer: ${event.location}</p>
      <p>Kontenjan: ${event.capacity} kişi</p>
      <p>${event.description}</p>
      <p><a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a></p>
    </article>
  `;
}

function render(dizi) {
  if (!list) return;
  if (dizi.length === 0) {
    list.innerHTML = "";
    if (sonucText) sonucText.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    return;
  }
  list.innerHTML = dizi.map(createCard).join("");
  if (sonucText) {
    sonucText.textContent = `${dizi.length} etkinlik listeleniyor.`;
  }
}

// Ana sayfa kontrolü (data-limit="2") (Slayt 6)
if (list && list.dataset.limit) {
  const limitCount = Number(list.dataset.limit);
  const yaklasan = [...events]
    .sort((a, b) => {
      // Tarihi sıralamak için YYYY-MM-DD'ye çevirip karşılaştırıyoruz
      const da = a.date.split("-").reverse().join("-");
      const db = b.date.split("-").reverse().join("-");
      return da.localeCompare(db);
    })
    .slice(0, limitCount);

  render(yaklasan);
} 
// Liste sayfası kontrolü (Arama & Filtreleme) (Slayt 7 & 8)
else if (list) {
  // Kategorileri dinamik olarak üret (new Set) (Slayt 8)
  if (kategoriSelect) {
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(kat => {
      const opt = document.createElement("option");
      opt.value = kat;
      opt.textContent = kat;
      kategoriSelect.appendChild(opt);
    });
  }

  function filtrele() {
    const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
    const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

    const sonuc = events.filter(e => {
      const baslik = e.title.toLocaleLowerCase("tr-TR");
      const aciklama = e.description.toLocaleLowerCase("tr-TR");
      const metinUyuyor = baslik.includes(aranan) || aciklama.includes(aranan);
      const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
  }

  if (aramaInput) aramaInput.addEventListener("input", filtrele);
  if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);

  render(events);
}