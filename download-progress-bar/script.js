$('.arrow').on('click', function() {
  $('.arrow__left, .arrow__right').toggleClass('rotate');
  $('.arrow__top').toggleClass('size');
  $('.arrow__top-ball').toggleClass('move');
  $('.arrow__fill').toggleClass('fill');
  $('.status__percent').toggleClass('appear');
  
  setTimeout ( function() {
  let duration = 5000; // 5 seconds
    $('.arrow__fill').stop().animate(
      {scaleX: 1}, { //stop when the scale reaches 1
      duration: duration,
      progress: function(promise, progress, ms) {
      $('.status__percent').text(Math.round(progress * 100) + '%');}
  });
  }, 1800); // 1.8 seconds delay
  
});