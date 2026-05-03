/** WhatsApp deep links: prefilled message switches with language (TR / EN). */
const WHATSAPP_MEETING_URL = {
  tr: "https://wa.me/905472991993?text=Merhaba,%20stratejik%20dan%C4%B1%C5%9Fmanl%C4%B1k%20ve%20BETRADER%20terminali%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum",
  en: "https://wa.me/905472991993?text=Hello,%20I%20would%20like%20to%20request%20a%20meeting%20regarding%20strategic%20consultancy%20and%20the%20BETRADER%20terminal"
};

const translations = {
  tr: {
    "nav.services": "Stratejiler",
    "nav.about": "Deneyim",
    "nav.approach": "Metodoloji",
    "nav.contact": "İletişim",
    "nav.memberCta": "Terminale\u00A0Bağlan",
    "member.title": "BETRADER Erişim Terminali",
    "member.text":
      "Bu ağ, yalnızca ön onay sürecini tamamlamış imtiyazlı üyelerin ve kurumsal paydaşların kullanımına tahsis edilmiştir. Sisteme giriş yetkisi ve operasyon ekranı bağlantıları, sadece gruba kabul edilen yatırımcılara özel olarak tanımlanmaktadır.",
    "member.register": "Üye Ol",
    "member.login": "Terminale\u00A0Bağlan",
    "hero.eyebrow": "STRATEJİK ANALİZ VE SAYISAL MODELLEME TERMİNALİ",
    "hero.title": "Finansal piyasalarda <span class='hero-highlight'>matematiksel disiplin</span> ve <span class='hero-highlight'>yüksek teknoloji</span>.",
    "hero.text":
      "Piyasa dinamiklerini veri odaklı analiz eden, kural tabanlı işlem modelleri ve ileri seviye risk yönetim disiplini üzerine inşa edilmiş profesyonel bir ekosistem.",
    "hero.ctaPrimary": "Görüşme Talep Et",
    "hero.ctaSecondary": "Hizmetleri İncele",
    "hero.cardLabel": "Odak Alanları",
    "hero.focus1": "Piyasa Mikroyapı Dekodajı",
    "hero.focus2": "Sayısal Strateji Mühendisliği",
    "hero.focus3": "Sermaye Koruma ve Risk Mimarisi",
    "hero.focus4": "Davranışsal ve Operasyonel Disiplin",
    "hero.trustNote": "2012'den bu yana, piyasa tecrübesi ve teknolojik inovasyonun buluşma noktası.",
    "services.title": "Hizmetler",
    "services.s1.title": "Kurumsal Veri ve Operasyon İstihbarat Ağı",
    "services.s1.text":
      "En büyük kazançlar, kalabalıklar fark etmeden önce arka planda oluşur. Sektörel bilgi ağımızı ve derin piyasa analizlerimizi algoritmalarla süzüyoruz. Temel amacımız; tahtalardaki gizli toplanma (akümülasyon) süreçlerini ana hareket başlamadan tespit edip, kapalı gruplarımızdaki seçkin üyelerimize her ay düzenli piyasa üstü kazanç (Alfa) fırsatları sunmaktır.",
    "services.s2.title": "Algoritmik Sinyal Mimarisi",
    "services.s2.text":
      "İnsan gözünün kaçıracağı matematiksel dip kırılımlarını ve mikro ve makro trend başlangıçlarını özel indikatör mühendisliğimizle anında tespit ediyoruz. Yoruma kapalı, şansa yer bırakmayan ve tamamen kural tabanlı net sinyallerle donatılmış bu altyapı, operasyonlarımızda mutlak kesinlik sağlar.",
    "services.s3.title": "Terminal ve Kapalı Arşiv Kütüphane",
    "services.s3.text":
      "Bireysel işlemlerin çok ötesine geçerek kurumsal düzeyde üstünlük sağlamak isteyen seçkin üyelerimiz için oluşturulmuş özel donanım ve strateji arşivi. Kapalı devre ağımızın operasyonel gücüne ek olarak; piyasa mikroyapısını çözen ileri seviye teknik analiz sunumları ve piyasa gürültüsünü filtreleyen BETrader tescilli algoritma kütüphanesi, yalnızca imtiyazlı statüdeki üyelerimizin operasyonel ekranlarına özel olarak entegre edilir.",
    "about.title": "Hakkımda",
    "about.subtitle": "Piyasanın İçinden, Teknolojinin Geleceğine",
    "about.intro":
      "2012 yılından bugüne süregelen, borsa koridorlarından algoritmaların hızına uzanan bir serüven.",
    "about.p1":
      "Finansal piyasalarla 2012 yılında tanıştığım günden beri, piyasayı sadece ekran başındaki rakamlardan değil, bizzat onu şekillendiren dinamiklerin içinden gözlemledim. Geçen bu yıllar boyunca piyasa profesyonelleri, deneyimli spekülatörler ve sektörün önde gelen isimleriyle kurduğum dostluklar, bana kitaplarda yazmayan bir tecrübe kazandırdı.",
    "about.block1Title": "Mutfağın İçinden Gelen Analiz Gücü",
    "about.p2":
      "Piyasanın en usta teknik analiz üstatlarından aldığım derinlemesine eğitimleri, yıllar içinde kendi geliştirdiğim özgün modellerle harmanladım. Sadece grafik okumayı değil; tahta yapıcı davranışlarını, spekülatif hareketlerin arkasındaki psikolojiyi ve piyasa dinamiklerini bir sosyolog gözüyle analiz etmeyi öğrendim.",
    "about.block2Title": "Teknoloji ve Strateji: BoraEcevit-BETRADER",
    "about.item1":
      "<strong class='about-item-lead'>Algoritmik Sistemler:</strong> Duygulardan arındırılmış, kural tabanlı ve disiplinli işlem modelleri.",
    "about.item2":
      "<strong class='about-item-lead'>İndikatör Mühendisliği:</strong> Piyasanın gürültüsünü filtreleyen, strateji odaklı teknik araçlar.",
    "about.item3":
      "<strong class='about-item-lead'>Seçici Hisse Analizi:</strong> Tahta dinamiklerini ve temel verileri teknolojiyle süzerek yapılan stratejik seçimler.",
    "about.block3Title": "Vizyonum: Disiplin ve Şeffaflık",
    "about.p3":
      "Piyasada küçük yatırımcının korunması ve finansal okuryazarlığın etik değerlerle birleşmesi en büyük önceliğimdir.",
    "quote.main":
      "Benim için borsa; sadece bir alım-satım platformu değil, doğru strateji ve çelik gibi bir iradeyle yönetilmesi gereken bir matematiksel sanattır.",
    "approach.title": "Operasyonel Metodoloji",
    "approach.a1.title": "Piyasa Mikroyapı Analizi",
    "approach.a1.text": "Makro veriler ve tahta yapıcı (market maker) davranışları üzerinden piyasa likiditesinin ve akümülasyon bölgelerinin analizi. Arz-talep dengesizliklerinin sayısal tespiti.",
    "approach.a2.title": "Sayısal Strateji ve Algoritmik Modelleme",
    "approach.a2.text": "İleri düzey teknik analiz metodolojilerinin, kural tabanlı algoritmik sistemlere dönüştürülmesi. Geçmiş veri simülasyonları (backtest) ile strateji optimizasyonu.",
    "approach.a3.title": "Dinamik Risk ve Portföy Disiplini",
    "approach.a3.text": "Değişen piyasa korelasyonlarına göre risk parametrelerinin anlık güncellenmesi. Sermaye koruma odaklı, dinamik pozisyon yönetimi ve performans denetimi.",
    "contact.title": "Stratejik İletişim ve Operasyon Hattı",
    "contact.text":
      'Ağa katılım değerlendirmeleri, algoritmik modelleme talepleri ve anlık bilgi akışı için doğrudan operasyon hattıyla <a class="contact-text-wa" href="https://wa.me/905472991993?text=Merhaba,%20stratejik%20dan%C4%B1%C5%9Fmanl%C4%B1k%20ve%20BETRADER%20terminali%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum" target="_blank" rel="noopener noreferrer" data-whatsapp-link>(Whatsapp)</a> irtibat kurabilirsiniz. Hızın ve kesintisiz iletişimin esas olduğu bu ekosistemde; kurumsal iş birlikleri, özel katılım talepleri ve resmi entegrasyonlar için E-posta ve WhatsApp ile iletişime geçebilirsiniz.',
    "contact.whatsappLine":
      '🟢 Operasyon Hattı (WhatsApp): <a href="https://wa.me/905472991993?text=Merhaba,%20stratejik%20dan%C4%B1%C5%9Fmanl%C4%B1k%20ve%20BETRADER%20terminali%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum" target="_blank" rel="noopener noreferrer" data-whatsapp-link>+90 547 299 19 93</a>',
    "contact.emailLine":
      '✉️ Kurumsal E-posta: <a href="mailto:info@boraecevit.com">info@boraecevit.com</a>',
    "contact.channelsTitle": "Resmi Kanallar",
    "vision.title": "Piyasa Vizyonu",
    "vision.lead":
      "Benim için borsa; sadece bir alım-satım platformu değil, doğru strateji ve çelik gibi bir iradeyle yönetilmesi gereken bir matematiksel sanattır.",
    "vision.detail":
      "Fiyat her şeyi içerir; ancak algoritmalar niyetleri deşifre eder. Biz, piyasadaki gürültünün içindeki gerçek sinyali trade ediyoruz.",
    "footer.disclaimer":
      "Bu platformda yer alan her türlü içerik, analiz ve algoritmik modelleme; kişisel görüşler ve teknik eğitim materyalleri kapsamında sunulmaktadır. 6362 sayılı Sermaye Piyasası Kanunu uyarınca 'Yatırım Danışmanlığı' teşkil etmez. Finansal kararlarınızı almadan önce yetkili kuruluşlardan profesyonel destek almanız önerilir. Tüm hakları saklıdır © 2026.",
    "footer.motto":
      "Veri pusuladır, disiplin ise sarsılmaz bir irade. Finansal geleceğinizi şansa değil, algoritmik stratejiye emanet edin.",
    "footer.description":
      "Piyasa zekasını disiplinli strateji ve veri odaklı metodoloji ile birleştiren profesyonel ekosistem.",
    "footer.quickLinksTitle": "Hızlı Linkler",
    "footer.channelsTitle": "Resmi Kanallar"
  },
  en: {
    "nav.services": "Strategies",
    "nav.about": "Experience",
    "nav.approach": "Methodology",
    "nav.contact": "Contact",
    "nav.memberCta": "Connect\u00A0to\u00A0Terminal",
    "member.title": "BETRADER Access Terminal",
    "member.text":
      "This network is reserved exclusively for privileged members and institutional partners who have completed the pre-approval process. System login privileges and operational screen connections are provisioned exclusively for investors admitted to the group.",
    "member.register": "Join Now",
    "member.login": "Connect\u00A0to\u00A0Terminal",
    "hero.eyebrow": "STRATEGIC ANALYSIS AND QUANTITATIVE MODELING TERMINAL",
    "hero.title": "In financial markets, <span class='hero-highlight'>mathematical discipline</span> and <span class='hero-highlight'>high technology</span>.",
    "hero.text":
      "A professional ecosystem built on data-driven market dynamics analysis, rule-based execution models, and advanced risk management discipline.",
    "hero.ctaPrimary": "Request a Meeting",
    "hero.ctaSecondary": "Explore Services",
    "hero.cardLabel": "Focus Areas",
    "hero.focus1": "Market Microstructure Decoding",
    "hero.focus2": "Quant Strategy Engineering",
    "hero.focus3": "Capital Protection and Risk Architecture",
    "hero.focus4": "Behavioral and Operational Discipline",
    "hero.trustNote": "Since 2012, where market experience meets technological innovation.",
    "services.title": "Services",
    "services.s1.title": "Corporate Data and Operational Intelligence Network",
    "services.s1.text":
      "The largest gains often take shape behind the scenes before the crowd notices. We refine our sector intelligence fabric and deep market analysis through algorithms. Our core objective is to detect hidden accumulation on the tape before the primary move begins—and to deliver consistent, market-beating Alpha opportunities every month to distinguished members of our closed groups.",
    "services.s2.title": "Algorithmic Signal Architecture",
    "services.s2.text":
      "We instantly identify mathematical downside breaks and micro- and macro-trend origins that human observation would miss—through proprietary indicator engineering. This infrastructure is equipped with unambiguous, interpretation-resistant, fully rule-based signals that leave nothing to chance—yielding operational certainty.",
    "services.s3.title": "Terminal and Closed Archive Library",
    "services.s3.text":
      "A proprietary hardware and strategy archive for distinguished members seeking institutional-grade edge beyond retail execution. Beyond our closed-circuit network's operational power, advanced technical briefings that decode market microstructure—and the proprietary BETrader algorithm library that filters market noise—are integrated exclusively onto privileged members' operational terminals.",
    "about.title": "About",
    "about.subtitle": "From Market Floors to Future Technology",
    "about.intro":
      "An ongoing journey since 2012, extending from trading floors to the speed of algorithms.",
    "about.p1":
      "Since I entered financial markets in 2012, I have observed them not only through numbers on a screen but through the dynamics that shape them. Relationships with professionals and experienced speculators gave me practical insight beyond textbooks.",
    "about.block1Title": "Analytical Strength from the Core",
    "about.p2":
      "I blended advanced technical analysis training with models I developed over the years. Beyond charts, I learned to read market-maker behavior, speculative psychology, and market structure through a sociological lens.",
    "about.block2Title": "Technology and Strategy: BoraEcevit-BETRADER",
    "about.item1":
      "<strong class='about-item-lead'>Algorithmic Systems:</strong> Rule-based and disciplined models free from emotions.",
    "about.item2":
      "<strong class='about-item-lead'>Indicator Engineering:</strong> Strategy-focused tools filtering market noise.",
    "about.item3":
      "<strong class='about-item-lead'>Selective Stock Analysis:</strong> Strategic selection by combining board dynamics with core data.",
    "about.block3Title": "Vision: Discipline and Transparency",
    "about.p3":
      "Protecting individual investors and strengthening financial literacy with ethical standards is my top priority.",
    "quote.main":
      "For me, the market is not just a trading platform; it is a mathematical art that must be managed with the right strategy and a steel-like discipline.",
    "approach.title": "Operational Methodology",
    "approach.a1.title": "Market Microstructure Analysis",
    "approach.a1.text": "Analyzing market liquidity and accumulation zones through macro data and market maker behavior. Quantitative detection of supply-demand imbalances.",
    "approach.a2.title": "Quant Strategy and Algorithmic Modeling",
    "approach.a2.text": "Transforming advanced technical analysis methodologies into rule-based algorithmic systems. Strategy optimization through historical simulations (backtests).",
    "approach.a3.title": "Dynamic Risk and Portfolio Discipline",
    "approach.a3.text": "Real-time updates of risk parameters according to changing market correlations. Dynamic position management and performance control centered on capital preservation.",
    "contact.title": "Strategic Communication and Operations Line",
    "contact.text":
      'For network admission reviews, algorithmic modeling requests, and real-time intelligence flow, you may reach the operations line directly via <a class="contact-text-wa" href="https://wa.me/905472991993?text=Hello,%20I%20would%20like%20to%20request%20a%20meeting%20regarding%20strategic%20consultancy%20and%20the%20BETRADER%20terminal" target="_blank" rel="noopener noreferrer" data-whatsapp-link>(WhatsApp)</a>. In this ecosystem where speed and uninterrupted communication are essential, please contact us by email or WhatsApp for institutional partnerships, special participation requests, and official integrations.',
    "contact.whatsappLine":
      '🟢 Operations line (WhatsApp): <a href="https://wa.me/905472991993?text=Hello,%20I%20would%20like%20to%20request%20a%20meeting%20regarding%20strategic%20consultancy%20and%20the%20BETRADER%20terminal" target="_blank" rel="noopener noreferrer" data-whatsapp-link>+90 547 299 19 93</a>',
    "contact.emailLine":
      '✉️ Corporate email: <a href="mailto:info@boraecevit.com">info@boraecevit.com</a>',
    "contact.channelsTitle": "Official Channels",
    "vision.title": "Market Vision",
    "vision.lead":
      "For me, the market is not just a trading platform; it is a mathematical art that must be managed with the right strategy and steel-like discipline.",
    "vision.detail":
      "Price reflects everything; however, algorithms decode intentions. We trade the real signal inside market noise.",
    "footer.disclaimer":
      "Legal Declaration: All content, analysis, and algorithmic modeling shared on this platform are provided as personal views and technical educational material. Under Capital Markets Law No. 6362, this does not constitute investment advisory services. Before making financial decisions, obtaining professional guidance from authorized institutions is strongly recommended. All rights reserved © 2026.",
    "footer.motto":
      "Data is the compass, discipline is the unwavering will. Entrust your financial future to algorithmic strategy, not chance.",
    "footer.description":
      "A professional ecosystem combining market intelligence with disciplined strategy and data-driven methodology.",
    "footer.quickLinksTitle": "QUICK LINKS",
    "footer.channelsTitle": "OFFICIAL CHANNELS"
  }
};

