const $ = document;
const navbarElem = $.querySelector(".navbar");
const slides = $.querySelectorAll(".slide");
const nextBtn = $.querySelector(".next-btn");
const prevBtn = $.querySelector(".prev-btn");
const controllers = $.querySelectorAll(".controller");

window.addEventListener("scroll", (e) => {
  if ($.documentElement.scrollTop > 85) {
    navbarElem.classList.add("active");
  } else {
    navbarElem.classList.remove("active");
  }
});

function activeController(id) {
  controllers.forEach((item) => {
    if (item.dataset.id === id) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

slides.forEach((slideElem, index) => {
  slideElem.style.transform = `translate(${index * 100}%, ${index * -100}%)`;
  if (index === 0) {
    slideElem.classList.add("active");
    activeController(slideElem.dataset.id);
  }
});

let currentSlide = 0;

function nextSlide() {
  currentSlide--;
  if (currentSlide < -2) {
    currentSlide = 0;
  }
  let slide = currentSlide;
  slides.forEach((slideElem, index) => {
    slideElem.style.transform = `translate(${slide * 100}%, ${index * -100}%)`;
    if (slide === 0) {
      slideElem.classList.add("active");
      activeController(slideElem.dataset.id);
    }
    slide++;
  });
}

function prevSlide() {
  currentSlide++;
  if (currentSlide > 0) {
    currentSlide = -2;
  }
  let slide = currentSlide;
  slides.forEach((slideElem, index) => {
    slideElem.style.transform = `translate(${slide * 100}%, ${index * -100}%)`;
    if (slide === 0) {
      slideElem.classList.add("active");
      activeController(slideElem.dataset.id);
    }
    slide++;
  });
}

nextBtn.addEventListener("click", () => {
  nextSlide();
});
prevBtn.addEventListener("click", () => {
  prevSlide();
});
