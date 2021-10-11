var currentDate;
var hours = 14;
var minutes = 27;
var seconds = 54;
var counter = 0;

setInterval(() => {
    counter++;
    var minutesTimeSpan = counter * 1000;
    currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + minutesTimeSpan);
    countDownDate = currentDate.getTime();
    refreshTime();
}, 1000);

function refreshTime() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateDOM(hours, minutes, seconds);
}

function updateDOM(hours, minutes, seconds) {
    if ( hours.toString().length == 2 ) {
        document.getElementById("hour-first-digit").innerHTML = hours.toString().split("")[0];
        document.getElementById("hour-second-digit").innerHTML = hours.toString().split("")[1];
    } else {
        document.getElementById("hour-first-digit").innerHTML = "0";
        document.getElementById("hour-second-digit").innerHTML = hours.toString();
    }

    if ( minutes.toString().length == 2 ) {
        document.getElementById("minute-first-digit").innerHTML = minutes.toString().split("")[0];
        document.getElementById("minute-second-digit").innerHTML = minutes.toString().split("")[1];
    } else {
        document.getElementById("minute-first-digit").innerHTML = "0";
        document.getElementById("minute-second-digit").innerHTML = minutes.toString();
    }

    if ( seconds.toString().length == 2 ) {
        document.getElementById("second-first-digit").innerHTML = seconds.toString().split("")[0];
        document.getElementById("second-second-digit").innerHTML = seconds.toString().split("")[1];
    } else {
        document.getElementById("second-first-digit").innerHTML = "0";
        document.getElementById("second-second-digit").innerHTML = seconds.toString();
    }
}