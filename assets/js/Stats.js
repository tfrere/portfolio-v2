import Stats from "stats.js";
import $ from "jquery";

$(function () {
  var stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.top = "20px";
  stats.dom.style.left = "180px";
  stats.dom.style.zIndex = "99999999999";
  stats.dom.style.display = "none";
  document.body.appendChild(stats.dom);

  var stats2 = new Stats();
  stats2.showPanel(1);
  stats2.dom.style.top = "20px";
  stats2.dom.style.left = "260px";
  stats2.dom.style.zIndex = "99999999999";
  stats2.dom.style.display = "none";
  document.body.appendChild(stats2.dom);

  var stats3 = new Stats();
  stats3.showPanel(2);
  stats3.dom.style.top = "20px";
  stats3.dom.style.left = "340px";
  stats3.dom.style.zIndex = "99999999999";
  stats3.dom.style.display = "none";
  document.body.appendChild(stats3.dom);

  function animate() {
    stats.begin();
    stats2.begin();
    stats3.begin();
    stats.end();
    stats2.end();
    stats3.end();

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
        stats2.dom.style.display = displayValue;
        stats3.dom.style.display = displayValue;
      }
    },
    false
  );
});
