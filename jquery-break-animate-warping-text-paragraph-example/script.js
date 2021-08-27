$(document).ready(function() {
    setup();
});


function setup() {

    var $passage = $('#weirdtext');

    //get the inner HTML of the #weirdtext paragraph
    var rawtxt = $passage.html();

    //Get the length of the string for use in loop
    var len = rawtxt.length;

    //empty string used to store final text that includes spans
    var newtext = '';


    //For each character inside #weirdtext string (this is why we got length)
    for (var i = 0; i < len; i++) {

        //get a random num between 1 and 5
        var rng = Math.floor(Math.random() * 5) + 1;

        //get the i-th character from the string
        var currentchar = rawtxt.charAt(i);
        if (currentchar == ' ') {
            //if it's a space, add an empty .space span
            var newchar = '<span class="space"></span>';
        } else {
            //otherwise, wrap it with a span, and give it class effectN, where N is a random int as before
            var newchar = '<span class="effect' + rng + '">' + currentchar + '</span>';
        }
        //add this new "char" (actually it's a char with spans wrapping it) to the empty string
        newtext = newtext + newchar;
    }

    //replace #weirdtext paragraphs inner HTML with the newly created string
    $passage.html(newtext);

}