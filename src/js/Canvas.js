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
		this.pointAndTextes = [];
		for (let i = 0; i < defaultPoints.length; i++)
			this.pointAndTextes[i] = {
				text: new Text(document.getElementById('ship-on-waves'), defaultPoints[i], defaultText[i]),
				point: new Point(this.canvas, defaultPoints[i], point => {
					this.pointAndTextes[i].point.point = point;
					this.pointAndTextes[i].text.setPoint(point || { x: -1000, y: -1000 });
					// two point add outside canvas
					const points = this.pointAndTextes.map(a => ({ x: a.point.x, y: a.point.y }));
					points.push({ x: -20, y: 20 });
					points.push({ x: canvas.width() + 20, y: 400 });
					this.plotCubicSpline.update(points);
					this.plotCubicSpline.draw();
					this.ship.setPos({
						x: this.ship.x,
						y: this.plotCubicSpline.y(this.ship.x),
					});
					this.ship.setPos({
						x: this.ship.x + 1e-3,
						y: this.plotCubicSpline.y(this.ship.x + 1e-3),
					});
				}),
			};
		for (let i = 0; i < this.pointAndTextes.length; i++)
			this.pointAndTextes[i].point.draw();


		this.pointAndTextes[0].text.active();
		for (let i = 0; i < this.pointAndTextes.length; i++)
			this.pointAndTextes[i].text.wrapperForEvent.addEventListener('click', () => {
				this.pointAndTextes.find(a => a.text === this.current.text).text.noneActive();
				this.pointAndTextes[i].text.active();
				this.motionShipStop();
				this.motionShipToPoint(this.pointAndTextes[i].point);
				this.current = this.pointAndTextes[i];
			});

		this.current = this.pointAndTextes[0];
		this.ship = new Ship(canvas, { x: this.current.point.x, y: this.canvas.height() - this.current.point.y });
	}

	motionShipToPoint = point => {
		let x = this.ship.x;
		if (this.ship.x < point.x)
			this.setIntervalId = setInterval(() => {
				this.ship.setPos({
					x,
					y: this.plotCubicSpline.y(x),
				});
				if (x < point.x)
					x += 1;
				else clearInterval(this.setIntervalId);
			}, 10);
		else
			this.setIntervalId = setInterval(() => {
				this.ship.setPos({
					x,
					y: this.plotCubicSpline.y(x),
				});
				if (point.x < x)
					x -= 1;
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
