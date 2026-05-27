(function () {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var overlay = document.getElementById("mobile-overlay");

  function closeMenu() {
    if (menu) menu.classList.remove("open");
    if (overlay) overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (menu) menu.classList.add("open");
    if (overlay) overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (menu && menu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  var GOLDEN_RATIO = 1.618;

  function applyProfilePhotoCrop(img) {
    var wrap = img.closest(".about-profile-photo-wrap");
    if (!wrap || !img.naturalWidth) {
      return;
    }
    var tall = img.naturalHeight / img.naturalWidth > GOLDEN_RATIO;
    wrap.classList.toggle("about-profile-photo-wrap--golden", tall);
  }

  document.querySelectorAll(".about-profile-photo").forEach(function (img) {
    if (img.complete) {
      applyProfilePhotoCrop(img);
    } else {
      img.addEventListener("load", function () {
        applyProfilePhotoCrop(img);
      });
    }
  });
})();
