import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

if (form) {
  // GÜNCELLEME MODU KONTROLÜ (Slayt 12)
  if (form.dataset.mode === "guncelle") {
    const id = new URLSearchParams(window.location.search).get("id");
    const etkinlik = events.find(e => e.id === id);

    if (etkinlik) {
      form.elements.ad.value = etkinlik.title;
      form.elements.kategori.value = etkinlik.category;
      
      // GG-AA-YYYY formatını HTML type="date" için YYYY-MM-DD'ye çevir
      const tParca = etkinlik.date.split("-");
      if (tParca.length === 3) {
        form.elements.tarih.value = `${tParca[2]}-${tParca[1]}-${tParca[0]}`;
      }
      form.elements.saat.value = etkinlik.time;
      form.elements.yer.value = etkinlik.location;
      form.elements.kontenjan.value = etkinlik.capacity;
      form.elements.aciklama.value = etkinlik.description;
    } else {
      // id yoksa veya geçersizse formu gizle, uyarı göster (Slayt 12)
      form.outerHTML = `
        <div class="hata-kutusu">
          <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <p><a href="etkinlikler.html" class="btn">Etkinliklere git</a></p>
        </div>
      `;
    }
  }

  // DOĞRULAMA VE GÖNDERME İŞLEMİ (Slayt 10 & 11)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hataları ve önceki mesajları temizle
    document.querySelectorAll(".hata-metni").forEach(el => el.textContent = "");
    document.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
    if (mesaj) mesaj.innerHTML = "";

    const fd = new FormData(form);
    const data = {
      id: "event-" + (events.length + 1),
      title: (fd.get("ad") || "").trim(),
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: (fd.get("yer") || "").trim(),
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: (fd.get("aciklama") || "").trim()
    };

    const errors = {};

    // Slayt 11 Kuralları
    if (data.title.length < 3) {
      errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    }
    if (!data.category) {
      errors.kategori = "Bir kategori seçin.";
    }
    if (!data.date) {
      errors.tarih = "Tarih seçin.";
    }
    if (!data.time) {
      errors.saat = "Saat seçin.";
    }
    if (!data.location) {
      errors.yer = "Yer bilgisini yazın.";
    }
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
    }

    // Hataları ekranda göster
    if (Object.keys(errors).length > 0) {
      for (const [alanId, hataMesaji] of Object.entries(errors)) {
        const inputEl = form.querySelector(`#${alanId}`);
        const spanEl = form.querySelector(`#${alanId}-hata`);
        if (inputEl) inputEl.setAttribute("aria-invalid", "true");
        if (spanEl) spanEl.textContent = hataMesaji;
      }
      return;
    }

    // Başarılıysa JSON formatında yeşil kutuda göster (Slayt 11)
    if (mesaj) {
      mesaj.innerHTML = `
        <div class="basari-kutusu">
          <p><strong>Etkinlik oluşturuldu (bu sprintte kaydedilmez):</strong></p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}