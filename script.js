const translations = {
  tr: {
    "nav.services": "Hizmetler",
    "nav.about": "Hakkımda",
    "nav.approach": "Yaklaşım",
    "nav.contact": "İletişim",
    "hero.eyebrow": "Profesyonel Yatırım Danışmanlığı",
    "hero.title": "Disiplinli analiz, kontrollü risk, sürdürülebilir yatırım yaklaşımı.",
    "hero.text":
      "Borsa, teknik analiz ve para yönetimi odaklı danışmanlık hizmeti ile yatırım kararlarınızı veri, strateji ve risk yönetimi temelli şekilde destekliyorum.",
    "hero.ctaPrimary": "Görüşme Talep Et",
    "hero.ctaSecondary": "Hizmetleri İncele",
    "hero.cardLabel": "Odak Alanları",
    "hero.focus1": "Borsa ve Piyasa Analizi",
    "hero.focus2": "Teknik Analiz Stratejileri",
    "hero.focus3": "Portföy ve Para Yönetimi",
    "hero.focus4": "Risk Kontrol Disiplini",
    "services.title": "Hizmetler",
    "services.s1.title": "Borsa Danışmanlığı",
    "services.s1.text":
      "Sektör ve hisse bazlı değerlendirmelerle, yatırım hedefinize uygun piyasa perspektifi sunulur.",
    "services.s2.title": "Teknik Analiz",
    "services.s2.text":
      "Trend, destek-direnç, hacim ve formasyon odaklı teknik çerçeve ile giriş-çıkış planları oluşturulur.",
    "services.s3.title": "Para Yönetimi",
    "services.s3.text":
      "Sermaye koruması, pozisyon boyutlandırma ve risk/ödül dengesi prensipleri ile sürdürülebilir sistem hedeflenir.",
    "about.title": "Hakkımda",
    "about.text":
      "Bora Ecevit olarak, yatırımcılara kısa vadeli piyasa gürültüsünden uzak, planlı ve ölçülebilir bir yaklaşım geliştirmeleri için danışmanlık sağlıyorum. Amacım, yatırım kararlarını net bir metodoloji ile güçlendirmek ve risk yönetimini sürecin merkezine yerleştirmektir.",
    "approach.title": "Çalışma Yaklaşımı",
    "approach.a1.title": "Hedef Analizi",
    "approach.a1.text": "Yatırım süresi, risk algısı ve beklentiler netleştirilir.",
    "approach.a2.title": "Strateji Tasarımı",
    "approach.a2.text": "Teknik analiz ve para yönetimi prensiplerine göre plan hazırlanır.",
    "approach.a3.title": "Düzenli Değerlendirme",
    "approach.a3.text": "Piyasa koşullarına göre strateji gözden geçirilir ve optimize edilir.",
    "contact.title": "İletişim",
    "contact.text":
      "Danışmanlık süreci hakkında bilgi almak için aşağıdaki kanallardan iletişime geçebilirsiniz.",
    "contact.form.name": "Ad Soyad",
    "contact.form.email": "E-posta",
    "contact.form.message": "Mesaj",
    "contact.form.submit": "Mesaj Gönder",
    "footer.disclaimer":
      "Not: Bu sitedeki bilgiler genel bilgilendirme amaçlıdır ve yatırım tavsiyesi kapsamında değerlendirilmemelidir."
  },
  en: {
    "nav.services": "Services",
    "nav.about": "About",
    "nav.approach": "Approach",
    "nav.contact": "Contact",
    "hero.eyebrow": "Professional Investment Advisory",
    "hero.title": "Disciplined analysis, controlled risk, and a sustainable investment approach.",
    "hero.text":
      "I support your investment decisions with consulting focused on stock markets, technical analysis, and money management through a data-driven and risk-aware methodology.",
    "hero.ctaPrimary": "Request a Meeting",
    "hero.ctaSecondary": "Explore Services",
    "hero.cardLabel": "Focus Areas",
    "hero.focus1": "Stock Market and Market Analysis",
    "hero.focus2": "Technical Analysis Strategies",
    "hero.focus3": "Portfolio and Money Management",
    "hero.focus4": "Risk Control Discipline",
    "services.title": "Services",
    "services.s1.title": "Stock Market Advisory",
    "services.s1.text":
      "Sector and stock-based evaluations provide a market perspective aligned with your investment goals.",
    "services.s2.title": "Technical Analysis",
    "services.s2.text":
      "Entry and exit plans are built around trend, support-resistance, volume, and pattern analysis.",
    "services.s3.title": "Money Management",
    "services.s3.text":
      "A sustainable system is targeted through capital protection, position sizing, and risk-reward balance.",
    "about.title": "About",
    "about.text":
      "As Bora Ecevit, I help investors build a planned and measurable approach away from short-term market noise. My goal is to strengthen investment decisions with a clear methodology and place risk management at the center of the process.",
    "approach.title": "Working Approach",
    "approach.a1.title": "Goal Analysis",
    "approach.a1.text": "Investment horizon, risk profile, and expectations are clarified.",
    "approach.a2.title": "Strategy Design",
    "approach.a2.text": "A plan is prepared based on technical analysis and money management principles.",
    "approach.a3.title": "Regular Review",
    "approach.a3.text": "The strategy is reviewed and optimized according to market conditions.",
    "contact.title": "Contact",
    "contact.text":
      "You can get in touch through the channels below for details about the advisory process.",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "footer.disclaimer":
      "Note: The information on this site is for general information purposes only and should not be considered investment advice."
  }
};

const html = document.documentElement;
const langButtons = document.querySelectorAll(".lang-btn");
const translatableItems = document.querySelectorAll("[data-i18n]");
const yearSpan = document.getElementById("year");

function applyLanguage(lang) {
  const activeDict = translations[lang] || translations.tr;
  html.lang = lang;

  translatableItems.forEach((item) => {
    const key = item.dataset.i18n;
    const value = activeDict[key];
    if (value) {
      item.textContent = value;
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  localStorage.setItem("siteLanguage", lang);
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

yearSpan.textContent = new Date().getFullYear();
applyLanguage(localStorage.getItem("siteLanguage") || "tr");
