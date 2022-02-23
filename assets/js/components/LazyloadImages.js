import jQuery from "jquery";
let $ = jQuery;
window.jQuery = require("jquery");
window.$ = window.jQuery;

document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages;

  lazyloadImages = document.querySelectorAll("[data-lazy-image]");
  var imageObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var image = entry.target;
        // console.log(entry.target);
        // image.src = image.dataset.src;
        if (!image.srcset) image.srcset = image.dataset.srcset;
        imageObserver.unobserve(image);
        window.setTimeout(() => {
          image.classList.add("loaded");
        }, 250);
      }
    });
  });

  lazyloadImages.forEach(function (image) {
    imageObserver.observe(image);
  });

  var lazyloadVideos;

  lazyloadVideos = document.querySelectorAll("[data-lazy-video]");
  var imageObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var image = entry.target;
        image.src = image.dataset.src;
        imageObserver.unobserve(image);
        window.setTimeout(() => {
          image.classList.add("loaded");
        }, 250);
      }
    });
  });

  lazyloadVideos.forEach(function (image) {
    imageObserver.observe(image);
  });
});
