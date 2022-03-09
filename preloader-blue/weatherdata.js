//Example code used and adapted:
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
//https://www.w3schools.com/js/js_json_parse.asp

var celsius = false;

function f1() {

    navigator.geolocation.getCurrentPosition(function(pos) {

        var req = new XMLHttpRequest();

        req.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                var myObj = JSON.parse(this.responseText);

                document.getElementById("weatherdata").innerHTML =
                    myObj.name + ", " +
                    myObj.sys.country + "<br/><br/>" +

                    "<img src=" + myObj.weather[0].icon + ">" + "<br/>" +
                    myObj.weather[0].main + "<br/><br/>" +

                    "Temperatura: " + Math.round(myObj.main.temp) + " &#176;C" + "<br/><br/>" +

                    "Humedad: " + myObj.main.humidity + "%";
            }
        };

        var w = "https://fcc-weather-api.glitch.me/api/current?lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude;

        req.open("GET", w, true);
        req.send();
    });

    celsius = true;
}


function fF() {

    navigator.geolocation.getCurrentPosition(function(pos) {

        var req = new XMLHttpRequest();

        req.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                var myObj = JSON.parse(this.responseText);

                document.getElementById("weatherdata").innerHTML =
                    myObj.name + ", " +
                    myObj.sys.country + "<br/><br/>" +

                    "<img src=" + myObj.weather[0].icon + ">" + "<br/>" +
                    myObj.weather[0].main + "<br/><br/>" +

                    "Temperatura: " + Math.round(1.8 * myObj.main.temp + 32) + " &#176;F" + "<br/><br/>" +

                    "Humedad: " + myObj.main.humidity + "%";
            }
        };

        var w = "https://fcc-weather-api.glitch.me/api/current?lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude;

        req.open("GET", w, true);
        req.send();
    });

    celsius = false;
}


function switchCelsiusAndFahrenheit() {

    if (celsius) {
        fF();
    } else {
        f1();
    }

}