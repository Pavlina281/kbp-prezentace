(function () {
  const data = window.KBP;
  const app = document.getElementById("app");
  if (!data || !app) return;

  const VZHLED = {
    "01": "titul",
    "02": "citace",
    "03": "otazka",
    "04": "claim",
    "05": "dum",
    "06": "model",
    "07": "ctyri",
    "08": "role",
    "09": "cesta",
    "10": "archetyp",
    "11": "princip",
    "12": "tabulka",
    "13": "ctyri",
    "14": "ctyri",
    "15": "tabulka",
    "16": "dekuj"
  };

  const slides = data.slidy;
  let index = 0;
  let slideNodes = [];

  document.title = data.chrome.titulek;

  const ns = "http://www.w3.org/2000/svg";

  function icon(path) {
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const p = document.createElementNS(ns, "path");
    p.setAttribute("d", path);
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "currentColor");
    p.setAttribute("stroke-width", "1.7");
    p.setAttribute("stroke-linecap", "round");
    p.setAttribute("stroke-linejoin", "round");
    svg.append(p);
    return svg;
  }

  function h(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(function (pair) {
      const key = pair[0];
      const value = pair[1];
      if (value == null || value === false) return;
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key === "html") node.innerHTML = value;
      else node.setAttribute(key, value);
    });
    (children || []).forEach(function (child) {
      if (child == null || child === false) return;
      node.append(child.nodeType ? child : document.createTextNode(String(child)));
    });
    return node;
  }

  function block(tag, className, text, id) {
    const node = h(tag, { class: className, id: id || null });
    String(text || "").split("\n").forEach(function (line, i) {
      if (i) node.append(h("br"));
      node.append(document.createTextNode(line));
    });
    return node;
  }

  function kicker(text) {
    return text ? h("p", { class: "kicker", text: text }) : null;
  }

  function logo(className) {
    return h("img", { class: className, src: "KBP_white.svg", alt: "KBP", width: "291", height: "60" });
  }

  function lead(text) {
    const parts = String(text || "").split("\n").filter(function (line) { return line.trim(); });
    if (parts.length < 2) return block("p", "slide-lead", text);
    return h("div", { class: "slide-lead" }, parts.map(function (line) {
      return h("p", { text: line });
    }));
  }

  function externalLink(label, href) {
    return h("a", {
      class: "source-link",
      href: href,
      text: label,
      target: "_blank",
      rel: "noopener noreferrer"
    });
  }

  function renderMaterialy(items) {
    if (!items || !items.length) return null;
    return h("div", { class: "sources" }, items.map(function (item) {
      const actions = [];
      if (item.puvodni && item.puvodni.url) {
        actions.push(externalLink(item.puvodni.popisek || "Původní článek", item.puvodni.url));
      }
      if (item.navrh) {
        const href = item.navrh.nahled || item.navrh.soubor;
        if (href) {
          const link = h("a", {
            class: "source-link",
            href: href,
            text: item.navrh.popisek || "Navržený text"
          });
          if (item.navrh.nahled) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
          }
          actions.push(link);
        }
        if (item.navrh.soubor) {
          actions.push(h("a", {
            class: "source-link source-link--quiet",
            href: item.navrh.soubor,
            text: "DOCX",
            download: ""
          }));
        }
      }
      return h("article", { class: "card source-card" }, [
        h("h3", { class: "card-title", text: item.titulek }),
        h("div", { class: "source-actions" }, actions)
      ]);
    }));
  }

  function card(item, className) {
    return h("article", { class: className || "card" }, [
      kicker(item.kicker),
      item.titulek ? h("h3", { class: "card-title", text: item.titulek }) : null,
      item.text ? h("p", { class: "card-text", text: item.text }) : null
    ]);
  }

  function nodeBox(item) {
    return h("article", { class: "node" }, [
      kicker(item.kicker),
      item.titulek ? h("h3", { class: "node-title", text: item.titulek }) : null,
      item.text ? h("p", { class: "node-text", text: item.text }) : null
    ]);
  }

  function byKlic(slide, klic) {
    return (slide.karty || []).filter(function (item) { return item.klic === klic; });
  }

  function head(slide) {
    return h("header", { class: "slide-head" }, [
      kicker(slide.kicker),
      block("h2", "slide-title", slide.titulek, "h-" + slide.id),
      slide.text ? lead(slide.text) : null
    ]);
  }

  function shell(slide, body) {
    const inner = [head(slide)];
    if (body) inner.push(body);
    if (slide.zaver) inner.push(h("p", { class: "zaver", text: slide.zaver }));
    if (slide.podpis) inner.push(h("p", { class: "sign", text: slide.podpis }));
    if (slide.poznamka) inner.push(h("p", { class: "note", text: slide.poznamka }));
    return h("section", {
      class: "slide slide--" + (VZHLED[slide.id] || "text"),
      id: "slide-" + slide.id,
      "aria-labelledby": "h-" + slide.id
    }, [h("div", { class: "slide-inner" }, inner)]);
  }

  function renderCitace(slide) {
    return shell(slide, h("div", { class: "grid-2" }, (slide.karty || []).map(function (item) {
      return card(item);
    })));
  }

  function renderOtazka(slide) {
    const names = String(slide.znacky || "").split(",").map(function (name) {
      return name.trim();
    }).filter(Boolean);
    const chips = h("div", { class: "chips" }, names.map(function (name) {
      return h("span", { class: "chip", text: name });
    }));
    const statements = h("div", { class: "grid-2" }, byKlic(slide, "vyrok").map(function (item) {
      return card(item);
    }));
    return shell(slide, h("div", { class: "stack" }, [chips, statements]));
  }

  function renderDefinice(slide) {
    return shell(slide, h("div", { class: "cards" }, (slide.karty || []).map(function (item) {
      return card(item);
    })));
  }

  function renderModel(slide) {
    const top = byKlic(slide, "kbp")[0];
    const middle = ["vyvoj", "vyroba", "produkty"].map(function (key) {
      return byKlic(slide, key)[0];
    }).filter(Boolean);
    const bottom = byKlic(slide, "trh")[0];
    return shell(slide, h("div", { class: "model" }, [
      top ? nodeBox(top) : null,
      h("div", { class: "stem" }),
      h("div", { class: "model-row" }, middle.map(nodeBox)),
      h("div", { class: "stem" }),
      bottom ? nodeBox(bottom) : null
    ]));
  }

  function renderDum(slide) {
    const base = byKlic(slide, "zaklad")[0];
    const rooms = byKlic(slide, "pokoj");
    const out = byKlic(slide, "vystup")[0];
    return shell(slide, h("div", { class: "dum" }, [
      base ? (function () { const box = nodeBox(base); box.classList.add("foundation"); return box; })() : null,
      h("div", { class: "stem" }),
      h("div", { class: "rooms" }, rooms.map(nodeBox)),
      h("div", { class: "stem" }),
      out ? nodeBox(out) : null
    ]));
  }

  function renderCtyri(slide) {
    const rows = (slide.karty || []).filter(function (item) { return item.klic === "radek"; });
    const cards = (slide.karty || []).filter(function (item) { return item.klic !== "radek"; });
    const grid = h("div", { class: rows.length ? "grid-4 steps-path" : "grid-4" }, cards.map(function (item) {
      return card(item);
    }));
    if (!rows.length) return shell(slide, grid);
    const lines = h("div", { class: "dna" }, rows.map(function (item) {
      return h("div", { class: "dna-row" }, [
        kicker(item.kicker),
        h("div", {}, [
          item.titulek ? h("h3", { class: "card-title", text: item.titulek }) : null,
          item.text ? h("p", { class: "card-text", text: item.text }) : null
        ])
      ]);
    }));
    return shell(slide, h("div", { class: "stack" }, [grid, lines]));
  }

  function renderClaim(slide) {
    const cards = slide.karty || [];
    const layers = cards.filter(function (item) { return item.klic === "vrstva"; });
    const master = cards.filter(function (item) { return item.klic === "master"; })[0];
    const hodnota = cards.filter(function (item) { return item.klic === "hodnota"; })[0];
    const note = cards.filter(function (item) { return item.klic === "doporuceni"; })[0];
    const rows = h("div", { class: "dna" }, layers.map(function (item) {
      return h("div", { class: "dna-row" }, [
        kicker(item.kicker),
        h("div", {}, [
          item.titulek ? h("h3", { class: "card-title", text: item.titulek }) : null,
          item.text ? h("p", { class: "card-text", text: item.text }) : null
        ])
      ]);
    }));
    function brandCard(item) {
      if (!item) return null;
      return h("article", { class: "card" }, [
        kicker(item.kicker),
        item.titulek ? h("h3", { class: "card-title", text: item.titulek }) : null,
        item.text ? block("p", "card-text", item.text) : null
      ]);
    }
    return shell(slide, h("div", { class: "stack" }, [
      rows,
      h("div", { class: "grid-2" }, [brandCard(master), brandCard(hodnota)]),
      note && note.text ? h("p", { class: "zaver", text: note.text }) : null
    ]));
  }

  function renderDekuj(slide) {
    return h("section", {
      class: "slide slide--dekuj",
      id: "slide-" + slide.id,
      "aria-labelledby": "h-" + slide.id
    }, [h("div", { class: "slide-inner" }, [
      block("h2", "slide-title", slide.titulek, "h-" + slide.id),
      slide.podpis ? h("p", { class: "sign sign--dekuj", text: slide.podpis }) : null
    ])]);
  }

  function renderTabulka(slide) {
    const cols = slide.sloupce || [];
    const rows = slide.karty || [];
    const label = rows.some(function (row) { return row.oblast; });
    const table = h("table", { class: label ? "sheet has-label" : "sheet" });
    const headRow = h("tr");
    if (label) headRow.append(h("th", { scope: "col", text: "Oblast" }));
    cols.forEach(function (col) {
      headRow.append(h("th", { scope: "col", text: col.nazev }));
    });
    const body = h("tbody");
    rows.forEach(function (row) {
      const tr = h("tr");
      if (label) tr.append(h("th", { scope: "row", text: row.oblast || "" }));
      cols.forEach(function (col, index) {
        tr.append(h("td", {
          class: !label && index === 0 ? "sheet-key" : null,
          text: row[col.klic] || ""
        }));
      });
      body.append(tr);
    });
    table.append(h("thead", {}, [headRow]), body);
    const sources = renderMaterialy(slide.materialy);
    const stack = sources ? h("div", { class: "stack tabulka-stack" }, [sources, table]) : table;
    return shell(slide, stack);
  }

  function renderRole(slide) {
    return shell(slide, h("div", { class: "role-grid" }, (slide.karty || []).map(function (item) {
      return card(item);
    })));
  }

  function renderCesta(slide) {
    const steps = ["zakaznik", "kbp"].map(function (key) {
      return byKlic(slide, key)[0];
    }).filter(Boolean);
    const abilities = byKlic(slide, "schopnost");
    const result = byKlic(slide, "reseni")[0];
    const projects = byKlic(slide, "projekt");
    const check = byKlic(slide, "overit")[0];
    const mark = h("span", { class: "arrow-mark", "aria-hidden": "true", text: "→" });

    const flowBits = [];
    steps.forEach(function (item, i) {
      if (i) flowBits.push(mark.cloneNode(true));
      flowBits.push(nodeBox(item));
    });
    flowBits.push(mark.cloneNode(true));
    flowBits.push(h("div", { class: "group" }, abilities.map(nodeBox)));
    if (result) {
      flowBits.push(mark.cloneNode(true));
      flowBits.push(nodeBox(result));
    }

    return shell(slide, h("div", { class: "cesta" }, [
      h("div", { class: "flow" }, flowBits),
      h("div", { class: "projects" }, projects.map(function (item) { return card(item); })),
      check ? card(check, "card overit") : null
    ]));
  }

  function renderArchetyp(slide) {
    return shell(slide, h("div", { class: "grid-3" }, (slide.karty || []).map(function (item) {
      return card(item);
    })));
  }

  function renderPrincip(slide) {
    const rows = h("div", { class: "dna" }, (slide.karty || []).map(function (item) {
      return h("div", { class: "dna-row" }, [
        kicker(item.kicker),
        h("div", {}, [
          item.titulek ? h("h3", { class: "card-title", text: item.titulek }) : null,
          item.text ? h("p", { class: "card-text", text: item.text }) : null
        ])
      ]);
    }));
    const copy = head(slide);
    return h("section", {
      class: "slide slide--princip",
      id: "slide-" + slide.id,
      "aria-labelledby": "h-" + slide.id
    }, [h("div", { class: "slide-inner" }, [
      h("div", { class: "princip" }, [copy, rows])
    ])]);
  }

  function renderNastup(slide) {
    const steps = h("div", { class: "steps" }, byKlic(slide, "krok").map(function (item) {
      return card(item);
    }));
    const web = h("div", { class: "web-stack" }, [
      h("p", { class: "web-label", text: data.chrome.znacka })
    ].concat(byKlic(slide, "web").map(function (item) {
      return h("article", { class: "web-card" }, [
        kicker(item.kicker),
        item.titulek ? h("h3", { class: "card-title", text: item.titulek }) : null,
        item.text ? h("p", { class: "card-text", text: item.text }) : null
      ]);
    })));
    const copy = head(slide);
    return h("section", {
      class: "slide slide--nastup",
      id: "slide-" + slide.id,
      "aria-labelledby": "h-" + slide.id
    }, [h("div", { class: "slide-inner" }, [
      copy,
      h("div", { class: "nastup" }, [steps, web])
    ])]);
  }

  const builders = {
    titul: shell,
    citace: renderCitace,
    otazka: renderOtazka,
    definice: renderDefinice,
    claim: renderClaim,
    tabulka: renderTabulka,
    dekuj: renderDekuj,
    model: renderModel,
    dum: renderDum,
    ctyri: renderCtyri,
    role: renderRole,
    cesta: renderCesta,
    archetyp: renderArchetyp,
    princip: renderPrincip,
    nastup: renderNastup
  };

  const splash = h("div", { class: "splash" }, [
    h("div", { class: "splash-copy" }, [
      kicker(data.uvod.kicker),
      logo("splash-logo"),
      block("p", "splash-lead", data.uvod.text),
      h("p", { class: "splash-study", text: data.chrome.studie }),
      h("button", { class: "enter", type: "button" }, [
        document.createTextNode(data.uvod.odkaz || data.chrome.vstup),
        icon("M5 12h14M13 6l6 6-6 6")
      ])
    ])
  ]);

  const stage = h("div", { class: "stage" });
  slideNodes = slides.map(function (slide) {
    const view = VZHLED[slide.id] || "titul";
    const built = (builders[view] || shell)(slide);
    stage.append(built);
    return built;
  });

  const prev = h("button", { class: "icon-btn arrow prev", type: "button", "aria-label": data.chrome.predchozi });
  prev.append(icon("M15 6l-6 6 6 6"));
  const next = h("button", { class: "icon-btn arrow next", type: "button", "aria-label": data.chrome.dalsi });
  next.append(icon("M9 6l6 6-6 6"));

  const fullscreen = h("button", { class: "icon-btn", type: "button", "aria-label": data.chrome.cela });
  fullscreen.append(icon("M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"));

  const top = h("header", { class: "bar topbar" }, [
    h("div", { class: "brand" }, [
      logo("brand-logo"),
      h("span", { text: data.chrome.studie })
    ]),
    fullscreen
  ]);

  const counter = h("div", { class: "counter", "aria-live": "polite" });
  const jumps = [];
  const nav = h("nav", { class: "bar bottom", "aria-label": data.chrome.sekce });

  data.sekce.forEach(function (section) {
    const count = slides.filter(function (slide) { return slide.sekce === section.id; }).length;
    const fill = h("i");
    const button = h("button", { class: "section-jump", type: "button" }, [
      h("span", { text: section.nazev }),
      h("div", { class: "track" }, [fill])
    ]);
    button.style.flex = String(count) + " 1 0";
    button.addEventListener("click", function () {
      const first = slides.findIndex(function (slide) { return slide.sekce === section.id; });
      if (first >= 0) show(first);
    });
    jumps.push({ id: section.id, button: button, fill: fill, count: count });
    nav.append(button);
  });
  nav.append(counter);

  const deck = h("div", { class: "deck" }, [top, stage, prev, next, nav]);
  app.append(splash, deck);

  function show(nextIndex) {
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));
    slideNodes.forEach(function (node, i) {
      const on = i === index;
      node.classList.toggle("is-on", on);
      node.setAttribute("aria-hidden", on ? "false" : "true");
    });
    const current = slides[index];
    jumps.forEach(function (jump) {
      const ids = slides.map(function (slide, i) { return slide.sekce === jump.id ? i : -1; }).filter(function (i) { return i >= 0; });
      const first = ids[0];
      const last = ids[ids.length - 1];
      let ratio = 0;
      if (index > last) ratio = 1;
      else if (index >= first) ratio = (index - first + 1) / jump.count;
      jump.fill.style.width = (ratio * 100) + "%";
      jump.button.classList.toggle("is-active", index >= first && index <= last);
    });
    counter.textContent = String(index + 1).padStart(2, "0") + "  /  " + String(slides.length).padStart(2, "0");
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  }

  function openDeck(start) {
    splash.classList.add("is-gone");
    splash.setAttribute("aria-hidden", "true");
    deck.classList.add("is-open");
    show(start || 0);
  }

  splash.querySelector(".enter").addEventListener("click", function () { openDeck(0); });
  prev.addEventListener("click", function () { show(index - 1); });
  next.addEventListener("click", function () { show(index + 1); });
  fullscreen.addEventListener("click", function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  });

  document.addEventListener("keydown", function (event) {
    const deckOpen = deck.classList.contains("is-open");
    if (!deckOpen) {
      if (event.key === "Enter" || event.key === "ArrowRight" || event.key === " ") openDeck(0);
      return;
    }
    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      show(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "Home") {
      show(0);
    } else if (event.key === "End") {
      show(slides.length - 1);
    } else if (event.key === "f" || event.key === "F") {
      fullscreen.click();
    }
  });

  const hash = (location.hash || "").replace("#", "");
  const hashed = slides.findIndex(function (slide) { return slide.id === hash; });
  if (hashed >= 0) openDeck(hashed);
  else show(0);
})();
