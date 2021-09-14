$(function() {
    var interval = setInterval(function() {
        var counter = $('.box-time span').html();
        counter = counter - 1;
        $('.box-time span').html(counter);

        if (counter == 0) {
            clearInterval(interval);
            $('.box-time span').fadeOut();
            $('.box-time a').delay(1000).fadeIn();
        }

    }, 1000);

});