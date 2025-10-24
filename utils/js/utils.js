const clickSound = new Audio("sounds/click.mp3");
const enterSound = new Audio("sounds/enter.mp3");

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
});

function goBack() {
  window.location.href = "index.html";
}
