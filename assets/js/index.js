$(function () {
  // FIRST PAGE LOAD

  if (!Cookies.get("first-arrival")) {
    // do your stuff
    Cookies.set("first-arrival", "true");
  }

  var waveInstance = new Wave(
    document.getElementById("wave"),
    "darkbackground"
  );
  var waveInstance2 = new Wave(document.getElementById("wave2"), "background");

  // waveInstance.render();
  // waveInstance2.render();

  // var lazyLoadInstance = new LazyLoad({
  //   // Your custom settings go here
  // });
  // lazyLoadInstance.update();

  var canColorBeUpdated = true;

  $(".nav li, .nav h1, .nav-link").on("mouseenter", function (e) {
    if (!$(this).hasClass("active") && canColorBeUpdated) {
      $(".page, .landing").addClass("bg-" + $(this).attr("id") + "--important");
      $(".nav").addClass("bg-nav-" + $(this).attr("id") + "--important");
    }
  });

  $(".nav li, .nav h1, .nav-link").on("mouseleave", function (e) {
    if (!$(this).hasClass("active") && canColorBeUpdated) {
      $(".page, .landing").removeClass(
        "bg-" + $(this).attr("id") + "--important"
      );
      $(".nav").removeClass("bg-nav-" + $(this).attr("id") + "--important");
    }
  });

  $(".page, .landing, .nav, .hero").addClass("page--dom-loaded");

  // setTimeout(function () {
  //   // waveInstance.move();
  //   waveInstance.move();
  // }, 300);

  // $(".nav-link").on("click", function (e) {
  //   waveInstance.move();
  //   var that = this;
  //   canColorBeUpdated = false;
  //   e.preventDefault();
  //   setTimeout(function () {
  //     // $(".page, .landing, .nav, .hero").removeClass("page--dom-loaded");
  //     waveInstance2.move();
  //     setTimeout(function () {
  //       window.location.href = $(that).attr("href");
  //     }, 700);
  //   }, 500);
  // });

  $(".nav .nav-link").on("click", function (e) {
    $(this).addClass("was-clicked");
    $(".nav__section-menu__item").removeClass("active");
  });

  $(".nav-link").on("click", function (e) {
    var that = this;
    var timers = [200, 400];
    canColorBeUpdated = false;
    e.preventDefault();
    if ($(this).hasClass("button")) {
      timers = [500, 700];
    }
    setTimeout(function () {
      $(".page, .landing, .nav, .hero").removeClass("page--dom-loaded");
    }, timers[0]);
    setTimeout(function () {
      window.location.href = $(that).attr("href");
    }, timers[1]);
  });

  document.addEventListener("keypress", function (event) {
    if (event.key == "a" || event.key == "A") {
      waveInstance.move();
    }
  });

  var $grid = $(".grid").imagesLoaded(function () {
    $(".grid").colcade({
      columns: ".grid__column",
      items: ".grid__item",
    });

    if (document.querySelector("[data-scroll-container]")) {
      window.locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });
      window.locomotiveScroll.on("call", function (func, dir, obj) {
        window[func](obj);
      });
    }

    $("a.img-fluidbox").fluidbox({ immediateOpen: false });

    $("a.img-fluidbox").on("click.fluidbox", function (e) {
      // e.preventDefault();
      // e.stopPropagation();
    });

    $("a.img-fluidbox").on("openstart.fluidbox", function (e) {
      window.locomotiveScroll.stop();
    });

    $("a.img-fluidbox").on("closestart.fluidbox", function (e) {
      window.locomotiveScroll.start();
    });

    // window.locomotiveScroll.on("scroll", function (func) {});
  });

  // CURSOR

  // const TAIL_LENGTH = 10;

  // const cursor = document.getElementById("cursor");

  // let mouseX = 0;
  // let mouseY = 0;

  // let cursorCircles;
  // let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });

  // function onMouseMove(event) {
  //   mouseX = event.clientX;
  //   mouseY = event.clientY;
  // }

  // function onClick(event) {
  //   for (let i = 0; i < TAIL_LENGTH; i++) {
  //     cursorHistory[i].x += Math.random() * 100 - 50;
  //     cursorHistory[i].y += Math.random() * 100 - 50;
  //   }
  // }

  // function initCursor() {
  //   for (let i = 0; i < TAIL_LENGTH; i++) {
  //     let div = document.createElement("div");
  //     div.classList.add("cursor-circle");
  //     cursor.append(div);
  //   }
  //   cursorCircles = Array.from(document.querySelectorAll(".cursor-circle"));
  // }

  // function updateCursor() {
  //   cursorHistory.shift();
  //   cursorHistory.push({ x: mouseX, y: mouseY });

  //   for (let i = 0; i < TAIL_LENGTH; i++) {
  //     let current = cursorHistory[i];
  //     let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];

  //     let xDiff = next.x - current.x;
  //     let yDiff = next.y - current.y;

  //     current.x += xDiff * 0.65;
  //     current.y += yDiff * 0.65;
  //     cursorCircles[i].style.transform = `translate(${current.x}px, ${
  //       current.y
  //     }px) scale(${i / TAIL_LENGTH})`;
  //   }
  //   requestAnimationFrame(updateCursor);
  // }

  // document.addEventListener("mousemove", onMouseMove, false);
  // document.addEventListener("click", onClick, false);

  // initCursor();
  // updateCursor();

  // CURSOR 2

  // const cursor = document.getElementById("cursor");

  // let mouseX = 0;
  // let mouseY = 0;

  // let speedFactor = 0.65;

  // let cursorPosX = $(window).width() / 2;
  // let cursorPosY = $(window).height() / 2;

  // let cursorScale = 0;

  // let div = document.createElement("div");
  // div.classList.add("cursor-circle");
  // cursor.append(div);

  // function onMouseMove(event) {
  //   mouseX = event.clientX;
  //   mouseY = event.clientY;
  // }

  // function onMouseLeave(event) {
  //   cursorScale = 0;
  //   // div.classList.add("cursor--out");
  // }

  // function onMouseEnter(event) {
  //   cursorScale = 1;
  //   // div.classList.remove("cursor--out");
  // }

  // function onMouseDown(event) {
  //   cursorScale = 2;
  // }

  // function onMouseUp(event) {
  //   cursorScale = 1;
  // }

  // const regex = /([-0-9]*)\)/gm;

  // function updateCursor() {
  //   var value = $("[data-scroll-container]").css("transform");
  //   var value2 = regex.exec(value);
  //   var test = 0;
  //   if (value2 !== null) {
  //     test = value2[1];
  //   }

  //   let xDiff = mouseX - cursorPosX;
  //   let yDiff = mouseY - cursorPosY + test;

  //   cursorPosX += xDiff * speedFactor;
  //   cursorPosY += yDiff * speedFactor;
  //   div.style.transform = `translate(${cursorPosX}px, ${cursorPosY}px) scale(${cursorScale})`;

  //   requestAnimationFrame(updateCursor);
  // }

  // document.addEventListener("mousedown", onMouseDown, false);
  // document.addEventListener("mouseup", onMouseUp, false);
  // document.addEventListener("mousemove", onMouseMove, false);
  // document.addEventListener("mouseleave", onMouseLeave, false);
  // document.addEventListener("mouseenter", onMouseEnter, false);

  // updateCursor();

  // CURSOR 3

  const cursor = document.getElementById("cursor");

  let mouseX = 0;
  let mouseY = 0;

  let speedFactor = 1;

  let cursorPosX = $(window).width() / 2;
  let cursorPosY = $(window).height() / 2;

  let cursorScale = 0;

  let div = document.createElement("div");
  div.classList.add("cursor-circle");
  cursor.append(div);

  function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    // div.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${cursorScale})`;
  }

  function onMouseLeave(event) {
    cursorScale = 0;
    // div.classList.add("cursor--out");
  }

  function onMouseEnter(event) {
    cursorScale = 1;
    // div.classList.remove("cursor--out");
  }

  function onMouseDown(event) {
    cursorScale = 2;
  }

  function onMouseUp(event) {
    cursorScale = 1;
  }
  document.addEventListener("mouseleave", onMouseLeave, false);
  document.addEventListener("mouseenter", onMouseEnter, false);

  const regex = /([-0-9]*)\)/gm;

  function updateCursor() {
    div.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${cursorScale})`;
    // requestAnimationFrame(updateCursor);
  }

  document.addEventListener("mousedown", onMouseDown, false);
  document.addEventListener("mouseup", onMouseUp, false);
  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("mouseleave", onMouseLeave, false);
  document.addEventListener("mouseenter", onMouseEnter, false);

  window.setInterval(() => {
    updateCursor();
  }, 1000 / 60);
});
