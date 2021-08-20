function articleSlide() {

  var art = $('article'),
      mag = $('#mag'),
      aCount = art.length;
  
  var mLength = aCount * 100,
      aLength = 100 / aCount;
  
  mag.css('width', mLength + '%');
  art.css('width', aLength + '%');
  
  var pos = 0,
      max = mLength - 100;
  
  $(document).keydown(function(e){
    var press = e.keyCode,
        cantProgress = $('.open').length;
    if(!cantProgress){
      if(press == 39 && pos > "-" + max){
        pos += -100;
        mag.css('margin-left', pos + '%');
      } else if (press == 37 && pos < 0) {
        pos += 100;
        mag.css('margin-left', pos + '%');
      }
    }
  });
  
  $('.nxt').on('click', function(){
    var cantProgress = $('.open').length;
    if(pos > "-" + max && !cantProgress){
      pos += -100;
      mag.css('margin-left', pos + '%');
    }
  });
  
  $('.bck').on('click', function(){
    var cantProgress = $('.open').length;
    if(pos < 0 && !cantProgress){
      pos += 100;
      mag.css('margin-left', pos + '%');
    }
  });
 
}

function articleDisplay() {
  $('.read').on('click', function(){
    var parent = $(this).parent().parent().parent(),
        content = parent.find('.content').find('.scroll');
    parent.toggleClass('open');
    //I was too lazy to deal with bloated html content. This could potentially be dynamically injected content though.
    $.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242749/content.html', function(data){
      content.html(data);
    });
    
    if($(this).hasClass('back')){
      $(this).removeClass('back').html('Read')
    } else{
      $(this).addClass('back').html('Back');
    }
    
  });
}

function init() {
  articleSlide();
  articleDisplay();
}

$(document).ready(init);