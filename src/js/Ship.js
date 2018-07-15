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

		this.canvas.use(this.wrapper)
			.on('mousedown', this.cancelDragImage);
		this.ship = this.wrapper.image(this.pathToImage, this.widthShipe, this.heightShipe);
		this.ship.on('mousedown', () => false);
		this.pos = point;
		this.setPos(point);
		this.duration = 'right';
	}

	cancelDragImage = e => e.preventDefault();

	get x() {
		return this.pos.x;
	}

	get y() {
		return this.pos.y;
	}

	setPos(point) {
		this.duration = point.x < this.pos.x ? 'left' : 'right';
		let rotation = Math.asin((point.y - this.pos.y) / this.hypotenuse(point.x - this.pos.x, point.y - this.pos.y)) || 0;
		rotation = this.radianToDegree(rotation) + this.beginRotateForHorizontalAlign;

		this.wrapper.transform({
			a: this.duration === 'left' ? -1 : 1,
			b: 0,
			c: 0,
			d: 1,
			e: point.x - this.axisShip.x + (this.duration === 'left' ? this.widthShipe : 0),
			f: point.y - this.axisShip.y,
		});

		this.ship
			.transform({ rotation });

		this.pos = point;
	}

	hypotenuse = (a, b) => Math.sqrt(a ** 2 + b ** 2)

	radianToDegree = rad => rad * 180 / Math.PI
}

export default Ship;
