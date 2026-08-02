(function () {
  var STORAGE_KEY = "theme";
  var DARK = "dark";
  var LIGHT = "light";

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(v) {
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch (e) {}
  }

  function prefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function apply(theme) {
    var isDark = theme === DARK || (!theme && prefersDark());
    document.documentElement.setAttribute("data-theme", isDark ? DARK : LIGHT);
    setStored(isDark ? DARK : LIGHT);
    var label = isDark ? "Switch to light mode" : "Switch to dark mode";
    var title = isDark ? "Light mode" : "Dark mode";
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-label", label);
      btn.title = title;
    });
  }

  window.toggleTheme = function () {
    var t = document.documentElement.getAttribute("data-theme");
    apply(t === DARK ? LIGHT : DARK);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      apply(getStored());
    });
  } else {
    apply(getStored());
  }

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      function () {
        if (!getStored()) apply(null);
      }
    );
  }
})();
