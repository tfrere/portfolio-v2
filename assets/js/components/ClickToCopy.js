import $ from "jquery";

(function () {
  let clickToCopyTimeout = null;
  $("[data-click-to-copy]").on("click", (e) => {
    let elem = $(e.currentTarget);
    e.preventDefault();
    // e.stopPropagation();
    navigator.clipboard.writeText("write@tfrere.fr").then(
      function () {
        elem.find("[data-click-to-copy-info-message]").addClass("show");
        clearTimeout(clickToCopyTimeout);
        clickToCopyTimeout = window.setTimeout(() => {
          elem.find("[data-click-to-copy-info-message]").removeClass("show");
        }, 1000);
      },
      function () {
        window.location.href = "mailto:write@tfrere.fr";
      }
    );
  });
})();
