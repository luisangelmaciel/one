$(document).ready(function () {

	//hide all descriptions
	$('.description').hide();

	function showFullHeight() {

	   $('.gallery li').each(function() {

	   	$(this).find('.btn').click(function(e){

	   	console.log('Botão clicado');
	  	
	  	e.preventDefault();

	  	 //NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
		 	$('.description').slideUp('normal');

	     //IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
			if($(this).next().is(':hidden') == true) {
				
				//ADD THE ON CLASS TO THE BUTTON
				$(this).addClass('on');
				  
				//OPEN THE SLIDE
				$(this).next().slideDown('normal');



			 } 
	        
	   }); //click
	  });//each
	}//function


	//load the function when the doc is ready		
  showFullHeight();
  
});