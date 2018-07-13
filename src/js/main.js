import SVG from 'svg.js';
import PlotCubicSpline from './PlotCubicSpline';
import Point from './Point';
import defaultPoints from './defaultPoints';

const width = 500,
	  height = 500;
const canvas = SVG('ship-on-waves').size(width, height);

const plotCubicSpline = new PlotCubicSpline(canvas, defaultPoints, {
	width: Math.max(...defaultPoints.map(point => point.x)),
	height: Math.max(...defaultPoints.map(point => point.y)),
});
plotCubicSpline.draw();

const newPoints = defaultPoints;
const points = defaultPoints.map((point, index) => new Point(canvas, point, function ({ x, y }) {
	newPoints[index] = { x: x + this.diameter / 2, y: canvas.height() - y - this.diameter / 2 };
	plotCubicSpline.update(newPoints);
	plotCubicSpline.draw();
}));

points.map(point => point.draw());
