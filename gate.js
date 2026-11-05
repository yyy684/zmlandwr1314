(function () {
  "use strict";

  var ACCESS_KEY = "zmlandwr1314-love-access";
  var IDENTITY_KEY = "zmlandwr1314-identity";
  var PASSCODE = "31415926";
  var root = document.documentElement;
  var passAccepted = false;
  var identity = null;

  try {
    passAccepted = sessionStorage.getItem(ACCESS_KEY) === "yes";
    identity = sessionStorage.getItem(IDENTITY_KEY);
  } catch (_) {
    // Visitors can still enter and choose an identity for the current page.
  }

  window.LOVE_GATE = {
    switchIdentity: function () {
      try {
        sessionStorage.removeItem(IDENTITY_KEY);
      } catch (_) {}
      location.reload();
    }
  };

  if (passAccepted && (identity === "wu" || identity === "zhu")) {
    window.LOVE_IDENTITY = identity;
    root.classList.remove("love-locked");
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var originalTitle = document.title;
    document.title = "恋爱口令 · 私密入口";

    var gate = document.createElement("div");
    gate.id = "love-gate";
    document.body.appendChild(gate);

    function finish(selectedIdentity) {
      try {
        sessionStorage.setItem(IDENTITY_KEY, selectedIdentity);
      } catch (_) {}
      window.LOVE_IDENTITY = selectedIdentity;
      gate.remove();
      root.classList.remove("love-locked");
      document.title = originalTitle;
      var readyEvent = document.createEvent("Event");
      readyEvent.initEvent("love:ready", false, false);
      document.dispatchEvent(readyEvent);
    }

    function showIdentityChoice() {
      gate.innerHTML =
        '<main class="love-gate-card" aria-labelledby="love-gate-title">' +
          '<div class="love-gate-heart" aria-hidden="true">♡</div>' +
          '<p class="love-gate-eyebrow">ONLY FOR US</p>' +
          '<h1 id="love-gate-title">你是谁呀？</h1>' +
          '<p class="love-gate-description">选好身份，哄哄模拟器就会变成你哄对方。</p>' +
          '<div class="love-gate-choices" role="group" aria-label="选择身份">' +
            '<button type="button" id="love-gate-wu" class="love-gate-choice"><span>我是</span><strong>吴锐</strong><i aria-hidden="true">→</i></button>' +
            '<button type="button" id="love-gate-zhu" class="love-gate-choice"><span>我是</span><strong>朱美琳</strong><i aria-hidden="true">→</i></button>' +
          '</div>' +
          '<p class="love-gate-footer">等会儿也可以在游戏里切换身份 ✦</p>' +
        '</main>';
      document.getElementById("love-gate-wu").addEventListener("click", function () {
        finish("wu");
      });
      document.getElementById("love-gate-zhu").addEventListener("click", function () {
        finish("zhu");
      });
    }

    function showPasscode() {
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
            '<button type="submit">下一步：选择身份 <span aria-hidden="true">→</span></button>' +
          '</form>' +
          '<p class="love-gate-footer">一串数字，一份只属于我们的心意 ✦</p>' +
        '</main>';

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
        } catch (_) {}
        showIdentityChoice();
      });
      input.addEventListener("input", function () {
        error.textContent = "";
      });
    }

    if (passAccepted) showIdentityChoice();
    else showPasscode();
  });
})();
