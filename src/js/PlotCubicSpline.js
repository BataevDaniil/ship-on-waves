import PlotBase from './PlotBase';
import CubicSpline from './CubicSpline';

class PlotCubicSpline extends PlotBase {
	constructor(canvas, points, scope) {
		super({}, scope);
		this.canvas = canvas;
		this.points = points;
		this.setMathScope();
		this.spline = new CubicSpline(points);
	}

	draw() {
		const points = [];
		for (let x = this.reallyScope.a; x < this.reallyScope.b - this.reallyScope.a; x++)
			points.push([x, this.y(x)]);
		this.polyline = this.canvas.polyline(points).stroke({ width: 10 }).fill('none');
		console.log(this);
	}

	y = x =>
		 this.canvas.height() - this.mathMapReallyY(this.spline.y(this.reallyMapMathX(x)));

	setMathScope() {
		this.mathScope = {
			a: Math.min(...this.points.map(point => point.x)),
			b: Math.max(...this.points.map(point => point.x)),
			c: Math.min(...this.points.map(point => point.y)),
			d: Math.max(...this.points.map(point => point.y)),
		};
	}

	update(points) {
		this.polyline.remove();
		this.points = points;
		this.spline.update(points);
		this.setMathScope();
		this.setReallyScope(this.mathScope);
	}
}

export default PlotCubicSpline;
