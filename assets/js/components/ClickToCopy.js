import $ from "jquery";

(function () {
  let clickToCopyTimeout = null;
  $("[data-click-to-copy]").on("click", (e) => {
    let elem = $(e.currentTarget);
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("write@tfrere.fr").then(
      function () {
        elem.find(".click-to-copy__info-message").addClass("show");
        elem.find(".click-to-copy__email").removeClass("show");
        clearTimeout(clickToCopyTimeout);
        clickToCopyTimeout = window.setTimeout(() => {
          elem.find(".click-to-copy__info-message").removeClass("show");
          elem.find(".click-to-copy__email").addClass("show");
        }, 1000);
      },
      function () {
        window.location.href = "mailto:write@tfrere.fr";
      }
    );
  });
})();
