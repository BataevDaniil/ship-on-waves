import { sort } from 'ramda';
import functionCubic from './functionCubic';

class CubicSpline {
	fCubices = []

	constructor(points) {
		this.update(points);
	}

	update(points) {
		this.points = sort((a, b) => a.x > b.x, points);
		this.searchCoefficent();
	}

	y(x) {
		for (let i = 0; i < this.points.length - 1; i++)
			if (this.points[i].x <= x && x <= this.points[i + 1].x)
				return this.fCubices[i](x);
		return null;
	}

	searchCoefficent() {
		const df = [];
		if (this.points.length > 1) {
			{
				const deltaY = this.points[1].y - this.points[0].y;
				const deltaX = this.points[1].x - this.points[0].x;

				df[0] = deltaY / deltaX || 10e5;
			}
			{
				const deltaX = this.points[this.points.length - 1].x
							   -
							   this.points[this.points.length - 2].x;
				const deltaY = this.points[this.points.length - 1].y
							   -
							   this.points[this.points.length - 2].y;

				df[this.points.length - 1] = deltaY / deltaX;
			}
		}

		for (let i = 1; i < this.points.length - 1; i++) {
			const f0 = this.points[i - 1].y;
			const f1 = this.points[i].y;
			const f2 = this.points[i + 1].y;

			if ((f0 > f1 && f1 < f2) || (f0 < f1 && f1 > f2)) {
				df[i] = 0;
			} else {
				const deltaX = this.points[i + 1].x - this.points[i - 1].x;
				const deltaY = f2 - f0;

				df[i] = deltaY / deltaX;
			}
		}

		for (let i = 0; i < this.points.length - 1; i++) {
			const h = this.points[i + 1].x - this.points[i].x;

			const f = this.points[i].y;
			const f1 = this.points[i + 1].y;

			const df0 = df[i];
			const df1 = df[i + 1];

			const a1 = h ** 3;
			const a2 = h ** 2;
			const a3 = 3 * a2;
			const a4 = 2 * h;
			const b1 = f1 - df0 * h - f;
			const b2 = df1 - df0;

			const bi = (b2 * a1 - b1 * a3) / (a4 * a1 - a3 * a2);
			const ai = (b1 - a2 * bi) / a1;
			const ci = df0;
			const di = this.points[i].y;
			const xi = this.points[i].x;

			this.fCubices[i] = functionCubic(ai, bi, ci, di, xi);
		}
	}
}

export default CubicSpline;
