/*
===============================================================

Hi! Welcome to my little playground!

My name is Tobias Bogliolo. 'Open source' by default and always 'responsive',
I'm a publicist, visual designer and frontend developer based in Barcelona. 

Here you will find some of my personal experiments. Sometimes usefull,
sometimes simply for fun. You are free to use them for whatever you want 
but I would appreciate an attribution from my work. I hope you enjoy it.

===============================================================
*/

$(document).ready(function(){
	var activeBanner = 1;
	$(".button").on("click", function(){
		if (activeBanner) {
			$(".content-box").slideUp(100, function(){
				$(".banner").animate({right: '-300px'}, function(){
					$(".button").css({
						"right": '315px'
					});
					$(".circle").css("background", "#673AB7");
				});
			});
			activeBanner = 0;
		}
		else {
			$(".button").css({
				"right": '15px'
			});
			$(".circle").css("background", "#00695C");
			$(".banner").animate({right: '0px'}, function(){
				$(".content-box").slideDown(100, function(){
				});
			});
			activeBanner = 1;
		};
	});
});