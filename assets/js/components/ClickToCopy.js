import $ from "jquery";

(function () {
  let clickToCopyTimeout = null;

  $("[data-click-to-copy]").on("click", (e) => {
    const elem = $(e.currentTarget);
    const emailHref = elem.attr("href");
    // Extract email from mailto: link
    const email = emailHref.replace("mailto:", "").trim();

    e.preventDefault();

    navigator.clipboard.writeText(email).then(
      function () {
        elem.find("[data-click-to-copy-info-message]").addClass("show");
        clearTimeout(clickToCopyTimeout);
        clickToCopyTimeout = window.setTimeout(() => {
          elem.find("[data-click-to-copy-info-message]").removeClass("show");
        }, 1000);
      },
      function () {
        // Fallback to opening mail client if copy fails
        window.location.href = emailHref;
      }
    );
  });
})();
