class Text {
	constructor(insert, point, text, isDisabled = true) {
		this.point = point;
		this.insert = insert;
		this.element = document.createElement('input');
		this.noneActive();
		if (isDisabled)
			this.disabled();
		else this.noneDisabled();
		this.element.value = text;
		this.insert.appendChild(this.element);

		this.element.style = `
			left: ${point.x - this.element.offsetWidth / 2}px;
			bottom: ${point.y - this.element.offsetHeight - 9 - 12}px;
		`;
		this.element.addEventListener('mousemove', this.handlerMouseDown);
	}

	active = () =>
		this.element.setAttribute('class', 'text text-active');
	noneActive = () =>
		this.element.setAttribute('class', 'text');

	disabled = () =>
		this.element.setAttribute('disabled', '');

	noneDisabled = () =>
		this.element.removeAttribute('disabled', '');

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
