$(document).ready(function () {
  $(".login").click(function () {
    var user = $(".user").val(),
        pass = $(".pass").val();
    if(user === "admin" && pass === "admin") {
      $(".lec").css("display","block");
    } else {
    window.location.replace("https://www.google.com");
    }
  });
  $(".new").click(function () {
    $(".lec-sec").append("<div class='lec'><h1 class='lec-num'></h1><br><h2 class='lec-name'></h2><br><a href='' target='_blank' class='prev'>Preview</a><br><br><a href='' target='_blank' class='down'>Download</a></div>");

    $(".lec-num").text($(".number").val());
    $(".lec-name").text($(".title").val());
    $(".prev").attr("href", $(".preview-link").val());
    $(".down").attr("href", $(".download-link").val());
  });
});