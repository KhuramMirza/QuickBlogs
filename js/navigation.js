document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navOptions = document.getElementById("nav-options");
  const closeNavOptions = document.getElementById("close-nav-options");
  const links = document.querySelectorAll(".small-options ul li a");
  menuToggle.addEventListener("click", () => {
    navOptions.classList.toggle("show");
  });

  closeNavOptions.addEventListener("click", () => {
    navOptions.classList.remove("show");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navOptions.classList.remove("show");
    });
  });
});
