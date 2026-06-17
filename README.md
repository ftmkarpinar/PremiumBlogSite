# Fatma Karpınar — Personal Portfolio

> Kişisel portföy sitesi · Vanilla HTML / CSS / JS · No framework required

---

## Genel Bakış

Software Developer Fatma Karpınar'ın kişisel portföy sitesi. WebGL shader arka plan, interaktif 3D Spline sahnesi ve editorial dark tasarım diliyle premium bir deneyim sunar.

**Canlı:** `file:///…/aideneme/index.html` (lokal) ya da herhangi bir static hosting servisine deploy edilebilir.

---

## Özellikler

- **WebGL Shader Arka Plan** — GPU üzerinde çalışan gerçek zamanlı 3D tünel animasyonu
- **İnteraktif 3D Robot** — Spline ile mouse'u takip eden robot sahnesi
- **Spotlight Efekti** — Spline kartında mouse'a göre hareket eden glow
- **Scroll Reveal** — Sayfaya kaydıkça öğeler fade-in ile beliriyor
- **Scroll Spy** — Navbar aktif bölümü otomatik işaretliyor
- **Skills Marquee** — Teknik yetkinlikler sonsuz döngüde kayan şerit
- **CV İndirme** — Tek tıkla PDF indirme
- **İletişim Formu** — Client-side validasyonlu form
- **Tam Responsive** — Mobil, tablet ve masaüstü uyumlu
- **Accessibility** — `aria-label`, `aria-hidden`, semantic HTML

---

## Proje Yapısı

```
aideneme/
├── index.html              # Ana sayfa
├── css/
│   └── style.css           # Tüm stiller (design tokens, layout, responsive)
├── js/
│   ├── main.js             # Navbar, scroll reveal, form, spotlight
│   └── shader-bg.js        # WebGL2 shader renderer
├── assets/
│   ├── FatmaKarpinar-CV.pdf
│   └── images/
│       ├── hero-photo.jpg  # About bölümü fotoğrafı
│       └── about-photo.jpg # Hero bölümü fotoğrafı
└── references/             # Geliştirme referans dosyaları
```

---

## Teknoloji

| Katman | Teknoloji |
|--------|-----------|
| Markup | HTML5 (Semantic) |
| Stil | CSS3 (Custom Properties, Grid, Flexbox) |
| Script | Vanilla JavaScript (ES6+) |
| 3D Sahne | [Spline Viewer](https://spline.design) Web Component |
| Shader | WebGL2 / GLSL — *Grid Run* by Matthias Hurrle |
| İkonlar | Font Awesome 6.5 |
| Fontlar | Syne (display) · Inter (body) — Google Fonts |

---

## Kurulum

Herhangi bir build tool veya paket yöneticisi gerekmez.

```bash
# Projeyi klonla
git clone https://github.com/ftmkarpinar/portfolio.git
cd portfolio

# Doğrudan tarayıcıda aç
open index.html

# Veya lokal sunucu ile (önerilen — Spline CORS gerektirir)
npx serve .
# ya da
python3 -m http.server 3000
```

> **Not:** Spline 3D sahnesi CDN'den yüklendiği için internet bağlantısı gerektirir. Lokal sunucu kullanmak CORS hatalarını önler.

---

## Bölümler

| # | ID | İçerik |
|---|----|--------|
| — | `#hero` | Karşılama, başlık, CTA butonlar, sosyal linkler |
| 01 | `#about` | Kısa biyografi, fotoğraf, detay tablosu |
| — | `#interactive` | Spline 3D interaktif robot kartı |
| 02 | `#experience` | İş deneyimleri (İEA Bootcamp, FHT, THY) |
| 03 | `#projects` | Tamamlanan projeler |
| — | `#skills` | Teknik yetkinlikler marquee |
| 04 | `#education` | Eğitim bilgisi |
| 05 | `#contact` | İletişim bilgileri + form |

---

## Design Tokens

Tüm renkler ve değişkenler `css/style.css` başında `:root` bloğunda tanımlıdır:

```css
--bg: #0a0a0a          /* Ana arka plan */
--accent: #e8c87a      /* Altın vurgu rengi */
--text: #f5f0eb        /* Ana metin */
--text-secondary: #bfb5a8
--border: #252525
--font-display: 'Syne'
--font-body: 'Inter'
```

---

## Responsive Breakpoints

| Breakpoint | Hedef |
|------------|-------|
| `> 968px` | Desktop tam layout |
| `≤ 968px` | Tablet — about grid daralır, exp tek sütun |
| `≤ 768px` | Mobil — hero tek sütun, hamburger menü |
| `≤ 600px` | Küçük mobil — about grid tek sütun |
| `≤ 480px` | XS — font ve padding küçülmeler |

---

## Deploy

Statik dosyalardan oluştuğu için herhangi bir platformda çalışır:

- **GitHub Pages** — `Settings > Pages > Deploy from branch`
- **Netlify** — klasörü sürükle & bırak
- **Vercel** — `vercel --prod`

---

## Lisans

Bu proje kişisel kullanım amaçlıdır. Kaynak koda referans vererek ilham alabilirsiniz.

---

<p align="center">Made with ♥ in İstanbul · <a href="mailto:fatma.softeng@gmail.com">fatma.softeng@gmail.com</a></p>
