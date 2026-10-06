# CLAUDE.md — Website Design Standards

This file governs how you build websites in this project. The goal is a site that looks
**deliberately designed by a human studio**, not generated. Every rule below exists to keep
the output from sliding into the default "AI / vibe-coded" look. Follow it on every build.

---

## 0. The one rule that matters most

If a stranger could glance at the page for two seconds and say "an AI made this," you have
failed, regardless of whether the code works. Distinctiveness and restraint are the job, not
a bonus. When in doubt, make a *specific* choice tied to the subject instead of a safe,
generic one.

---

## 1. Hard bans (never ship these)

These are the fingerprints of a vibe-coded site. Do not use them.

- **No purple/violet/indigo as the primary brand color.** This is the single biggest tell.
  Avoid `#7c3aed`, `#8b5cf6`, `#a855f7`, `#6366f1` and their neighbors as the dominant hue.
- **No purple-to-blue or purple-to-pink gradients** anywhere — backgrounds, buttons, or text.
- **No gradient-filled headline words** (e.g. one word in the headline tinted with a
  color gradient while the rest is dark). This is everywhere in generated sites.
- **No meaningless stat blocks** — the "25% · 95% · 2025" row of giant numbers with vague
  labels. Only show a number if it is real and sourced.
- **No emoji inside headings or section titles** (🚀 ✨ 🔒 etc.). Use real iconography instead,
  and use it sparingly.
- **No "Why Choose [Brand]?" sections.** Same for "Transform your X into Y," "Start it. Build
  it. Launch it." and other interchangeable SaaS slogans.
- **No glassmorphism by default** — frosted translucent cards with heavy blur and soft glow.
- **No pill-badge clutter** ("99.9% Uptime", "GDPR Compliant", "24/7 Support 🔒") stacked under
  the hero.
- **No default centered-everything layout** with a single column of centered text from top to
  bottom. Use real composition.
- **No raw system font / unstyled Inter** as the entire type system (see §3).
- **No rainbow of soft drop shadows** on every card. Shadow is an accent, not a texture.

If a design brief or reference *explicitly* asks for one of these (e.g. the client genuinely
wants purple), the brief wins — but confirm it's intentional, and execute it with care so it
still looks designed rather than defaulted.

---

## 2. Follow the user's references first

If the user provides design examples, screenshots, links, or a brand, **those override
everything below except the hard bans.** Before designing:

1. Identify the reference's palette (pull actual hex values), type style, spacing rhythm,
   and the one signature move that makes it feel like itself.
