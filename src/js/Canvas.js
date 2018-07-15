import PlotCubicSpline from './PlotCubicSpline';
import Point from './Point';
import Text from './Text';
import Ship from './Ship';
import defaultPoints from './defaultPoints.json';
import defaultText from './defaultText.json';

class Canvas {
	isEdit = false;
	setIntervalId;
	constructor(canvas) {
		this.canvas = canvas;

		const tmp = [...defaultPoints, { x: canvas.width() + 20, y: 400 }, { x: -20, y: 20 }];
		this.plotCubicSpline = new PlotCubicSpline(canvas, tmp, {
			a: Math.min(...tmp.map(point => point.x)),
			b: Math.max(...tmp.map(point => point.x)),
			c: Math.min(...tmp.map(point => point.y)),
			d: Math.max(...tmp.map(point => point.y)),
		});
		this.plotCubicSpline.draw();

		const self = this;
		this.pointAndTextes = [];
		for (let i = 0; i < defaultPoints.length; i++)
			this.pointAndTextes[i] = {
				text: new Text(document.getElementById('ship-on-waves'), defaultPoints[i], defaultText[i], this.callBackMotionShipeAndTextActive(self)),
				point: new Point(this.canvas, defaultPoints[i], this.callBackDragAndDropPoint(self), this.callBackRemovePoint(self)),
			};
		for (let i = 0; i < this.pointAndTextes.length; i++)
			this.pointAndTextes[i].point.draw();

		this.pointAndTextes[0].text.active();

		this.current = this.pointAndTextes[0];
		this.ship = new Ship(canvas, { x: this.current.point.x, y: this.canvas.height() - this.current.point.y });
		this.canvas.on('click', this.newPointAndText);
	}
	newPointAndText = e => {
		if (!this.isEdit)
			return;
		if (this.canvas.node !== e.target)
			return;

		const point = {
			x: e.x - this.canvas.node.parentElement.offsetLeft,
			y: this.canvas.height() - (e.y - this.canvas.node.parentElement.offsetTop),
		};
		const newElement = {
			text: new Text(document.getElementById('ship-on-waves'), point, 'text', this.callBackMotionShipeAndTextActive(this)),
			point: new Point(this.canvas, point, this.callBackDragAndDropPoint(this), this.callBackRemovePoint(this)),
		};
		newElement.point.draw();
		newElement.point.edit();
		newElement.text.noneDisabled();
		this.pointAndTextes.push(newElement);
		this.cubicSplineUpdatePoints(this);
	}

	callBackMotionShipeAndTextActive(self) {
		return function () {
			const pointAndText = self.pointAndTextes.find(a => a.text === this);
			self.current.text.noneActive();
			pointAndText.text.active();
			self.motionShipStop();
			self.motionShipToPoint(pointAndText.point);
			self.current = pointAndText;
		};
	}

	callBackRemovePoint(self) {
		return function () {
			if (self.pointAndTextes.length === 1)
				return false;
			self.pointAndTextes = self.pointAndTextes.filter(a => (a.point === this ? (a.text.remove(), false) : true));

			self.cubicSplineUpdatePoints(self);

			if (self.current.point === this) {
				self.current = self.pointAndTextes[0];
				self.current.text.active();
				self.ship.setPos({
					x: self.current.point.x,
					y: self.plotCubicSpline.y(self.current.point.x),
				});
				self.ship.setPos({
					x: self.ship.x + 1e-3,
					y: self.plotCubicSpline.y(self.ship.x + 1e-3),
				});
			}
		};
	}

	cubicSplineUpdatePoints(self) {
		const points = self.pointAndTextes.map(a => ({ x: a.point.x, y: a.point.y }));
		points.push({ x: -20, y: 20 });
		points.push({ x: self.canvas.width() + 20, y: 400 });
		self.plotCubicSpline.update(points);
		self.plotCubicSpline.draw();
	}

	callBackDragAndDropPoint(self) {
		return function (point) {
			const pointAndText = self.pointAndTextes.find(a => a.point === this);
			pointAndText.point.point = point;
			pointAndText.text.setPoint(point || { x: -1000, y: -1000 });

			const points = self.pointAndTextes.map(a => ({ x: a.point.x, y: a.point.y }));
			points.push({ x: -20, y: 20 });
			points.push({ x: self.canvas.width() + 20, y: 400 });
			self.plotCubicSpline.update(points);
			self.plotCubicSpline.draw();
			self.ship.setPos({
				x: self.ship.x,
				y: self.plotCubicSpline.y(self.ship.x),
			});
			self.ship.setPos({
				x: self.ship.x + 1e-3,
				y: self.plotCubicSpline.y(self.ship.x + 1e-3),
			});
		};
	}

	motionShipToPoint = point => {
		let x = this.ship.x;
		if (this.ship.x < point.x)
			this.setIntervalId = setInterval(() => {
				this.ship.setPos({
					x,
					y: this.plotCubicSpline.y(x),
				});
				console.log('angle = ', this.ship.angle);
				if (x < point.x)
					x += 1 + this.ship.angle / 100;
				else clearInterval(this.setIntervalId);
			}, 10);
		else
			this.setIntervalId = setInterval(() => {
				this.ship.setPos({
					x,
					y: this.plotCubicSpline.y(x),
				});
				console.log('angle = ', this.ship.angle);
				if (point.x < x)
					x -= 1 + this.ship.angle / 100;
				else clearInterval(this.setIntervalId);
			}, 10);
	}

	motionShipStop = () => {
		clearInterval(this.setIntervalId);
	}

	edit = () => {
		this.isEdit = true;
		for (let i = 0; i < this.pointAndTextes.length; i++) {
			this.pointAndTextes[i].text.noneDisabled();
			this.pointAndTextes[i].point.edit();
		}
	}
	noneEdit = () => {
		this.isEdit = false;
		for (let i = 0; i < this.pointAndTextes.length; i++) {
			this.pointAndTextes[i].text.disabled();
			this.pointAndTextes[i].point.noneEdit();
		}
	}
}

export default Canvas;
