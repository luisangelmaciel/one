$(document).ready(function() {
    $(".post").on("keyup", function() {
        if ($("textarea").val().length > 60) {
            $(".post").animate({
                fontSize: "18px",
                height: "+10px"
            });
        } else {
            $(".post").animate({
                fontSize: "30px"
            });
        }
    });
    $('textarea').each(function() {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    $("button").click(function(event) {
        var post = $("textarea").val();
        // Get Current Date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        today = mm + '/' + dd + '/' + yyyy;

        $(".posts").prepend("<div class='new col-lg-10 col-md-10 col-sm-10'>" + "<span>تم النشر في " + today + "</span>" + post + "</div><br>");

        $(".form").slideUp();
    });
});