2. Match that direction. Do not "improve" it toward a generic look.
3. If the reference conflicts with a hard ban (e.g. it's purple), tell the user and ask
   whether to match it or adapt it.

No references provided? Then pin the brief yourself: name the concrete subject, its audience,
and the page's single job, and design specifically for that.

---

## 3. Typography (always beautiful, always intentional)

Type carries the personality. Never leave it as a default.

- **Pair two faces with intent:** a characterful display/heading face used with restraint,
  plus a clean, legible body face. Optionally a third utility face for captions or data.
- **Avoid the tired defaults** as your whole system: plain Inter, Roboto, Open Sans, system-ui.
  They're fine as a *body* in some briefs, but pair them with a real display face and a
  deliberate scale.
- **Good starting palettes** (mix display + body, pick to fit the subject, not by habit):
  - Editorial / trustworthy: *Fraunces* or *Libre Caslon* display + *Inter Tight* body
  - Modern / technical: *Space Grotesk* or *General Sans* + *IBM Plex Sans*
  - Warm / human: *Bricolage Grotesque* + *Source Serif* body
  - Sharp / premium: *Geist* or *Satoshi* + *Newsreader* for long copy
- **Set a real type scale.** Define explicit sizes, weights, line-heights, and letter-spacing.
  Headlines get tighter leading and tracking; body copy gets generous line-height (~1.5–1.7).
- **Load fonts properly:** always self-host (download the font files, embed via `@font-face`).
  Never load from fonts.googleapis.com, fonts.gstatic.com or any other font CDN (privacy, see §11).
  Set `font-display: swap` and always declare fallbacks.

---

## 4. Color

- **Choose a palette of 4–6 named hex values** derived from the subject or reference — not a
  framework default.
- Anchor on a confident neutral base, add **one** disciplined accent, and use it sparingly.
- Ensure text/background contrast meets **WCAG AA** (4.5:1 for body, 3:1 for large text).
- If you want energy, get it from composition, type, and a single bold accent — not from a
  gradient.

---

## 5. Layout & composition

- The hero is a thesis: open with the most characteristic thing about the subject, not a
  centered slogan + two buttons + stat row.
- Use real composition — asymmetry, an editorial grid, intentional whitespace. Vary section
  rhythm; don't stack identical centered blocks.
- Structural devices (numbers, eyebrows, dividers, labels) must encode something true.
  Don't add `01 / 02 / 03` unless the content is genuinely a sequence.
- Match complexity to the vision: minimal directions need precise spacing and detail;
  maximal directions need committed execution.

---

## 6. Motion (optional, never decorative)

- Use motion only where it serves the subject: a considered page-load reveal, a scroll-
  triggered moment, a subtle hover micro-interaction.
- One orchestrated moment beats scattered effects. Excess animation reads as AI-generated.
- Always respect `prefers-reduced-motion`.

---

## 7. Responsive: desktop AND mobile, every time

Non-negotiable. The site must look intentional at every width.

- **Build mobile-first**, then scale up. Test at minimum **375px, 768px, 1024px, 1440px**.
- Type, spacing, and layout all adapt — don't just let a desktop layout shrink.
- Tap targets ≥ 44×44px; no horizontal scroll; no overlapping or clipped elements on small
  screens.
- Images and media are responsive (`max-width: 100%`, correct aspect ratios, sensible
  `srcset` where relevant).
- Navigation collapses sensibly on mobile (and the mobile menu actually works).

---

## 8. Quality floor (build this in silently)

- Visible keyboard focus states on all interactive elements.
- Semantic HTML, alt text on meaningful images, labelled form controls.
- `prefers-reduced-motion` respected.
- Watch CSS specificity — don't let `.section` and element selectors cancel each other's
  padding/margins. Verify spacing actually applies.

---

## 9. Always check your work when done

After building, **do a real review pass before calling it finished.** Do not just stop when
the code runs.

1. **Screenshot / preview** the page at desktop and mobile widths if the environment allows.
   A picture is worth 1000 tokens.
2. **Run the vibe-code checklist** below. If any box is checked, fix it.
3. **Read your own copy** — does it sound like an interchangeable SaaS template? Rewrite it
   to be specific and plain.
4. **Click through** key interactions (nav, mobile menu, buttons, forms) and confirm they work.
5. Apply Chanel's rule: look at the finished page and remove one thing that isn't earning its
   place.
6. Run the full technical check in §12 (Abschluss-Check) — it is mandatory.
7. Report back what you checked and what you changed, in the format described in §12.

### Vibe-code checklist (every item must be NO)
- [ ] Is purple/violet the dominant color?
- [ ] Are there any purple/blue/pink gradients?
- [ ] Are any headline words gradient-filled?
- [ ] Is there a row of giant meaningless stats?
- [ ] Are there emoji in headings?
- [ ] Is there a "Why Choose us?" or generic SaaS-slogan section?
- [ ] Is everything centered in one column?
- [ ] Is the type just default Inter/system with no display face?
- [ ] Do cards have frosted-glass + soft-glow styling?
- [ ] Does it break or look unstyled on mobile?

---

## 10. Process summary

Brainstorm → pin the brief / match the reference → draft a small token system (color, type,
layout, one signature element) → critique the plan against this file (would I produce this for
*any* site? then change it) → build → check your work (§9) → critique again.

Distinctiveness comes from the subject. Restraint makes it look designed. Beautiful type and a
clean responsive build are the floor, not the goal.

---

## 11. Projektregeln (gelten für jede Website)

Die Website ist immer komplett auf Deutsch, auch alt-Texte, aria-labels und Button-Texte.
Fragen an mich ebenfalls auf Deutsch.

### Fakten und Platzhalter
- Keine erfundenen Fakten. Fehlt eine Info (Preise, Zahlen, Nummern, Zertifizierungen,
  Öffnungszeiten-Details o. ä.), klar erkennbarer Platzhalter in eckigen Klammern,
  z. B. [PREIS EINFÜGEN] oder [DETAILS EINFÜGEN].
- Platzhalter nur als sichtbarer Text, niemals in href-, src- oder content-Attributen.
- Keine internen Arbeitsnotizen im sichtbaren Text.
- Bilder, die nur als Datenquelle dienen (z. B. Google-Maps-Screenshots), nicht in die
  Website einbauen, sondern nur die Infos daraus übernehmen.

### Buttons und Links
- Kein Button/Link darf ins Leere führen (href="#" oder Fehlerseite), ohne dass ich es weiß.
- Brauchst du einen echten Link (Google-Rezensionen, Buchung, Social Media) und kannst ihn
  nicht selbst herausfinden: frag mich kurz, BEVOR du den Code schreibst.
- Nur nach Dingen fragen, die ich in unter 2 Minuten nachschauen kann. Alles andere
  (Impressum-Daten, Preise, Öffnungszeiten) bleibt Platzhalter.
- Antworte ich nicht: Button führt lieber zu einem sichtbaren Platzhaltertext
  ("Rezensionen folgen") als zu einem toten Link.
- Wenn sinnvoll: Button zu den Google-Maps-Rezensionen einbauen.

### Datenschutz und Cookies
- Schriften lokal per @font-face, keine Verbindung zu fonts.googleapis.com oder fonts.gstatic.com.
- Google-Maps-Karte erst nach Klick auf einen Button ("Karte laden") laden, nie automatisch.
- Keine Cookies außer technisch zwingend notwendigen.
- Kein Google Analytics, kein Facebook-Pixel, keine Tracking-Skripte, auch nicht auf
  späteren Kundenwunsch, ohne vorher Rücksprache mit mir.
- Wird Tracking gewünscht: mich vorher informieren, dass dann ein Cookie-Banner mit echtem
  "Ablehnen"-Button (gleich prominent wie "Akzeptieren") Pflicht wird.

### Rechtstexte
- Impressum und Datenschutz als eigene Unterseiten (impressum.html,
  datenschutz.html), im Footer jeder Seite verlinkt, mit gleichem
  Header/Footer wie die Startseite.
- KEINE eigenen Rechtstexte schreiben. Die Texte werden später mit einem
  Generator (z. B. e-recht24) erstellt und von mir nachgereicht.
- Inhalt der beiden Seiten vorerst nur: Überschrift (H1) und ein
  sichtbarer Platzhalter, z. B. [IMPRESSUM – TEXT AUS GENERATOR EINFÜGEN]
  bzw. [DATENSCHUTZERKLÄRUNG – TEXT AUS GENERATOR EINFÜGEN].
- Das Layout der Seiten so bauen, dass längerer Fließtext mit
  Zwischenüberschriften gut lesbar ist (max. Zeilenbreite ca. 70 Zeichen).

### Rezensionen
- Keine wörtlichen Google-Rezensionen mit Namen.

### SEO und technische Basis
- <title>: Firmenname + Leistung + Stadt.
- Meta-Description: 150–160 Zeichen, konkret, mit Ort und Leistungen.
- Genau eine H1, darunter H2 für Abschnitte.
- Beschreibende Alt-Texte bei allen Bildern.
- Schema.org LocalBusiness als JSON-LD im <head>.
- Open Graph Tags im <head> (Details zu og:url/og:image siehe §12, Punkt 18).
- Bilder komprimiert und in mehreren Größen (srcset).
- Mobile zuerst: alles muss auf 375px funktionieren.

### Schrift und Lesbarkeit
- Fließtext mindestens font-weight 400, besser 450–500.
- Kontraste prüfen (WCAG AA, siehe §4).

---

## 12. Abschluss-Check (Pflicht, bevor du mir das Ergebnis zeigst)

Wenn du glaubst, fertig zu sein: Geh JEDEN Punkt unten durch. Prüfe ihn direkt im Code oder
per Befehl, nicht aus dem Gedächtnis. Ist ein Punkt nicht erfüllt: beheben und danach erneut
prüfen. Maximal 3 Durchgänge. Wenn danach noch etwas offen ist, sag mir was und warum.

### A. Bilder und Ladezeit
1. Alle ausgelieferten Bilder als WebP, jede Datei max. 200 KB.
   Test: `find . -type f \( -iname "*.webp" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -not -path "./node_modules/*" -size +200k`
   → muss leer sein (Originalbilder in einen Ordner legen, der nicht eingebunden wird;
   Ausnahme: og:image-Bild).
2. Keine JPG/PNG im HTML eingebunden (Ausnahme: og:image, Favicon).
   Test: `grep -nE 'src(set)?="[^"]+\.(jpe?g|png)' *.html` → leer.
3. Jedes <img> hat alt, width, height und srcset mit mind. 2 Größen (z. B. 800w und 1600w).
4. Hero-Bild: fetchpriority="high", KEIN loading="lazy", preload-Link im <head>.
   Alle anderen Bilder: loading="lazy".
5. Schriften lokal per @font-face mit font-display: swap. Die wichtigste Schrift per
   `<link rel="preload" as="font" type="font/woff2" crossorigin>` vorladen.

### B. Datenschutz
6. Keine Verbindung zu Google Fonts, keine Tracker.
   Test: `grep -rniE 'fonts\.googleapis|fonts\.gstatic|googletagmanager|gtag\(|google-analytics|fbq\(|facebook\.net' --include=*.html --include=*.css --include=*.js .`
   → muss leer sein.
7. Google-Maps-iframe steht NICHT im HTML, sondern wird erst nach Klick auf "Karte laden"
   per JavaScript erzeugt. Kurzer Hinweis zur Datenübertragung neben dem Button.
   Test: `grep -n '<iframe' *.html` → leer.
8. Keine Cookies, kein localStorage/sessionStorage.

### C. Links und Platzhalter
9. Kein toter Link. Test: `grep -nE 'href="#?"' *.html` → leer.
   Jeder Anker-Link (#abschnitt) hat eine passende id auf der Seite.
10. Keine Platzhalter in Attributen.
    Test: `grep -nE '(href|src|srcset|content)="[^"]*\[' *.html` → leer.
11. Keine internen Arbeitsnotizen im sichtbaren Text (z. B. "mit Kunde abstimmen",
    "laut Kategorie", "TODO", "bitte ergänzen"). Platzhalter nur im Format [ETWAS EINFÜGEN].
12. tel:-Links im Format tel:+49..., Maps- und Rezensionen-Links führen zum richtigen Betrieb.
13. impressum.html und datenschutz.html existieren, sind im Footer JEDER Seite verlinkt und
    haben denselben Header/Footer wie die Startseite.

### D. SEO
14. Genau eine <h1> pro Seite. Test: `grep -c '<h1' index.html` → 1.
15. <title> = Firmenname + Leistung + Stadt. Meta-Description 150–160 Zeichen: per Befehl
    zählen und die Zahl im Bericht angeben.
16. `<html lang="de">`, meta viewport, Favicon vorhanden.
17. JSON-LD LocalBusiness (passender Untertyp, z. B. AutoRepair, NailSalon, Locksmith).
    Muss gültiges JSON sein: mit node oder python parsen. Keine erfundenen Werte, fehlende
    Felder weglassen statt Platzhalter reinschreiben.
18. Open Graph: og:title und og:description setzen. og:url und og:image brauchen eine
    absolute URL, die es vor dem Hochladen noch nicht gibt: diese zwei Tags erstmal
    weglassen und im Abschlussbericht vermerken. Das og:image-Bild (1200×630, als JPG)
    trotzdem schon erstellen und im Projektordner ablegen.

### E. Darstellung und Lesbarkeit
19. Fließtext font-weight mind. 400, Schriftgröße mind. 16px auf Mobil.
20. Mobil-Test mit Playwright: Seite bei 375px Breite laden, prüfen dass
    `document.documentElement.scrollWidth <= 375` (kein seitliches Scrollen).
    Screenshots bei 375px, 768px, 1024px und 1440px machen und selbst anschauen.
    Buttons und Links mind. 44px hoch. Mobiles Menü öffnen und schließen testen.

### F. Lighthouse (echte Messung)
21. Lokalen Server starten (`npx serve . -l 3000`), dann:
    `npx lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./lighthouse.json --chrome-flags="--headless"`
    Ziel: alle vier Werte mind. 90, LCP unter 2,5 s, CLS unter 0,1, keine Kontrastfehler.
    Alles darunter beheben und neu messen. lighthouse.json und Screenshots danach löschen.

### G. Inhalt
22. Alle Daten aus den Google-Maps-Screenshots übernommen (Name, Adresse, Telefon,
    Öffnungszeiten, Bewertungsschnitt und Anzahl). Keine erfundenen Fakten.
    Keine wörtlichen Rezensionen mit Namen.
23. Vibe-code-Checkliste aus §9: jeder Punkt NEIN.

### Abschlussbericht an mich
- Tabelle: Punkt | erfüllt ja/nein | was geändert
- Lighthouse-Werte (Mobil) inkl. LCP
- Liste aller offenen Platzhalter + was ich beim Kunden abfragen muss
- Welche Links ich noch liefern muss
- Erinnerung: og:url und og:image nach dem Hochladen eintragen
- Erinnerung: Impressum und Datenschutz mit Generator erstellen und einfügen
