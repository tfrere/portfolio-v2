function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 1000) {
    fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
    startTime = time;
    frame = 0;
  }
  window.requestAnimationFrame(tick);
}

if (document.getElementById("fps-counter")) {
  var fps = document.getElementById("fps-counter"),
    startTime = Date.now(),
    frame = 0;

  tick();
}
