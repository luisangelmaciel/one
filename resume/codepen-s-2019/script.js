console.clear();

/* Slide setup */

const elSlidesContainer = document.querySelector('.slides');
const slideEls = [...document.querySelectorAll('.slide')];
const footerJumpButtons = document.querySelectorAll(".footer-jump");


/* ---------------------------------- */

let active = 0;

function hideSlides(){
  slideEls.forEach( el => el.setAttribute('hidden', ''));
  footerJumpButtons.forEach( el => delete el.dataset.active );
}

function goToSlide(slideIndex){
  
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });
  
  hideSlides();
  
  // Loop around the array.
  var len = slideEls.length;
  active = ( ( slideIndex % len) + len ) % len;
  
  slideEls[active].removeAttribute('hidden');
  footerJumpButtons[active].dataset.active = true;
}

function goToSlideEl(el){
  goToSlide(slideEls.indexOf(el));
}

goToSlide(active);
elSlidesContainer.dataset.jsInitialized = true;

/* ---------------------------------- */

footerJumpButtons.forEach(button => {
  button.addEventListener(
    "click", 
    ()=> goToSlideEl(document.querySelector(button.hash)) 
  );
});

/* ---------------------------------- */

const paginationButtons = document.querySelectorAll('.pagination-button');

paginationButtons.forEach( button => {
  let go = Number(button.dataset.go);
  button.addEventListener('click', ()=> goToSlide(active + go) );
});