const html = document.documentElement;
const langButtons = document.querySelectorAll(".lang-btn");
const translatableItems = document.querySelectorAll("[data-i18n]");
const translatableHtmlItems = document.querySelectorAll("[data-i18n-html]");
const yearSpan = document.getElementById("year");
const bistStatusText = document.getElementById("bist-status-text");
const bistDot = document.getElementById("bist-dot");
const clockNy = document.getElementById("clock-ny");
const clockLon = document.getElementById("clock-lon");
const clockIst = document.getElementById("clock-ist");

function getClockLabel(date, timeZone) {
  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone
  }).format(date);
}

function getBistOpenState(date) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Europe/Istanbul"
  }).format(date);

  const timeParts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Istanbul"
  }).formatToParts(date);

  const hour = Number(timeParts.find((part) => part.type === "hour")?.value || "0");
  const minute = Number(timeParts.find((part) => part.type === "minute")?.value || "0");
  const totalMinutes = hour * 60 + minute;
  const isWeekday = weekday !== "Sat" && weekday !== "Sun";
  const isOpenSession = totalMinutes >= 9 * 60 + 40 && totalMinutes <= 18 * 60 + 10;

  return isWeekday && isOpenSession;
}

function updateInstitutionalTopBar() {
  if (!bistStatusText || !bistDot || !clockNy || !clockLon || !clockIst) return;

  const now = new Date();
  const isOpen = getBistOpenState(now);

  bistStatusText.textContent = `BIST: ${isOpen ? "AÇIK" : "KAPALI"}`;
  bistDot.classList.toggle("open", isOpen);
  bistDot.classList.toggle("closed", !isOpen);

  clockNy.innerHTML = `<span class="clock-city">NY</span> <span class="clock-time">${getClockLabel(now, "America/New_York")}</span>`;
  clockLon.innerHTML = `<span class="clock-city">LON</span> <span class="clock-time">${getClockLabel(now, "Europe/London")}</span>`;
  clockIst.innerHTML = `<span class="clock-city">IST</span> <span class="clock-time">${getClockLabel(now, "Europe/Istanbul")}</span>`;
}

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

  translatableHtmlItems.forEach((item) => {
    const key = item.dataset.i18nHtml;
    const value = activeDict[key];
    if (value) {
      item.innerHTML = value;
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.href = WHATSAPP_MEETING_URL[lang] || WHATSAPP_MEETING_URL.tr;
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
updateInstitutionalTopBar();
setInterval(updateInstitutionalTopBar, 1000);
