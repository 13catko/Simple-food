$(function () {

  $('.reviews__inner').slick({

    prevArrow: '<button type="button" class="slider__arrow slider__arrow--prev"><svg><use xlink: href="images/sprite.svg#icon-right"></use></svg></button>',

    nextArrow: '<button type="button" class="slider__arrow slider__arrow--next"><svg><use xlink: href="images/sprite.svg#icon-right"></use></svg></button>',

    appendArrows: '.arrows-wrap',
    appendDots: '.arrows-wrap',

    arrows: true,
    dots: true,
    fade: false,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',

    breakpoint: 560,
    settings: {
      dots: false,
    }

  });


  const btn = document.querySelector('.menu__mobile-btn'); //наша кнопка
  const btnclose = document.querySelector('.btn-close')
  const mobileMenu = document.querySelector('.mobile-menu'); //мобильное меню
  const bodyLock = document.querySelector('body'); //ищем как селектор ТЕГА
  const fixed = document.querySelector('header')


  btn.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu--active'); //когда меню открыто
    btnclose.classList.remove('menu--active')

    if (mobileMenu.classList.contains('menu--active')) { //Проверяем, есть ли у меню активный класс
      bodyLock.classList.add('lock'); //Блокируем скролл при открытом меню
      fixed.classList.add('fixed-menu--deskr');
    }

    else { //Когда нету активного класса у меню
      fixed.classList.remove('fixed-menu--deskr');
      bodyLock.classList.remove('lock'); //Разрешаем скроллить
    }
  });


  document.addEventListener('click', function (e) {
    if (e.target !== btn && e.target !== mobileMenu) {
      mobileMenu.classList.remove('menu--active');
      bodyLock.classList.remove('lock');
      fixed.classList.remove('fixed-menu--deskr');
    }
  });


  let swiperTwo; // Объявляем переменную для свайпера

  // Функция для инициализации свайпера
  function initSwiper() {
    swiperTwo = new Swiper('.restaurants__inner-list', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  // Функция для проверки ширины экрана и инициализации свайпера при необходимости
  function checkScreenWidth() {
    if (window.innerWidth <= 560) {
      if (!swiperTwo) {
        initSwiper();
      }
    } else {
      if (swiperTwo) {
        swiperTwo.destroy(); // Уничтожаем свайпер, если ширина экрана больше 560px
        swiperTwo = undefined; // Обнуляем переменную свайпера
      }
    }
  }

  // Вызываем функцию проверки ширины экрана при загрузке страницы и при изменении размера окна
  window.addEventListener('load', checkScreenWidth);
  window.addEventListener('resize', checkScreenWidth);



  window.addEventListener('scroll', function () {
    let up_menu = document.getElementById('header');
    let distance = window.scrollY; // Получаем текущее положение скролла

    if (distance >= 159) {
      up_menu.classList.add('fixed-menu');
    } else {
      up_menu.classList.remove('fixed-menu');
    }
  });



});

var mixer = mixitup('.catalog');





// var mixer = mixitup('.catalog', {
  
//   animation: {
//     effects: 'fade scale(1) translateZ'
//   },

//   // controls: {
//   //   enable: 'true',
//   //   activeClass: 'on',
//   // }
// });
// ////////////////////////////////////////////




