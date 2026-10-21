interface EventFormProps {
  onSubmit: () => void;
  isUpdate?: boolean;
}

function EventForm({ onSubmit, isUpdate = false }: EventFormProps) {
  return (
    <>
      <p>
        <small>
          Bu sprintte form sadece görünüm; kayıt yapılmaz.
        </small>
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
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
          {isUpdate ? "Güncelle" : "Kaydet"}
        </button>
      </form>
    </>
  );
}

export default EventForm;