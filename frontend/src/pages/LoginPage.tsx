import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta adresi girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalıdır.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section>
      <h2>Giriş Yap</h2>
      {sent && <p style={{ color: "green" }}>Gerçek giriş Sprint 10'da aktif edilecek.</p>}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>
        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>
        <button type="submit" className="btn">Giriş</button>
      </form>
      <p><br /><Link to="/forgot-password">Şifremi unuttum</Link> | <Link to="/register">Kayıt ol</Link></p>
    </section>
  );
}
export default LoginPage;