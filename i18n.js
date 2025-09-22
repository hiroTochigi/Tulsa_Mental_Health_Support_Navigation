function detectLang() {
  const url = new URL(location.href);
  const qp = url.searchParams.get("lang");
  if (qp) return qp.toLowerCase();
  const saved = localStorage.getItem("lang");
  if (saved) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("ja") ? "ja" : nav.startsWith("es") ? "es" : "en";
}

let CURRENT_LANG = detectLang();

async function loadDict(lang) {
  const supported = ["ja", "en", "es"];
  if (!supported.includes(lang)) lang = "en";
  const res = await fetch(`/locales/${lang}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error("i18n load failed: " + res.status);
  return res.json();
}

function getI18n(dict, key) {
  if (key in dict) return dict[key]; // ← フラットキー優先
  // fallback: ネストオブジェクトにも対応
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), dict);
}

// --- ここが重要（バグ修正後の適用関数）---
function applyI18n(dict) {
  document.documentElement.setAttribute("lang", CURRENT_LANG);

  // 1) 本文(innerHTML)置換
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key || key === "-") return; // "-" を付けたらスキップできるオプション
    const val = getI18n(dict, key);
    console.log(`i18n: ${key} -> ${val}`);
    if (val != null) el.innerHTML = val;
  });

  // 2) 属性置換: data-i18n-attr="attr:key, attr2:key2"
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const pairs = el
      .getAttribute("data-i18n-attr")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const p of pairs) {
      const [attr, key] = p.split(":").map((s) => s.trim());
      if (!attr || !key) continue;
      const val = get(dict, key);
      if (val != null) el.setAttribute(attr, val);
    }
  });
}

async function setLang(lang) {
  try {
    CURRENT_LANG = lang;
    const dict = await loadDict(lang);
    applyI18n(dict);
    localStorage.setItem("lang", lang);
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setLang(CURRENT_LANG);
  document.querySelectorAll("[data-setlang]").forEach((btn) => {
    btn.addEventListener("click", () =>
      setLang(btn.getAttribute("data-setlang"))
    );
  });
});
