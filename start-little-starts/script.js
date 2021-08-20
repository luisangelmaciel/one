gsap.registerPlugin(Physics2DPlugin);

let bg = document.querySelector(".animation-bg");
let i, dot;
const submit = document.querySelector(".send-stars");
const icon = document.querySelector(".icon");

function createStar() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 512.001 512.001");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("class", "star");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    let d = `M511.266,197.258c-1.764-5.432-6.458-9.389-12.108-10.209l-158.722-23.066L269.452,20.156
	c-2.527-5.121-7.741-8.361-13.451-8.361c-5.709,0-10.924,3.24-13.451,8.361l-70.988,143.826L12.843,187.049
	c-5.649,0.82-10.345,4.777-12.108,10.207c-1.765,5.432-0.293,11.393,3.795,15.377l114.848,111.955L92.27,482.67
	c-0.965,5.629,1.349,11.315,5.968,14.672c4.619,3.355,10.741,3.799,15.797,1.141L256,423.845l141.961,74.637
	c2.195,1.154,4.591,1.723,6.979,1.723c3.11,0,6.206-0.965,8.818-2.863c4.619-3.357,6.933-9.045,5.968-14.672L392.61,324.588
	l114.86-111.955C511.559,208.648,513.031,202.687,511.266,197.258z`;

    path.setAttribute("d", d);
    svg.appendChild(path);

    return svg;
}

icon.appendChild(createStar());

// create some star elements to populate array


// set the initial positions

// Create a few tweens to run with Physics2D animation
function animate() {
    let stars = [];
    for (var j = 0; j < 10; j++) {
        var star = createStar();
        star.style.setProperty('--hue', gsap.utils.random(0, 359))
        bg.appendChild(star);
        stars.push(star);
    }
    gsap.set(stars, {
        x: 110,
        y: 0,
        scale: "random(0.4, 1)",
        '--alpha': 1
    });

    gsap.set(icon, {
        x: 0,
        y: 3.5
    })

    // probably should use a timeline for all these tweens
    gsap.to(icon, {
        duration: .5,
        y: 10,
        //ease: Power0.easeOut
        ease: Elastic.easeOut
    });

    gsap.from(stars, {
        x: 100,
        y: 2,
        '--alpha': 0,
        zIndex: 150
    });

    gsap.timeline()
        .to(stars, {
            duration: 2,
            zIndex: 10,
            onComplete: () => {
                stars.forEach(s => s.remove())
            },
            physics2D: {
                velocity: "random(250, 400)",
                angle: "random(250, 290)",
                gravity: 450,
                friction: 0.005
            },
            rotation: 190,
            transformOrigin: "50% 50%"
        })
        .to(stars, {
            '--alpha': 0
        });

    gsap.to(icon, {
        duration: 0.5,
        y: 4,
    });

    gsap.to(submit, {
        zIndex: 100
    });
}

submit.addEventListener("click", animate);

submit.addEventListener('pointerdown', () => {
    gsap.ticker.add(animate)
})

submit.addEventListener('pointerup', () => {
    gsap.ticker.remove(animate)
})

gsap.ticker.fps(24)
    // todo
    // for hitting enter multiple times id like to see more stars add into the array rather than restarting the animation