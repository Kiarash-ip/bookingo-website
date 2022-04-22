const $ = document;
const navbarElem = $.querySelector(".navbar");
const slides = $.querySelectorAll(".slide");
const nextBtn = $.querySelector(".next-btn");
const prevBtn = $.querySelector(".prev-btn");
const controllers = $.querySelectorAll(".controller");
const menu = $.querySelector(".navbar__list-btns-container");
const hamburgerMenuBtn = $.querySelector(".open-menu-btn");
const menuIcon = $.querySelector(".menu-icon");
const sectionsContainer = $.querySelector(".website-sections-container");

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

setInterval(() => {
  nextSlide();
}, 7000);
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

let open = false;

hamburgerMenuBtn.addEventListener("click", () => {
  if (open) {
    hamburgerMenuBtn.innerHTML = `<i class="fa-solid fa-bars"></i> Menu`;
    menu.classList.remove("open");
    open = false;
  } else {
    hamburgerMenuBtn.textContent = "Close";
    menu.classList.add("open");
    open = true;
  }
});

const bookingoDatas = [
  {
    id: 1,
    title: "رقابت - یادگیری - هیجان",
    description:
      "خود را در رقابت با بهترین برنامه نویسان به چالش بکشید ، مهارت خود را به رخ بقیه بکشید و جایزه بگیرید یا ( جایزه بگیرید و مهارت خود را به رخ بقیه بکشید)",
    image: "https://unsplash.it/600/400",
  },
  {
    id: 2,
    title: "فرصتی برای یادگیری و رشد حرفه ای",
    description:
      "با تکیه بر متخصصین ما در زمینه آموزش ، خود را به زندگی هوشنمد پیوند بزنید",
    image: "https://unsplash.it/600/400",
  },
  {
    id: 3,
    title: "همکاری با ما",
    description:
      "بخشی از گروه با استعداد ما در زمینه مهندسی نرم افزار، طراحی محصول، پشتیبانی کاربر، و متخصصان فروش باشید که در هر کاری که انجام می دهیم، شور، خلاقیت و سرگرمی را با هم ترکیب می کنیم!",
    image: "https://unsplash.it/600/400",
  },
  {
    id: 4,
    title: "طراحی رویاهای شما با تیم بوکینگو",
    description:
      "بوکینگ با داشتن تیمی از جوانان متخصص آماده ارائه خدمت به شما عزیزان می باشد",
    image: "https://unsplash.it/600/400",
  },
];

let side = null;
let template = null;
bookingoDatas.forEach((item) => {
  side = item.id % 2 === 0 ? "right" : "left";
  template =
    side === "left"
      ? sectionTemplateLeftGenerator(item)
      : sectionTemplateRightGenerator(item);
  sectionsContainer.insertAdjacentHTML("beforeend", template);
});

function sectionTemplateLeftGenerator(data) {
  return `
  <section class="section-leftSide">
        <div class="section-leftSide-container">
          <div class="section-leftSide-image-container">
            <img
              src="${data.image}"
              alt="Express the text"
            />
          </div>
          <div class="section-leftSide-content">
            <h5 dir="rtl">${data.title}</h5>
            <p dir="rtl">
              ${data.description}
            </p>
            <div dir="rtl" class="section-leftSide-link-container">
              <a href="#">مشاهده</a>
              <i class="fa-solid fa-chevron-left"></i>
            </div>
          </div>
        </div>
      </section>
  `;
}
function sectionTemplateRightGenerator(data) {
  return `
  <section class="section-rightSide">
        <div class="section-rightSide-container">
          <div class="section-rightSide-content">
            <h5 dir="rtl">
              ${data.title}
            </h5>
            <p dir="rtl">
              ${data.description}
            </p>
            <div dir="rtl" class="section-rightSide-link-container">
              <a href="#">مشاهده</a>
              <i class="fa-solid fa-chevron-left"></i>
            </div>
          </div>
          <div class="section-rightSide-image-container">
            <img
              src="${data.image}"
              alt="Express the text"
            />
          </div>
        </div>
      </section>
  `;
}
