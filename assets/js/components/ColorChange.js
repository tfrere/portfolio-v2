import chroma from "chroma-js";
const colorScale = chroma.scale(["#FFE63F", "#FFA69D", "#FFE63F"]);
let index = 0;
window.setInterval(() => {
  document.documentElement.style.setProperty(
    "--yellow",
    colorScale(index).hex()
  );
  index += 0.01;
  if (index > 1) {
    index = 0;
  }
}, 1000 / 10);
