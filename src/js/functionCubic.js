export default function functionCubic(a, b, c, d, x0) {
	return x =>
		a * (x - x0) ** 3 + b * (x - x0) ** 2 + c * (x - x0) + d;
}
