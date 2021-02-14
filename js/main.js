const pageTransition = (page) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  var layers = document.querySelectorAll(".right-layer");
  for (let layer of layers) {
    layer.style.display = "block";
  }
  setTimeout(() => {
    for (let layer of layers) {
      layer.classList.toggle("active");
    }
    setTimeout(() => {
      layers[0].classList.toggle("active");
      layers[0].classList.toggle("active-2");
      gotoNext(page);
    }, 1000);
  }, 100);
};

const gotoNext = (page) => (window.location.href = `${page}.html`);

// window.onblur = function () {
//   document.title += " :(";
// };

// window.onfocus = function () {
//   document.title = "TK Vishal";
// };
