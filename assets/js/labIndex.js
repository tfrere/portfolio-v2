import $ from "jquery";
import gsap from "gsap";
import Masonry from "masonry-layout";

import "./lib/modernizr";

import "./components/Cursor";
import "./components/LazyloadImages";
import "./components/ScrollVisualizer";

$(function () {
  $(document).scrollTop(0);

  var msnry = new Masonry(".projects__grid", {
    itemSelector: ".projects__grid__item",
    columnWidth: ".projects__grid__column",
    percentPosition: true,
  });
});
