import PlotCubicSpline from './PlotCubicSpline';
import Point from './Point';
import Text from './Text';
import Ship from './Ship';
import defaultPoints from './defaultPoints.json';
import defaultText from './defaultText.json';

class Canvas {
	constructor(canvas) {
		this.canvas = canvas;
		defaultPoints.push({ x: -20, y: 20 });
		defaultPoints.push({ x: canvas.width() + 20, y: 400 });
		const plotCubicSpline = new PlotCubicSpline(canvas, defaultPoints, {
			a: Math.min(...defaultPoints.map(point => point.x)),
			b: Math.max(...defaultPoints.map(point => point.x)),
			c: Math.min(...defaultPoints.map(point => point.y)),
			d: Math.max(...defaultPoints.map(point => point.y)),
		});
		plotCubicSpline.draw();

		const textes = defaultText.map((text, index) => new Text(document.getElementById('ship-on-waves'), defaultPoints[index], text));
		this.textes = textes;

		const newPoints = defaultPoints;
		const points = defaultPoints.map((point, index) => new Point(canvas, point, function ({ x, y }) {
			newPoints[index] = { x: x + this.diameter / 2, y: canvas.height() - y - this.diameter / 2 };
			textes[index].setPoint(newPoints[index] || { x: -1000, y: -1000 });
			plotCubicSpline.update(newPoints);
			plotCubicSpline.draw();
		}, (() => {
				// points.filter((point, i) => (this === point));

				// points.map((point, index) => new Point(canvas, point, function ({ x, y }) {
				// 	newPoints[index] = { x: x + this.diameter / 2, y: canvas.height() - y - this.diameter / 2 };
				// 	plotCubicSpline.update(newPoints);
				// 	plotCubicSpline.draw();
				// }));
				// plotCubicSpline.update(newPoints);
				// plotCubicSpline.draw();
			})));

		points.map(point => point.draw());
	}

	edit = () => {
		this.textes.map(text => text.noneDisabled());
	}
	noneEdit = () => {
		this.textes.map(text => text.disabled());
	}
}

export default Canvas;
