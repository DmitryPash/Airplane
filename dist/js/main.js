//инициализация MFP popup для форм
$(document).on("click", ".mfp-link", function () {
  var a = $(this);
  $.magnificPopup.open({
    items: { src: a.attr("data-href") },
    type: "ajax",
    overflowY: "scroll",
    removalDelay: 610,
    mainClass: "my-mfp-zoom-in",
    ajax: {
      tError: "Error. Not valid url",
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $(".mfp-wrap, .mfp-bg").addClass("delay-back");
          $(".mfp-popup").addClass("delay-back");
        }, 700);
      },
    },
  });
  return false;
});

$(document).ready(function () {
  // Validation
  $("#form-validation").validate({
    errorElement: "span",
    errorClass: "mail-form",
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: {
        required: "Пожалуйста введите ваш email",
        email: "Введите корректный email",
      },
    },
  });
  // Menu
  $(".toggler").click(function () {
    $(this).toggleClass("active");
    $(".header").toggleClass("header-active");
    $(".navigation").slideToggle(300);
  });
  // Certificate
  $(".certificate-item").click(function () {
    $(".certificate-item").removeClass("certificate-active");
    $(this).addClass("certificate-active");
  });
  // Scroll
  $("#gift-btn").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".certificate-items").offset().top,
      },
      2000
    );
  });
});

jQuery.validator.addMethod(
  "lettersonly",
  function (value, element) {
    return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
  },
  "Incorrect format"
);

jQuery.validator.addMethod(
  "telephone",
  function (value, element) {
    return (
      this.optional(element) ||
      /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value)
    );
  },
  "Incorrect format"
);

const swiper = new Swiper(".top-screen-container", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// var menu = ["Slide 1", "Slide 2", "Slide 3"];
const swiperPodcasts = new Swiper(".podcasts-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 350,
    depth: 100,
    scale: 0.85,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".podcasts-slider-next",
    prevEl: ".podcasts-slider-prev",
  },
  // pagination: {
  //   el: ".podcasts-slider-pgn",
  //   clickable: true,
  //   renderBullet: function (index, className) {
  //     return (
  //       '<span class="' +
  //       className +
  //       '">' +
  //       "Скачать конспект лекции" +
  //       "</span>"
  //     );
  //   },
  // },
  breakpoints: {
    1170: {
      coverflowEffect: {
        rotate: 0,
        stretch: 100,
        depth: 80,
        scale: 0.85,
        modifier: 1,
        slideShadows: false,
      },
    },
  },
});
swiperPodcasts.on("slideChange", function () {
  $(".podcasts-slider iframe").remove();
});
$(document).on("click", ".podcasts-card-play", function (e) {
  e.preventDefault();
  const id = $(this).attr("data-video") || null;
  const card = $(this).closest(".podcasts-card");

  if (id) {
    card.append(
      `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" autoplay="1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    );
  }
});

const videoSticker = document.querySelector(".video-sticker");
const videoStickerText = document.querySelector(".video-sticker-text");
const videos = document.querySelectorAll(".ui-video video");
videos.forEach((el) => {
  el.addEventListener("playing", function () {
    this.nextElementSibling.style.display = "none";

    this.controls = true;
  });
  //отображаем кнопку при паузе видео
  el.addEventListener("pause", function () {
    this.nextElementSibling.style.display = "block";
    videoSticker.style.display = "block";
    videoStickerText.style.display = "block";
  });
  //прячем кнопку при запуске видео через нативные контролы
  el.addEventListener("play", function () {
    this.nextElementSibling.style.display = "none";
    videoSticker.style.display = "none";
    videoStickerText.style.display = "none";
  });
});

$(document).on("click", ".ui-video-play", function (e) {
  e.preventDefault();
  const video = $(this).prev("video").get(0) || null;
  if (video) {
    video.controls = true;
    video.play();
  }
  return false;
});
