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

// Validation

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

// const swiper = new Swiperzxc(".swiper", {
//   // Optional parameters
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });

const swiperPodcasts = new Swiper(".podcasts-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 100,
    depth: 100,
    scale: 0.85,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".podcasts-slider-next",
    prevEl: ".podcasts-slider-prev",
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

// menu
$(document).ready(function () {
  $(".toggler").click(function () {
    $(this).toggleClass("active");
    $(".header").toggleClass("header-active");
    $(".navigation").slideToggle(300);
  });
});
