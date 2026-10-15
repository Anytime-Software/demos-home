/* Az Property Doctors, LLC – demo preview. Build 20261015-ead5574b445e.
   Written fresh by Tekton (Claude Code, claude-opus-5-5). No tracking, no network requests, no forms. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header shadow once the page scrolls */
  var header = document.querySelector("[data-header]");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 4);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Phone menu: aria-expanded, Escape, outside click, link click, focus return */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  var label = document.querySelector("[data-menu-label]");

  function isOpen() { return toggle && toggle.getAttribute("aria-expanded") === "true"; }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    if (label) label.textContent = "Close menu";
    menu.hidden = false;
    menu.classList.add("is-open");
    var first = menu.querySelector("a");
    if (first) first.focus();
  }

  function closeMenu(returnFocus) {
    toggle.setAttribute("aria-expanded", "false");
    if (label) label.textContent = "Open menu";
    menu.classList.remove("is-open");
    menu.hidden = true;
    if (returnFocus) toggle.focus();
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      if (isOpen()) closeMenu(false); else openMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) closeMenu(true);
    });
    document.addEventListener("click", function (e) {
      if (isOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu(false);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu(false);
    });
    window.addEventListener("resize", function () {
      if (isOpen() && window.innerWidth > 860) closeMenu(false);
    });
  }

  /* Move focus to the section after an in-page link, for keyboard and screen reader users */
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    window.setTimeout(function () { target.focus({ preventScroll: true }); }, reduceMotion ? 0 : 350);
  });

  /* Reveal sections once; everything is visible immediately without JS or with reduced motion */
  var items = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }
})();
