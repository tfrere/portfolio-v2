import "particles.js";
import $ from "jquery";

$(() => {
  if ($("#sea-particles").length) {
    particlesJS("sea-particles", {
      particles: {
        number: { value: 48, density: { enable: true, value_area: 800 } },
        color: { value: "#555555" },
        opacity: {
          value: 1,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: "#fff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 600 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "grab" },
          onclick: { enable: false, mode: "push" },
          resize: true,
        },
      },
      retina_detect: true,
    });
  }
});
