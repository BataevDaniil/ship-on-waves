class Point {
	diameter = 24;
	isPress = false;
	constructor(canvas, point, callBackDragAndDrop, callBackRemove) {
		this.callBackDragAndDrop = callBackDragAndDrop;
		this.callBackRemove = callBackRemove;
		this.canvas = canvas;
		this.point = point;
		document.addEventListener('mouseup', this.handlerDocumentMouseUp);
		document.addEventListener('mousemove', this.handlerDocumentMouseMove);
	}

	draw() {
		this.reallyPoint = this.canvas
			.circle(this.diameter)
			.move(
			      this.point.x - this.diameter / 2,
			      this.canvas.height() - this.point.y - this.diameter / 2,
			)
			.fill('#49a2c7')
			.on('mousedown', this.handlerMouseDown)
			.on('dblclick', this.handlerDblClick);
	}

	remove = () => this.reallyPoint.remove();

	handlerDblClick = () => {
		this.callBackRemove();
		this.remove();
	}

	handlerMouseDown = e => {
		this.isPress = true;
		e.target.ownerDocument.defaultView.getSelection().removeAllRanges();
	};

	handlerDocumentMouseUp = () => this.isPress = false;

	handlerDocumentMouseMove = e => {
		if (!this.isPress)
			return;
		const w = this.canvas.width();
		const h = this.canvas.height();
		let x = e.x - this.canvas.node.parentElement.offsetLeft - this.diameter / 2;
		let y = e.y - this.canvas.node.parentElement.offsetTop - this.diameter / 2;

		if (x < this.diameter / 2)
			x = 0;
		else if (x > w - this.diameter / 2)
			x = w - this.diameter;

		if (y < this.diameter / 2)
			y = 0;
		else if (y > h - this.diameter / 2)
			y = h - this.diameter;

		this.point = { x, y };
		this.reallyPoint.move(this.point.x, this.point.y);
		this.callBackDragAndDrop(this.point);
	}
}

export default Point;
