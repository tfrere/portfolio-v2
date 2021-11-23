import Stats from "stats.js";
import $ from "jquery";

$(function () {
  var stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.top = "20px";
  stats.dom.style.left = "20px";
  stats.dom.style.zIndex = "99999999999";
  stats.dom.style.display = "none";
  document.body.appendChild(stats.dom);

  function animate() {
    stats.begin();
    stats.end();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "g") {
        document.getElementById("grid").classList.toggle("vr-show-grid");
        document.body.classList.toggle("vr-show-entities");
      }
      if (e.key == "b") {
        document.body.classList.toggle("black");
      }
      if (e.key == "s") {
        let displayValue = "block";
        if (stats.dom.style.display == "block") displayValue = "none";
        stats.dom.style.display = displayValue;
      }
    },
    false
  );
});
