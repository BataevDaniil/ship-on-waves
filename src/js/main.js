import SVG from 'svg.js';
import Canvas from './Canvas';

const width = 1300,
	  height = 500;
const canvas = SVG('ship-on-waves').size(width, height);
const mainCanvas = new Canvas(canvas);

const btn = document.getElementsByClassName('btn-edit')[0];
btn.addEventListener('click', function EditToggle() {
	if (this.classList.toggle('active'))
		mainCanvas.edit();
	else mainCanvas.noneEdit();
});
