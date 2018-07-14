class Text {
	constructor(insert, point, text) {
		this.point = point;
		this.insert = insert;
		this.element = document.createElement('div');
		this.element.setAttribute('class', 'text');
		this.element.innerText = text;
		this.element.addEventListener('mousemove', this.handlerMouseDown);
		this.insert.appendChild(this.element);

		this.element.style = `
			left: ${point.x - this.element.offsetWidth / 2}px;
			bottom: ${point.y - this.element.offsetHeight - 9 - 12}px;
		`;
		console.log();
	}

	setPoint(value) {
		this.point = value;
		this.element.style = `
			left: ${this.point.x - this.element.offsetWidth / 2}px;
			bottom: ${this.point.y - this.element.offsetHeight - 9 - 12}px;
		`;
	}

	handlerMouseDown = e => {
		e.target.ownerDocument.defaultView.getSelection().removeAllRanges();
	};
}

export default Text;
