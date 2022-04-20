const $ = document;
const navbarElem = $.querySelector(".navbar");
const slides = $.querySelectorAll(".slide");
const nextBtn = $.querySelector(".next-btn");
const prevBtn = $.querySelector(".prev-btn");
const controllers = $.querySelectorAll(".controller");

let scrollArr = [];
window.addEventListener("scroll", (e) => {
  scrollArr.push($.documentElement.scrollTop);
  if ($.documentElement.scrollTop < scrollArr[0]) {
    navbarElem.classList.add("active");
  } else {
    navbarElem.classList.remove("active");
  }

  if ($.documentElement.scrollTop === 0) {
    navbarElem.classList.add("active");
  }

  if (scrollArr.length > 2) {
    scrollArr = scrollArr.slice(-2);
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
  console.log(currentSlide);
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
  console.log(currentSlide);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
});
prevBtn.addEventListener("click", () => {
  prevSlide();
});

// setInterval(() => {
//   nextSlide();
// }, 7000);
controllers.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let id = null;
    if (e.target.classList.contains("controller-btn")) {
      id = +e.target.parentElement.dataset.id;
    } else {
      id = +e.target.dataset.id;
    }

    if (currentSlide > id) {
      while (currentSlide !== id) {
        nextSlide();
      }
    } else if (currentSlide < id) {
      while (currentSlide !== id) {
        prevSlide();
      }
    }
  });
});
