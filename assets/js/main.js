/* =========================================================
   Settings you may want to change
   ========================================================= */
const STATUS_CONFIG = {
  // IANA time zone for the clock, e.g. "Africa/Accra" or "Europe/London".
  // Leave as null to use each visitor's own local time.
  timeZone: null,
  onlineFrom: 9,   // 9:00 AM — status switches to ONLINE
  onlineUntil: 21, // 9:00 PM — status switches to OFFLINE
};

/* =========================================================
   Live clock + online/offline status (hero widget)
   ========================================================= */
(function statusWidget() {
  const el = document.querySelector("[data-status]");
  if (!el) return;
  const label = el.querySelector(".status-label");
  const time = el.querySelector(".status-time");

  function parts() {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true,
      ...(STATUS_CONFIG.timeZone ? { timeZone: STATUS_CONFIG.timeZone } : {}),
    });
    const hourFmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric", hourCycle: "h23",
      ...(STATUS_CONFIG.timeZone ? { timeZone: STATUS_CONFIG.timeZone } : {}),
    });
    const now = new Date();
    const p = Object.fromEntries(fmt.formatToParts(now).map((x) => [x.type, x.value]));
    return { h: p.hour, m: p.minute, ampm: p.dayPeriod.toUpperCase(), hour24: parseInt(hourFmt.format(now), 10) % 24 };
  }

  function render() {
    const { h, m, ampm, hour24 } = parts();
    const online = hour24 >= STATUS_CONFIG.onlineFrom && hour24 < STATUS_CONFIG.onlineUntil;
    el.classList.toggle("is-online", online);
    label.textContent = online ? "Online" : "Offline";
    time.innerHTML = `${h}:${m}<span class="ampm">${ampm}</span>`;
    time.setAttribute("datetime", new Date().toISOString());
  }

  render();
  // tick on each new minute, then every minute
  setTimeout(() => { render(); setInterval(render, 60000); }, (60 - new Date().getSeconds()) * 1000 + 50);
})();

/* =========================================================
   CTA code-texture background
   ========================================================= */
(function ctaCode() {
  const pre = document.querySelector(".cta-code");
  if (!pre) return;
  const words = ["const", "brand", "=", "identity", "{", "}", "return", "vision;", "design()", "=>", "grid", "type", "color:", "#04995E", "scale", "0x00", "render", "strategy", "/*", "*/", "let", "ideas", "[ ]", "fn", "if", "else", "null", "true", "::", "export", "logo.svg", "motion", "px", "...", "&&", "||", "01101", "brand.build()", "nyo"];
  function build() {
    const style = getComputedStyle(pre);
    const charW = parseFloat(style.fontSize) * 0.62;
    const lineH = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.35;
    const cols = Math.ceil(pre.clientWidth / charW) + 4;
    const rows = Math.ceil(pre.clientHeight / lineH) + 2;
    let out = "";
    for (let r = 0; r < rows; r++) {
      let line = "";
      while (line.length < cols) {
        line += Math.random() < 0.18 ? " ".repeat(1 + Math.floor(Math.random() * 6)) : words[Math.floor(Math.random() * words.length)] + " ";
      }
      out += line.slice(0, cols) + "\n";
    }
    pre.textContent = out;
  }
  build();
  let t;
  window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(build, 200); });
})();

/* =========================================================
   Process cards: drag to scroll on desktop
   ========================================================= */
(function dragScroll() {
  const track = document.querySelector(".process-track");
  if (!track) return;
  let down = false, startX = 0, startLeft = 0;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    down = true; startX = e.clientX; startLeft = track.scrollLeft;
    track.classList.add("is-dragging");
  });
  window.addEventListener("pointermove", (e) => { if (down) track.scrollLeft = startLeft - (e.clientX - startX); });
  window.addEventListener("pointerup", () => { down = false; track.classList.remove("is-dragging"); });
})();
