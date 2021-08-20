console.clear();

/* selector functions */
const $ = (s, o = document) => o.querySelector(s);
const $$ = (s, o = document) => o.querySelectorAll(s);

/* store references to all of the elements we'll need */
const inputs = $$('input[type="radio"]');
const horn1 = $('#horn-1'), horn2 = $('#horn-2'), horn3 = $('#horn-3'), horn4 = $('#horn-4'), horn5 = $('#horn-5');
const earL = $('#ear-l'), earR = $('#ear-r'), earring = $('#earring');
const pupil = $('#pupil');
const eyePaths = $$('.eye-path'), mouthPaths = $$('.mouth-path');
const chin = $('#chin'), tongue = $('#tongue'), toothTop = $('#tooth-top'), toothBot = $('#tooth-bot');
const avatar = $('#avatar');

/* path data for shape morphing */
const eye0 = "M175.4,75.3c-12,0-23.4-0.9-33.7-2.5c-4.2,6.4-6.7,14-6.7,22.2c0,12.4,5.7,23.5,14.6,30.9c6.9,5.7,15.8,9.1,25.4,9.1c9.7,0,18.5-3.4,25.4-9.1c8.9-7.3,14.6-18.4,14.6-30.9c0-8.2-2.5-15.8-6.7-22.1C198.3,74.5,187.1,75.3,175.4,75.3z";
const eye1 = "M213.3,82.3c-9.7,4-23.1,6.5-37.9,6.5s-28.2-2.5-37.9-6.5c-1.3,4-2.1,8.3-2.1,12.8c0,11,4.4,20.9,11.6,28.1c8.2-1.8,18-2.9,28.4-2.9s20.2,1.1,28.4,2.9c7.2-7.2,11.6-17.2,11.6-28.1C215.4,90.6,214.6,86.3,213.3,82.3z";
const eye2 = "M215.4,95.1c0-7.4-2-14.3-5.5-20.3c-9.3,2.5-21.3,4-34.5,4s-25.1-1.5-34.5-4c-3.5,6-5.5,12.9-5.5,20.3c0,13.1,6.3,24.7,16,32c7.2-1.1,15.4-1.7,24-1.7s16.8,0.6,24,1.7C209.1,119.8,215.4,108.2,215.4,95.1z";
const eye3 = "M152.9,128.2c6.8-0.9,14.5-1.5,22.5-1.5s15.7,0.5,22.5,1.5c10.6-7.2,17.5-19.3,17.5-33.1c0-12.8-6-24.2-15.4-31.5c-7.4,2-15.7,3.2-24.6,3.2s-17.3-1.2-24.6-3.2c-9.4,7.3-15.4,18.7-15.4,31.5C135.4,108.8,142.3,121,152.9,128.2z";
const eye4 = "M150.7,128.1c7.3-1.1,15.6-1.7,24.3-1.7s17,0.6,24.3,1.7c10.1-7.5,16.7-19.5,16.7-33c0-13.4-6.4-25.3-16.4-32.8c-6.9-5.2-15.4-8.2-24.6-8.2c-9.5,0-18.2,3.2-25.2,8.6c-9.6,7.5-15.8,19.2-15.8,32.4C134,108.6,140.6,120.6,150.7,128.1z";
const eye5 = "M219,95.1c0,12-4.7,23-12.4,30.9c-7.9,8.1-19,13.1-31.6,13.1c-12.2,0-23.2-4.9-31.1-12.9c-8-8-12.9-19-12.9-31.1c0-13.7,6.2-25.9,16-34c7.6-6.3,17.4-10,28-10c9.9,0,19.1,3.3,26.4,8.8C212.1,67.9,219,80.7,219,95.1z";
const mouth0 = "M174.6,178.2h5.1H215c0,0,0.1,0,0.1,0c0,0,0,0-0.1,0h-35.3L174.6,178.2l-4.6,0.1h-35c0,0-0.1,0-0.1,0c0,0,0,0,0.1,0h35H174.6z";
const mouth1 = "M175,172.6h7c8.9,0,16.2,6.4,17.7,14.9c0.2,1,0.3,2,0.3,3.1c0,0.8-0.5,2-2,2l-16,0h-7h-7l-16,0c-1.4,0-2-1.2-2-2c0-1,0.1-1.9,0.2-2.8c1.4-8.6,8.8-15.1,17.7-15.1H175z";
const mouth2 = "M175,187c5.5,0,9.7-2.1,13.8-4.1c5.5-2.7,11.3-5.5,17.6-0.4c0.1,0.1,0.3,0.3,0.2,0.4c-0.1,0.1-0.3,0.1-0.4,0c-5.6-5.1-11.7-2.6-17.4,0.2c-4.2,2-7.3,4.1-13.9,4.1c-6.5,0-9-2.1-12.9-4.1c-5.1-2.8-10.6-5.8-18.6-0.6c-0.1,0-0.1,0-0.1,0c0,0,0-0.1,0.1-0.1c7.9-5.4,13.4-2.4,18.8,0.5C165.9,185,169.7,187,175,187z";
const mouth3 = "M175,179.8c2,0,4-0.1,6-0.2c11-0.9,22-4.1,32.9-9.7c0.1,0,0.2-0.1,0.2,0c0,0.1-0.1,0.2-0.2,0.2c-11.6,6-21.7,9-33,9.7c-2,0.1-4,0.3-6,0.3c-2.3,0-4.6-0.1-6.8-0.3c-10.9-0.8-20.8-3.9-32.1-9.7c-0.1,0-0.1-0.1-0.1-0.1c0,0,0.1,0,0.2,0c10.7,5.5,21.4,8.7,32.1,9.6C170.5,179.7,172.7,179.8,175,179.8z";
const mouth4 = "M174.8,172.6h10H200l0,4.9c0,1.4-0.2,2.7-0.6,4c-1.8,5.9-7.5,10.1-14.3,10.1h-10.4h-9.9c-6.7,0-12.3-4.2-14.2-9.9c-0.4-1.3-0.7-2.7-0.7-4.2v-4.9h14.3H174.8z";
const mouth5 = "M175,165.6h4.8l23.3,0c5.6,0,8.9,4.7,8.9,8.9c0,3-0.4,6-1.2,8.7c-3.8,14-16.7,24.3-31.9,24.3H175h-3.9c-15.5,0-28.6-10.7-32.1-25.2c-0.6-2.5-0.9-5.2-0.9-7.9c0-5,4.1-8.9,8.9-8.9l23.9,0H175z";

