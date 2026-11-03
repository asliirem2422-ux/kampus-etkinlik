import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};

    if (!email || !email.includes("@")) {
      found.email = "Geçerli bir e-posta adresi girin.";
    }
    if (!password || password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalıdır.";
    }

    setErrors(found);

    // Hata yoksa Giriş başarılı simüle edilir ve Yönetim (/admin) sayfasına yönlendirir
    if (Object.keys(found).length === 0) {
      navigate("/admin");
    }
  }

  return (
    <section>
      <h2>Giriş Yap</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "hata-border" : ""}
          />
          {errors.email && <span className="hata-metni" style={{ color: "red", fontSize: "0.85rem" }}>{errors.email}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "hata-border" : ""}
          />
          {errors.password && <span className="hata-metni" style={{ color: "red", fontSize: "0.85rem" }}>{errors.password}</span>}
        </div>

        <button type="submit" className="btn btn-ana">
          Giriş Yap
        </button>
      </form>
      <br />
      <p>
        <Link to="/forgot-password">Şifremi unuttum</Link> | <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </section>
  );
}

export default LoginPage;