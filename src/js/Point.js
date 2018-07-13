class Point {
	diameter = 50;
	isPress = false;
	constructor(canvas, point, callBackDragAndDrop) {
		this.callBackDragAndDrop = callBackDragAndDrop;
		this.canvas = canvas;
		this.point = point;
		document.addEventListener('mouseup', this.handlerDocumentMouseUp);
		document.addEventListener('mousemove', this.handlerDocumentMouseMove);
	}

	draw() {
		this.reallyPoint = this.canvas.circle(this.diameter)
			.move(
			      this.point.x - this.diameter / 2,
			      this.canvas.height() - this.point.y - this.diameter / 2,
			)
			.fill('red')
			.on('mousedown', this.handlerClick);
	}

	handlerClick = () => this.isPress = true;

	handlerDocumentMouseUp = () => this.isPress = false;

	handlerDocumentMouseMove = e => {
		if (!this.isPress)
			return;
		this.point = {
			x: e.x - this.canvas.node.parentElement.offsetLeft - this.diameter / 2,
			y: e.y - this.canvas.node.parentElement.offsetTop - this.diameter / 2,
		};
		this.reallyPoint.move(this.point.x, this.point.y);
		this.callBackDragAndDrop(this.point);
	}
}

export default Point;
