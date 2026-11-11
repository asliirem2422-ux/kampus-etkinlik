# Kampüs Etkinlikleri Backend API

## Çalıştırma Komutları
- `npm install`: Bağımlılıkları yükler.
- `npm run dev`: Sunucuyu geliştirme modunda (watch) çalıştırır.
- `npm start`: Sunucuyu yayında çalıştırır.

## Ortam Değişkenleri
- `PORT`: Sunucunun çalışacağı port (Varsayılan: `3000`).

## REST Sözleşmesi Tablosu

| Yöntem | Endpoint | Amaç | Başarılı Durum | Hata Durumu |
|---|---|---|---|---|
| GET | `/health` | Sunucu sağlık kontrolü | `200 OK` | - |
| GET | `/events` | Tüm etkinlikleri listele | `200 OK` | - |
| GET | `/events/:id` | Tek etkinlik getir | `200 OK` | `404 Not Found` |
| POST | `/events` | Yeni etkinlik ekle | `201 Created` | `400 Bad Request` |
| PATCH | `/events/:id` | Etkinlik güncelle | `200 OK` (Sprint 9) | `400 / 404` |
| DELETE | `/events/:id` | Etkinlik sil | `204 No Content` (Sprint 9) | `404 Not Found` |