/* vars */
let curRating = 0;
let tl;
let durReduced = 0, durNoPref = .5, dur;
let eyeTarg, mouthTarg, chinY, pupilS, earS, earY, earRotL, earRotR, earringX, earringY, tongueY, toothTopY, toothBotY;
const horns = [horn1,horn2,horn3,horn4,horn5];
let hornsU = [], hornsD = horns;
let mq;



// set up matchMedia instance to detect the reduced motion media query
mq = window.matchMedia('(prefers-reduced-motion: reduce)');
// safari doesn't support 'matchMedia.addEventListener' so we have to check support for that and add the legacy 'addListener' if not.
if(mq.addEventListener) {
	mq.addEventListener('change', onReduceMotionMQ);
} else {
	mq.addListener(onReduceMotionMQ);
}
// manually check media query initially
onReduceMotionMQ();



// activate any gsap plugins
gsap.registerPlugin(MorphSVGPlugin);

// set initial visual properties of avatar
gsap.set(earL, 		{transformOrigin: "40px 40px", rotate: "-15deg", y: 10, scale: .9});
gsap.set(earR, 		{transformOrigin: "40px 40px", rotate: "15deg", y: 10, scale: .9});
gsap.set(earring, 		{transformOrigin: "50% 0", x: -12, y: 8});
gsap.set(pupil,		{transformOrigin: "50% 50%"});
gsap.set(eyePaths, 		{morphSVG: eye0});
gsap.set(mouthPaths,	{morphSVG: mouth0});
gsap.set(chin, 		{y: 0});
gsap.set(horn1,		{transformOrigin: "20px 45px", scale: 0});
gsap.set(horn2,		{transformOrigin: "12px 45px", scale: 0});
gsap.set(horn3,		{transformOrigin: "32px 38px", scale: 0});
gsap.set(horn4,		{transformOrigin: "12px 38px", scale: 0});
gsap.set(horn5,		{transformOrigin: "50% 90%", scale: 0});
gsap.set(avatar, 		{opacity: 1});



