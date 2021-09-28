console.clear();

Splitting();

// Replay animation by hiding & showing the element again
let el = document.body;
el.addEventListener("click", function(e) {
    el.hidden = true;
    requestAnimationFrame(() => {
        el.hidden = false;
    });
});

// Small helper to make sure the animation stays in sync.
requestAnimationFrame(() => {
    document.body.dataset.play = true;
});