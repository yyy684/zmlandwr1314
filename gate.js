(function () {
  "use strict";

  var ACCESS_KEY = "zmlandwr1314-love-access";
  var PASSCODE = "31415926";
  var root = document.documentElement;
  var unlocked = false;

  try {
    unlocked = sessionStorage.getItem(ACCESS_KEY) === "yes";
  } catch (_) {
    // The gate still works when the browser blocks session storage.
  }

  if (unlocked) {
    root.classList.remove("love-locked");
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var originalTitle = document.title;
    document.title = "恋爱口令 · 私密入口";

    var gate = document.createElement("div");
    gate.id = "love-gate";
    gate.innerHTML =
      '<main class="love-gate-card" aria-labelledby="love-gate-title">' +
        '<div class="love-gate-heart" aria-hidden="true">♡</div>' +
        '<p class="love-gate-eyebrow">ONLY FOR US</p>' +
        '<h1 id="love-gate-title">恋爱口令</h1>' +
        '<p class="love-gate-description">输入我们的专属数字，打开这个小世界。</p>' +
        '<form id="love-gate-form" novalidate>' +
          '<label for="love-gate-input">请输入恋爱口令</label>' +
          '<input id="love-gate-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="8 位数字" required />' +
          '<p id="love-gate-error" role="alert" aria-live="polite"></p>' +
          '<button type="submit">进入我们的小世界 <span aria-hidden="true">→</span></button>' +
        '</form>' +
        '<p class="love-gate-footer">一串数字，一份只属于我们的心意 ✦</p>' +
      '</main>';
    document.body.appendChild(gate);

    var form = document.getElementById("love-gate-form");
    var input = document.getElementById("love-gate-input");
    var error = document.getElementById("love-gate-error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (input.value.trim() !== PASSCODE) {
        error.textContent = "口令不对，再想想我们的专属数字～";
        input.value = "";
        input.focus();
        return;
      }

      try {
        sessionStorage.setItem(ACCESS_KEY, "yes");
      } catch (_) {
        // Access remains valid for this page even without session storage.
      }
      gate.remove();
      root.classList.remove("love-locked");
      document.title = originalTitle;
    });

    input.addEventListener("input", function () {
      error.textContent = "";
    });
  });
})();
