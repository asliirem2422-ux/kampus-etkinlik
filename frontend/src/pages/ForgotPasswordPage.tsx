import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Geçerli bir e-posta adresi girin.");
      setSent(false);
    } else {
      setError("");
      setSent(true);
    }
  }

  return (
    <section>
      <h2>Şifremi Unuttum</h2>
      {sent && <p style={{ color: "green" }}>Sıfırlama bağlantısı {email} adresine gönderildi (demo).</p>}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {error && <span className="hata-metni">{error}</span>}
        </div>
        <button type="submit" className="btn">Gönder</button>
      </form>
      <p><br /><Link to="/login">Girişe dön</Link></p>
    </section>
  );
}
export default ForgotPasswordPage;