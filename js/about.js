const pageTransition = () => {
  let layers = document.querySelectorAll(".left-layer");
  let fades = document.querySelectorAll(".fadeIn");
  let backbtn = document.getElementsByClassName("about-back-btn")[0];
  for (let fade of fades) {
    fade.classList.toggle("fadeIn");
    fade.classList.toggle("fadeInRight");
  }
  backbtn.classList.toggle("fadeInRev");

  setTimeout(() => {
    for (let layer of layers) {
      layer.classList.toggle("active");
    }

    setTimeout(() => {
      layers[0].classList.toggle("active");
      layers[0].classList.toggle("active-2");
      gotoNext();
    }, 1000);
  }, 800);
};

const gotoNext = () => (window.location.href = "/index.html");

// window.onblur = function () {
//   document.title += " :(";
// };

// window.onfocus = function () {
//   document.title = "About - TK Vishal";
// };
