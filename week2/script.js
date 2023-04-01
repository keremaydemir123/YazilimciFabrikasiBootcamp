const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    navbar.classList.add("bg-light");
    navbar.classList.add("nav-shadow");
    navbar.classList.remove("bg-transparent");
  } else {
    navbar.classList.add("bg-transparent");
    navbar.classList.remove("bg-light");
    navbar.classList.remove("nav-shadow");
  }
});
