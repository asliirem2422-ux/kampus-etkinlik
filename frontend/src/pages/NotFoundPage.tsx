import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="hata-kutusu">
      <h2>404 - Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      <p><br /><Link to="/" className="btn">Ana Sayfaya Dön</Link></p>
    </section>
  );
}
export default NotFoundPage;