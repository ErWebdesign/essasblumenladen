(() => {
  "use strict";

  /* ---------- Mobiles Menü ---------- */
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    const setzeMenue = (offen) => {
      burger.setAttribute("aria-expanded", String(offen));
      burger.setAttribute("aria-label", offen ? "Menü schließen" : "Menü öffnen");
      nav.classList.toggle("is-open", offen);
    };

    burger.addEventListener("click", () => {
      setzeMenue(burger.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setzeMenue(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setzeMenue(false);
        burger.focus();
      }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => {
      if (e.matches) setzeMenue(false);
    });
  }

  /* ---------- Öffnungszeiten: Live-Status ---------- */
  // Minuten seit Mitternacht, 0 = Sonntag
  const ZEITEN = {
    0: [12 * 60 + 30, 19 * 60],
    1: [9 * 60 + 30, 20 * 60],
    2: [9 * 60 + 30, 20 * 60],
    3: [9 * 60 + 30, 20 * 60],
    4: [9 * 60 + 30, 20 * 60],
    5: [9 * 60 + 30, 20 * 60],
    6: [9 * 60 + 30, 20 * 60],
  };
  const uhrzeit = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

  const jetztInHamburg = () => {
    const teile = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Berlin",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const wert = (typ) => teile.find((t) => t.type === typ).value;
    return {
      tag: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wert("weekday")),
      minute: Number(wert("hour")) * 60 + Number(wert("minute")),
    };
  };

  try {
    const { tag, minute } = jetztInHamburg();
    const [auf, zu] = ZEITEN[tag];
    let text;
    let zustand;

    if (minute >= auf && minute < zu) {
      text = `Jetzt geöffnet · heute bis ${uhrzeit(zu)} Uhr`;
      zustand = "is-offen";
    } else if (minute < auf) {
      text = `Noch geschlossen · öffnet heute um ${uhrzeit(auf)} Uhr`;
      zustand = "is-zu";
    } else {
      text = `Gerade geschlossen · öffnet morgen um ${uhrzeit(ZEITEN[(tag + 1) % 7][0])} Uhr`;
      zustand = "is-zu";
    }

    document.querySelectorAll("[data-status]").forEach((el) => {
      el.textContent = text;
      el.classList.add(zustand);
    });

    document.querySelectorAll(`.zeiten tr[data-tag="${tag}"]`).forEach((zeile) => {
      zeile.classList.add("is-heute");
      const marke = document.createElement("span");
      marke.className = "heute";
      marke.textContent = "heute";
      zeile.querySelector("th").append(marke);
    });
  } catch (fehler) {
    // Ohne Intl-Unterstützung bleibt die statische Zeitangabe stehen.
  }

  /* ---------- Papierwahl im Hero ---------- */
  const bloom = document.querySelector(".bloom");
  const knoepfe = document.querySelectorAll("[data-papier-wahl]");

  knoepfe.forEach((knopf) => {
    knopf.addEventListener("click", () => {
      if (!bloom || bloom.dataset.papier === knopf.dataset.papierWahl) return;
      bloom.dataset.papier = knopf.dataset.papierWahl;
      knoepfe.forEach((k) => k.setAttribute("aria-pressed", String(k === knopf)));
      bloom.classList.remove("is-neu");
      void bloom.offsetWidth; // Animation neu starten
      bloom.classList.add("is-neu");
    });
  });

  /* ---------- Google-Karte erst nach Klick ---------- */
  const kartenKnopf = document.querySelector("[data-karte-laden]");

  if (kartenKnopf) {
    kartenKnopf.addEventListener("click", () => {
      const box = kartenKnopf.closest(".karte-box");
      const rahmen = document.createElement("iframe");
      rahmen.src =
        "https://www.google.com/maps?q=" +
        encodeURIComponent("Essas Blumen, Lübecker Str. 76, 22087 Hamburg") +
        "&output=embed";
      rahmen.title = "Google-Karte: Essas Blumen, Lübecker Straße 76, 22087 Hamburg";
      rahmen.referrerPolicy = "strict-origin-when-cross-origin";
      rahmen.allowFullscreen = true;
      box.replaceChildren(rahmen);
      box.classList.add("is-geladen");
    });
  }
})();
