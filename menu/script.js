var close = $('.close');
var hamburger = $('.hamburger');
var mega = $('.mega-menu');

hamburger.click(function() {
    mega.addClass('active');
});

close.click(function() {
    mega.removeClass('active');
});