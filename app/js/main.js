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








});

// var mixer = mixitup('.catalog');

var mixer = mixitup('.catalog', {
  
  animation: {
    effects: 'fade scale(1) translateZ'
  },

  // controls: {
  //   enable: 'true',
  //   activeClass: 'on',
  // }
});

