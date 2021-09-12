//tabs IMPORTANTE!
function openMenu(evt, menuXiiber) {
    var i, tabcontent, tablinksx;
    tabcontent = document.getElementsByClassName("tabcontentx");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinksx = document.getElementsByClassName("tablinksx");
    for (i = 0; i < tablinksx.length; i++) {
        tablinksx[i].className = tablinksx[i].className.replace(" active", "");
    }
    document.getElementById(menuXiiber).style.display = "block";
    evt.currentTarget.className += " active";
}
//Animacion de las tarjetas 
$(function() {
    $('.material-card > .mc-btn-action').click(function() {
        var card = $(this).parent('.material-card');
        var icon = $(this).children('i');
        icon.addClass('fa-spin-fast');

        if (card.hasClass('mc-active')) {
            card.removeClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-arrow-left')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-bars');

            }, 800);
        } else {
            card.addClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-bars')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-arrow-left');

            }, 800);
        }
    });
});

//Canvas
(function() {
    'use strict'

    document.querySelector('#navbarSideCollapse').addEventListener('click', function() {
        document.querySelector('.offcanvas-collapse').classList.toggle('open')
    })
})()