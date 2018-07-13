// @flow

import { clone } from 'ramda';

type Scope = {
	a: number,
	b: number,
	c: number,
	d: number
}

type ReallyScope = Scope | {width: number, height: number}

class PlotBase {
	reallyScope: ReallyScope;
	mathScope: Scope;

	constructor(mathScope: Scope, reallyScope: ?ReallyScope) {
		if (!mathScope)
			throw Error('empty math scope');
		this.mathScope = this.mathScope;
		this.setReallyScope(reallyScope);
	}

	setReallyScope(reallyScope: ?ReallyScope) {
		if (!reallyScope)
			return this.reallyScope = clone(this.mathScope);
		if (reallyScope.width && reallyScope.height)
			return this.reallyScope = {
				a: 0,
				b: reallyScope.width,
				c: 0,
				d: reallyScope.height,
			};
		// else if (reallyScope.a && reallyScope.b && reallyScope.c && reallyScope.d)
		this.reallyScope = reallyScope;
	}

	mathMapReallyX = (x: number) => (
		(x - this.mathScope.a)
		/
		(this.mathScope.b - this.mathScope.a)
		*
		(this.reallyScope.b - this.reallyScope.a)
		+
		this.reallyScope.a
	)

	reallyMapMathX = (x: number) => (
		(x - this.reallyScope.a)
		/
		(this.reallyScope.b - this.reallyScope.a)
		*
		(this.mathScope.b - this.mathScope.a)
		+
		this.mathScope.a
	)

	mathMapReallyY = (y: number) => (
		(y - this.mathScope.c)
		/
		(this.mathScope.d - this.mathScope.c)
		*
		(this.reallyScope.d - this.reallyScope.c)
		+
		this.reallyScope.c
	)

	reallyMapMathY = (y: number) => (
		(y - this.reallyScope.c)
		/
		(this.reallyScope.d - this.reallyScope.c)
		*
		(this.mathScope.d - this.mathScope.c)
		+
		this.mathScope.c
	)
}

export default PlotBase;
