(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) p(a);
  new MutationObserver((a) => {
    for (const u of a)
      if (u.type === "childList")
        for (const l of u.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && p(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function f(a) {
    const u = {};
    return (
      a.integrity && (u.integrity = a.integrity),
      a.referrerPolicy && (u.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : a.crossOrigin === "anonymous"
        ? (u.credentials = "omit")
        : (u.credentials = "same-origin"),
      u
    );
  }
  function p(a) {
    if (a.ep) return;
    a.ep = !0;
    const u = f(a);
    fetch(a.href, u);
  }
})();
const h = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return (
        navigator.userAgent.match(/IEMobile/i) ||
        navigator.userAgent.match(/WPDesktop/i)
      );
    },
    any: function () {
      return (
        h.Android() || h.BlackBerry() || h.iOS() || h.Opera() || h.Windows()
      );
    },
  },
  A = document.querySelector(".menu__icon"),
  S = document.querySelector(".menu__body");
A.addEventListener("click", () => {
  document.body.classList.toggle("_lock"),
    A.classList.toggle("_active"),
    S.classList.toggle("_active");
});
const x = document.querySelectorAll(".menu__arrow"),
  q = (e) => {
    const s = e.target;
    window.innerWidth > 768 &&
      h.any() &&
      s.closest(".menu__item").classList.toggle("_hover");
  };
x.forEach((e) => {
  e.addEventListener("click", q);
});
document.addEventListener("click", (e) => {
  const s = e.target,
    f = document.querySelectorAll(".menu__item._hover");
  window.innerWidth > 768 &&
    h.any() &&
    !s.closest(".menu__item") &&
    f.length > 0 &&
    f.forEach((p) => p.classList.remove("_hover"));
});
const b = document.querySelectorAll("[data-spollers]");
if (b.length > 0) {
  let f = function (l, c = !1) {
      l.forEach((t) => {
        (t = c ? t.item : t),
          c.matches || !c
            ? (t.classList.add("_init"), p(t), t.addEventListener("click", a))
            : (t.classList.remove("_init"),
              p(t, !1),
              t.removeEventListener("click", a));
      });
    },
    p = function (l, c = !0) {
      const t = l.querySelectorAll("[data-spoller]");
      t.length > 0 &&
        t.forEach((d) => {
          c
            ? (d.removeAttribute("tabindex"),
              d.classList.contains("_active") ||
                (d.nextElementSibling.hidden = !0))
            : (d.setAttribute("tabindex", "-1"),
              (d.nextElementSibling.hidden = !1));
        });
    },
    a = function (l) {
      const c = l.target;
      if (c.hasAttribute("data-spoller") || c.closest("[data-spoller]")) {
        const t = c.hasAttribute("data-spoller")
            ? c
            : c.closest("[data-spoller]"),
          d = t.closest("[data-spollers]"),
          m = !!d.hasAttribute("data-one-spoller");
        d.querySelectorAll("._slide").length ||
          (m && !t.classList.contains("_active") && u(d),
          t.classList.toggle("_active"),
          O(t.nextElementSibling, 500)),
          l.preventDefault();
      }
    },
    u = function (l) {
      const c = l.querySelector("[data-spoller]._active");
      c && (c.classList.remove("_active"), P(c.nextElementSibling, 500));
    };
  var N = f,
    k = p,
    T = a,
    H = u;
  const e = Array.from(b).filter((l) => !l.dataset.spollers.split(",")[0]);
  e.length > 0 && f(e);
  const s = Array.from(b).filter((l) => l.dataset.spollers.split(",")[0]);
  if (s.length > 0) {
    const l = [];
    s.forEach((t) => {
      const d = t.dataset.spollers,
        m = {},
        y = d.split(",");
      (m.value = y[0]),
        (m.type = y[1] ? y[1].trim() : "max"),
        (m.item = t),
        l.push(m);
    });
    let c = l.map(function (t) {
      return (
        "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
      );
    });
    (c = c.filter(function (t, d, m) {
      return m.indexOf(t) === d;
    })),
      c.forEach((t) => {
        const d = t.split(","),
          m = d[1],
          y = d[2],
          v = window.matchMedia(d[0]),
          o = l.filter(function (n) {
            if (n.value === m && n.type === y) return !0;
          });
        v.addEventListener("change", function () {
          f(o, v);
        }),
          f(o, v);
      });
  }
}
let P = (e, s = 500) => {
  e.classList.contains("_slide") ||
    (e.classList.add("_slide"),
    (e.style.transitionProperty = "height, margin, padding"),
    (e.style.transitionDuration = s + "ms"),
    (e.style.height = e.offsetHeight + "px"),
    e.offsetHeight,
    (e.style.overflow = "hidden"),
    (e.style.height = 0),
    (e.style.paddingTop = 0),
    (e.style.paddingBottom = 0),
    (e.style.marginTop = 0),
    (e.style.marginBottom = 0),
    window.setTimeout(() => {
      (e.hidden = !0),
        e.style.removeProperty("height"),
        e.style.removeProperty("padding-top"),
        e.style.removeProperty("padding-bottom"),
        e.style.removeProperty("margin-top"),
        e.style.removeProperty("margin-bottom"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property"),
        e.classList.remove("_slide");
    }, s));
};
const M = (e, s = 500) => {
  e.classList.contains("_slide") || e.classList.add("_slide"),
    e.hidden && (e.hidden = !1);
  let f = e.offsetHeight;
  (e.style.overflow = "hidden"),
    (e.style.height = 0),
    (e.style.paddingTop = 0),
    (e.style.paddingBottom = 0),
    (e.style.marginTop = 0),
    (e.style.marginBottom = 0),
    e.offsetHeight,
    (e.style.transitionProperty = "height, margin, padding"),
    (e.style.transitionDuration = s + "ms"),
    (e.style.height = f + "px"),
    e.style.removeProperty("padding-top"),
    e.style.removeProperty("padding-bottom"),
    e.style.removeProperty("margin-top"),
    e.style.removeProperty("margin-bottom"),
    window.setTimeout(() => {
      e.style.removeProperty("height"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property"),
        e.classList.remove("_slide");
    }, s);
};
let O = (e, s = 500) => (e.hidden ? M(e, s) : P(e, s));
function D(e = "max") {
  const s = "_dynamic_adapt_",
    f = "data-da",
    p = u();
  l(p).forEach((o) => {
    const n = window.matchMedia(o.query),
      r = p.filter(({ breakpoint: g }) => g === o.breakpoint),
      i = c(n, r);
    n.addEventListener("change", i), i();
  });
  function u() {
    const o = [];
    return (
      [...document.querySelectorAll(`[${f}]`)].forEach((r) => {
        const i = r.getAttribute(f),
          [g, E, _] = i.split(",").map((w) => w.trim()),
          L = document.querySelector(g);
        L &&
          o.push({
            parent: r.parentElement,
            element: r,
            to: L,
            breakpoint: E ?? "767",
            order: _ !== void 0 ? (v(_) ? Number(_) : _) : "last",
            index: -1,
          });
      }),
      y(o)
    );
  }
  function l(o) {
    return [
      ...new Set(o.map(({ breakpoint: r }) => `(${e}-width: ${r}px),${r}`)),
    ].map((r) => {
      const [i, g] = r.split(",");
      return { query: i, breakpoint: g };
    });
  }
  function c(o, n) {
    return function () {
      o.matches
        ? (n.forEach((i) => {
            t(i);
          }),
          n.reverse())
        : (n.forEach((i) => {
            i.element.classList.contains(s) && d(i);
          }),
          n.reverse());
    };
  }
  function t(o) {
    const { to: n, element: r, order: i } = o;
    if (
      ((o.index = m(o.element, o.element.parentElement)),
      r.classList.add(s),
      i === "last" || i >= n.children.length)
    ) {
      n.append(r);
      return;
    }
    if (i === "first") {
      n.prepend(r);
      return;
    }
    n.children[i].before(r);
  }
  function d(o) {
    const { parent: n, element: r, index: i } = o;
    r.classList.remove(s),
      i >= 0 && n.children[i] ? n.children[i].before(r) : n.append(r);
  }
  function m(o, n) {
    return [...n.children].indexOf(o);
  }
  function y(o) {
    const n = e === "min" ? 1 : 0;
    return [...o].sort((r, i) =>
      r.breakpoint === i.breakpoint
        ? r.order === i.order
          ? 0
          : r.order === "first" || i.order === "last"
          ? -1 * n
          : r.order === "last" || i.order === "first"
          ? 1 * n
          : 0
        : (r.breakpoint - i.breakpoint) * n,
    );
  }
  function v(o) {
    return !isNaN(o);
  }
}
D();
