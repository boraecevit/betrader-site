export const metadata = {
  title: "Psikolojik Yönetim"
};

const modules = [
  "Psikolojik yönetim protokolleri",
  "Kasa disiplini ve pozisyon büyüklüğü standartları",
  "İrade inşası ve karar yorgunluğu önleme notları"
];

export default function DisciplinePage() {
  return (
    <>
      <section className="panel-card">
        <h3>Psikolojik Yönetim, Kasa Disiplini ve İrade İnşası</h3>
        <p>
          Trade performansı yalnızca teknik bilgi ile değil, zihinsel dayanıklılık ve
          sermaye disiplini ile sürdürülebilir hale gelir.
        </p>
      </section>
      <section className="panel-card">
        <ul className="file-list">
          {modules.map((module) => (
            <li key={module}>
              <strong>{module}</strong>
              <button className="copy-btn" type="button">
                Modülü Aç
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
