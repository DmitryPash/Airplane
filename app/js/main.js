const FARBA = {
  galleryCurrentIndex: 0,

  //функция для навешивания изображений фоном
  backgrounded(selector) {
    $(selector).each(function () {
      var $this = $(this),
        $src = $this.find(".ui-backgrounded-bg").attr("src");
      if ($this.find(".ui-backgrounded-bg").length) {
        $this
          .addClass("backgrounded")
          .css("backgroundImage", "url(" + $src + ")");
      }
    });
  },

  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "") {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      domScript.onload = callback;
    }
  },
};
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
$(document).on("click", ".mfp-gallery", function (e) {
  e.preventDefault();
  const _this = $(this);
  
  
  if ($(window).width() >= 992 || _this.hasClass('active-card') || _this.closest('.histories-card').find('.histories-card-text').length == 0) {
    $('.histories-card-img').removeClass('active-card');
    $.magnificPopup.open({
      items: { src: _this.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 800,
      mainClass: "my-mfp-zoom-in",
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        ajaxContentAdded: function () {
          setTimeout(function () {
            $(".mfp-wrap, .mfp-bg").addClass("not_delay");
            $(".mfp-popup").addClass("not_delay");
          }, 700);
        },
      },
    });
    FARBA.galleryCurrentIndex = $(this).closest(".col-us-12").index();
  } else {
     $('.histories-card-img').removeClass('active-card');
    _this.addClass("active-card");
  }
});

$(document).on("click", ".histories-card-text", function () {
  $(this).closest(".histories-card").find("a").click();
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
  autoplay: {
    delay: 3000,
  },
});

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

const videos = document.querySelectorAll(".ui-video video");
videos.forEach((el) => {
  el.addEventListener("playing", function () {
    this.nextElementSibling.style.display = "none";

    this.controls = true;
  });
  //отображаем кнопку при паузе видео
  el.addEventListener("pause", function () {
    this.nextElementSibling.style.display = "block";
  });
  //прячем кнопку при запуске видео через нативные контролы
  el.addEventListener("play", function () {
    this.nextElementSibling.style.display = "none";
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

// Toggle-top

function backTop() {
  let button = $(".toggle-top");
  $(window).on("scroll", () => {
    if ($(this).scrollTop() >= 50 && $(window).width() >= 1170) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
  });
  button.on("click", (e) => {
    e.preventDefault();
    $("html").animate({ scrollTop: 0 }, 1000);
  });
}
backTop();
