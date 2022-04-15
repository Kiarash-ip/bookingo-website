const $ = document;
const navbarElem = $.querySelector(".navbar");

window.addEventListener("scroll", (e) => {
  console.log($.documentElement.scrollTop);
  if ($.documentElement.scrollTop > 85) {
    navbarElem.classList.add("active");
  } else {
    navbarElem.classList.remove("active");
  }
});
