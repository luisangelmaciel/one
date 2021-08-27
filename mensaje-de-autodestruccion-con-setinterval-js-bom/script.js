var countDown = document.getElementById("count");

window.onload = function() {

    var counter = setInterval(function() {

        countDown.textContent = countDown.textContent - 1

        if (countDown.textContent <= 0) {
            clearInterval(counter);

            document.getElementsByClassName("message")[0].style.opacity = "0"

        } else if (countDown.textContent < 10) {
            countDown.textContent = "0" + countDown.textContent

        }

    }, 1000);



}




// creating my image link

var link = document.createElement("a");
document.body.appendChild(link);

link.href = "https://twitter.com/luisangelmaciel";
link.target = "_blank";

var photo = document.createElement("img");
link.appendChild(photo);

photo.src =
    "https://luisangelmaciel.github.io/luisangelmaciel/logos/lamp-developer-products-and-experience.png";
photo.alt = "luisangelmaciel";

photo.style =
    "border-radius:50%;position:fixed;bottom:20px;right:20px;transition:all 0.5s ease";

photo.onmouseover = function() {
    this.style.transform = "scale(1.1,1.1)";
    this.style.boxShadow = "5px 5px 15px #fff";
};

photo.onmouseout = function() {
    this.style.transform = "scale(1,1)";
    this.style.boxShadow = "none";
};