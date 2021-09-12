console.clear();

/* Slide setup */

const elSlidesContainer = document.querySelector('.slides');
const slideEls = [...document.querySelectorAll('.slide')];
const footerJumpButtons = document.querySelectorAll(".footer-jump");


/* ---------------------------------- */

let active = 0;

function hideSlides() {
    slideEls.forEach(el => el.setAttribute('hidden', ''));
    footerJumpButtons.forEach(el => delete el.dataset.active);
}

function goToSlide(slideIndex) {

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    hideSlides();

    // Loop around the array.
    var len = slideEls.length;
    active = ((slideIndex % len) + len) % len;

    slideEls[active].removeAttribute('hidden');
    footerJumpButtons[active].dataset.active = true;
}

function goToSlideEl(el) {
    goToSlide(slideEls.indexOf(el));
}

goToSlide(active);
elSlidesContainer.dataset.jsInitialized = true;

/* ---------------------------------- */

footerJumpButtons.forEach(button => {
    button.addEventListener(
        "click",
        () => goToSlideEl(document.querySelector(button.hash))
    );
});

/* ---------------------------------- */

const paginationButtons = document.querySelectorAll('.pagination-button');

paginationButtons.forEach(button => {
    let go = Number(button.dataset.go);
    button.addEventListener('click', () => goToSlide(active + go));
});

// Pinspiration
// https://www.pinterest.com/pin/271201208788842829/

$(document).ready(function() {

    // Page scrolling function for the nav-links
    $(".nav-link").click(function() {
        $('html,body').animate({ scrollTop: $(this.hash).offset().top - 80 }, 1400);
        return false;
    });

    // Back to Top Link
    $(".top-link").click(function() {
        $('html,body').animate({ scrollTop: $("#topSection").offset().top }, 2000);
        return false;
    });

    // Function to change the nav-bar on scroll
    $(window).scroll(function() {
        ($(window).scrollTop() >= 110) ? (
            $('.nav-bar').addClass('scrolled')
        ) : (
            $('.nav-bar').removeClass('scrolled')
        );
    });

    // Setting the active nav-link based on the scroll position
    // There is a better way to do this but this way works so I'll fix it later
    $(window).scroll(function() {
        if ($(window).scrollTop() >= $('#contactSection').offset().top - $(window).height() / 2) {
            $('.nav-link').removeClass('active');
            $('#contactLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#priceSection').offset().top - $(window).height() / 2) {
            $('.nav-link').removeClass('active');
            $('#priceLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#servicesSection').offset().top - $(window).height() / 2) {
            $('.nav-link').removeClass('active');
            $('#servicesLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#teamSection').offset().top - $(window).height() / 2) {
            $('.nav-link').removeClass('active');
            $('#teamLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#portfolioSection').offset().top - $(window).height() / 2) {
            $('.nav-link').removeClass('active');
            $('#portfolioLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#aboutSection').offset().top - $(window).height() / 2) {
            $('.nav-link').removeClass('active');
            $('#aboutLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#topSection').offset().top - $(window).height() / 2) {
            $('.nav-link').removeClass('active');
            $('#topLink').addClass('active');
        }
    });

});