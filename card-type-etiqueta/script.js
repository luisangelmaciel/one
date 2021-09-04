$('div.info').hide().fadeIn(1000).delay(3500).fadeOut(800);

$('div.set').click(function() {
  $('div.content').addClass('show');
  $('div').removeClass('pagevis');
  
  if ($(this).is('#set1')) {
    $('div#page1').addClass('pagevis').siblings('div').removeClass('pageVis');
  }
  else if ($(this).is('#set2')) {
    $('div#page2').addClass('pagevis');
  }
  else if ($(this).is('#set3')) {
    $('div#page3').addClass('pagevis');
  }
  else {
    $('div#page4').addClass('pagevis');
  }
});//end set click i.e. content visible
$('div.content span').click(function() {
  $('div.content').removeClass('show');
});