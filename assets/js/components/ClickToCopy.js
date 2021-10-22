import $ from "jquery";

(function () {
  let clickToCopyTimeout = null;
  $("[data-click-to-copy]").on("click", (e) => {
    let elem = $(e.currentTarget);
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("write@tfrere.fr").then(
      function () {
        elem
          .find(".contact__container__email-sentence__button__info-message")
          .addClass("show");
        elem
          .find(".contact__container__email-sentence__button__email")
          .removeClass("show");
        clearTimeout(clickToCopyTimeout);
        clickToCopyTimeout = window.setTimeout(() => {
          elem
            .find(".contact__container__email-sentence__button__info-message")
            .removeClass("show");
          elem
            .find(".contact__container__email-sentence__button__email")
            .addClass("show");
        }, 1000);
      },
      function () {
        window.location.href = "mailto:write@tfrere.fr";
      }
    );
  });
})();
