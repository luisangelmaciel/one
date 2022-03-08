$('#card-text').keyup(function() {
  
  var length = $(this).val().length;
  var lowerLimit = 12;
  var upperLimit = 18;
  
  $(this).val($(this).val().replace(/[\r\n\v]+/g, ''));
  
  if(length<lowerLimit) {
      $('#card-text').css("padding-top","72px");
  }
    
  else if(length>=lowerLimit && length<upperLimit) {
      $('#card-text').css("padding-top","48px");
  }
  
  else if(length>upperLimit) {
    $('#card-text').css("padding-top","12px");
  }
});

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
              var imageURL = e.target.result;
              $('#card-image').css('background-image', 'url(' + imageURL + ')');
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }


$("#file-upload").change(function(){
  readURL(this);
});

$("#card-text").focus(function() {
    var $this = $(this);
    $this.select();

    // Work around Chrome's little problem
    $this.mouseup(function() {
        // Prevent further mouseup intervention
        $this.unbind("mouseup");
        return false;
    });
});