/* add click handler to inputs */
inputs.forEach(function(i) {
	i.addEventListener("click", onRatingClick);
});

function onRatingClick(e) {
	// determine which rating was clicked
	let num = parseInt(e.target.getAttribute('data-num'));
	
	// crate new timeline
	tl = gsap.timeline({paused: true, defaults:{duration: dur, ease: "sine.out"}});
	
	// determine which horns go up/down
	hornsU = horns.slice(0,num);
	if(hornsU.length > curRating) {hornsU = hornsU.slice(curRating);}
	hornsD = horns.slice(num,curRating);
	
	// set props based on which rating was clicked on
	switch (num) {
		case 0:
			eyeTarg = eye0;
			mouthTarg = mouth0;
			chinY = 0;
			pupilS = 1;
			earS = .9; earY = 10; earRotL = "-15deg"; earRotR = "15deg"; earringX = -12; earringY = 8;
			tongueY = 0; toothTopY = 0; toothBotY = 0;
			break;
		case 1:
			eyeTarg = eye1;
			mouthTarg = mouth1;
			chinY = 3;
			pupilS = .84;
			earS = 1.1; earY = -4; earRotL = "10deg"; earRotR = "-10deg"; earringX = 0; earringY = 0;
			tongueY = 2; toothTopY = 5; toothBotY = -17;
			break;
		case 2:
			eyeTarg = eye2;
			mouthTarg = mouth2;
			chinY = -2;
			pupilS = .94;
			earS = 1.05; earY = -2; earRotL = "5deg"; earRotR = "-5deg"; earringX = -2; earringY = -1;
			tongueY = 0; toothTopY = 0; toothBotY = 0;
			break;
		case 3:
			eyeTarg = eye3;
			mouthTarg = mouth3;
			chinY = -4;
			pupilS = 1;
			earS = 1; earY = 0; earRotL = "0deg"; earRotR = "0deg"; earringX = -4; earringY = -2;
			tongueY = 0; toothTopY = 0; toothBotY = 0;
			break;
		case 4:
			eyeTarg = eye4;
			mouthTarg = mouth4;
			chinY = 3;
			pupilS = 1.1;
			earS = .95; earY = -3; earRotL = "2deg"; earRotR = "-2deg"; earringX = -2; earringY = -5;
			tongueY = -4; toothTopY = 6; toothBotY = -16;
			break;
		case 5:
			eyeTarg = eye5;
			mouthTarg = mouth5;
			chinY = 14;
			pupilS = 1.2;
			earS = .9; earY = -6; earRotL = "4deg"; earRotR = "-4deg"; earringX = 0; earringY = -10;
			tongueY = 0; toothTopY = 2; toothBotY = -2;
			break;
		default:
			break;
	}
	
	tl
		.to(eyePaths, 			{morphSVG: eyeTarg}, 0)
		.to(mouthPaths, 		{morphSVG: mouthTarg}, 0)
		.to(chin, 			{y: chinY}, 0)
		.to(pupil, 			{scale: pupilS}, 0)
		.to(earL, 			{scale: earS, y: earY, rotate: earRotL}, 0)
		.to(earR, 			{scale: earS, y: earY, rotate: earRotR}, 0)
		.to(earring, 			{x: earringX, y: earringY}, 0)
		.to(tongue, 			{y: tongueY}, 0)
		.to(toothTop, 			{y: toothTopY}, 0)
		.to(toothBot, 			{y: toothBotY}, 0)
	;
	
	if(hornsU.length) {
		if(dur) {
			gsap.to(hornsU, 	{scale: 1, stagger:{each:.1, ease: "power1.out"}, duration: dur, ease: "back.out"});
		} else {
			gsap.set(hornsU, 	{scale: 1});
		}		
	}
	if(hornsD.length) {
		if(dur) {
			gsap.to(hornsD,	{scale: 0, stagger: {each:-.08, ease: "power2.out"}, duration: dur, ease: "back.in"});
		} else {
			gsap.set(hornsD,	{scale: 0});
		}
	}
	
	curRating = num;
	
	tl.play();
}



function onReduceMotionMQ() {
	// change animation time depending on user preference
	if(mq.matches) {
		dur = durReduced;
	} else {
		dur = durNoPref;
	}
}