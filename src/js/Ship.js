class Ship {
	beginRotateForHorizontalAlign = -8;
	widthShipe = 63
	heightShipe = 41
	shiftFromCenter = 5
	axisShip = {
		x: this.widthShipe / 2,
		y: this.heightShipe,
	}
	pathToImage = 'img/ship.png';

	constructor(canvas, point = { x: 0, y: 0 }) {
		this.canvas = canvas;
		this.wrapper = this.canvas.symbol();
		this.canvas.use(this.wrapper);
		this.ship = this.wrapper.image(this.pathToImage, this.widthShipe, this.heightShipe);
		this.ship
			.rotate(this.beginRotateForHorizontalAlign);
		this.pos = point;
		this.setPos(point);
		this.duration = 'right';
	}

	get x() {
		return this.pos.x;
	}

	get y() {
		return this.pos.y;
	}

	setPos(point) {
		this.duration = point.x - this.pos.x < 0 ? 'left' : 'right';
		let rotation = this.radianToDegree(Math.asin((point.y - this.pos.y) / this.hypotenuse(point.x - this.pos.x, point.y - this.pos.y))) || 0;
		if (this.duration === 'left')
			rotation = -rotation;

		this.wrapper
			.move(point.x - this.axisShip.x, point.y - this.axisShip.y);

		this.ship
			.transform({ rotation });

		this.pos = point;
	}

	hypotenuse = (a, b) => Math.sqrt(a ** 2 + b ** 2)

	radianToDegree = rad => rad * 180 / Math.PI
}

export default Ship;
