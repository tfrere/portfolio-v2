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
        image.srcset = image.dataset.srcset;
        window.setTimeout(() => {
          image.classList.add("loaded");
        }, 250);
        imageObserver.unobserve(image);
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
        window.setTimeout(() => {
          image.classList.add("loaded");
        }, 250);
        imageObserver.unobserve(image);
      }
    });
  });

  lazyloadVideos.forEach(function (image) {
    imageObserver.observe(image);
  });
});
