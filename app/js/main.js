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
    autoplay: false,
    autoplaySpeed: 2000,

  });




  const btn = document.querySelector('.menu__mobile-btn'); //наша кнопка
  const btnclose = document.querySelector('.btn-close')
  const mobileMenu = document.querySelector('.mobile-menu'); //мобильное меню
  const bodyLock = document.querySelector('body'); //ищем как селектор ТЕГА



  btn.addEventListener('click', () => {
    mobileMenu.classList.add('menu--active'); //когда меню открыто
    btnclose.classList.remove('menu--active')

    if (mobileMenu.classList.contains('menu--active')) { //Проверяем, есть ли у меню активный класс
      bodyLock.classList.add('lock'); //Блокируем скролл при открытом меню
    }

    else { //Когда нету активного класса у меню
    
      bodyLock.classList.remove('lock'); //Разрешаем скроллить
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target !== btn && e.target !== mobileMenu) {
      mobileMenu.classList.remove('menu--active');
      bodyLock.classList.remove('lock');
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

