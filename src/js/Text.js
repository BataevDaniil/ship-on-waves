class Text {
	constructor(insert, point, text, isDisabled = true) {
		this.point = point;
		this.insert = insert;
		this.element = document.createElement('input');
		this.wrapper = document.createElement('div');
		this.wrapper.setAttribute('class', 'wrapper');
		this.noneActive();
		this.element.value = text;
		this.wrapper.appendChild(this.element);
		this.wrapperForEvent = document.createElement('div');
		this.wrapper.appendChild(this.wrapperForEvent);
		this.insert.appendChild(this.wrapper);

		if (isDisabled)
			this.disabled();
		else this.noneDisabled();

		this.wrapperForEvent.style = `
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		`;
		// this.element.style = `
		this.wrapper.style = `
			display: inline-block;
			left: ${point.x - this.element.offsetWidth / 2}px;
			bottom: ${point.y - this.element.offsetHeight - 9 - 12}px;
		`;
		this.element.addEventListener('mousemove', this.handlerMouseDown);
	}

	get value() {
		return this.element.value;
	}

	active = () =>
		this.element.setAttribute('class', 'text text-active');
	noneActive = () =>
		this.element.setAttribute('class', 'text');

	disabled = () => {
		this.element.setAttribute('disabled', '');
		this.wrapperForEvent.style.display = 'block';
	}
	noneDisabled = () => {
		this.element.removeAttribute('disabled', '');
		this.wrapperForEvent.style.display = 'none';
	}

	setPoint(value) {
		this.point = value;
		this.wrapper.style = `
			left: ${this.point.x - this.element.offsetWidth / 2}px;
			bottom: ${this.point.y - this.element.offsetHeight - 9 - 12}px;
		`;
	}

	handlerMouseDown = e => {
		e.target.ownerDocument.defaultView.getSelection().removeAllRanges();
	};
}

export default Text;
