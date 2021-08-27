"use strict";
{
	const canvas = document.querySelector("canvas");
	const invaders = () => {
		const width = canvas.width = canvas.offsetWidth;
		const height = canvas.height = canvas.offsetHeight;
		const ctx = canvas.getContext("2d");
		const nx = Math.floor(width / (12 * 5));
		const ny = Math.floor(height / (12 * 5));
		const ox = 0.5 * (width - (8 * 5 * nx + 4 * 5 * (nx - 1)));
		const oy = 0.5 * (height - (8 * 5 * ny + 4 * 5 * (ny - 1)));
		for (let x = 0; x < nx; x++) {
			for (let y = 0; y < ny; y++) {
				for (let i = 0; i < 8; i++) {
					let bits = Math.random().toString(2).substr(2,4).split("");
					bits = bits.concat(bits.slice().reverse());
					bits.forEach((n, j) => {
						if (n === "1") {
							ctx.beginPath();
							ctx.fillStyle = "#333";
							ctx.arc(
								ox + x * 12 * 5 + j * 5,
								oy + y * 12 * 5 + i * 5,
								2.1,
								0,
								2 * Math.PI
							);
							ctx.fill();
						}
					});
				}
			}
		}
	};
	window.addEventListener("resize", invaders, false);
	["click", "touchdown"].forEach(event => {
		document.addEventListener(event, invaders, false);
	});
	invaders();
}