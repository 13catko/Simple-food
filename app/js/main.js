$(function () {

  const swiperTwo = new Swiper('.popular-categoty__filter-list', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 20,

    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
      },
      480: {
        slidesPerView: 2,
      },
      360: {
        slidesPerView: 1,
      },
    },

  });
  


});