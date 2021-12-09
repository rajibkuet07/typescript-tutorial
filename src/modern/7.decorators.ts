/**
 * What?
 * Useful for Meta programming.
 * Decorators are all about classes.
 * A decorator is just a function you apply to a class in a certain way.
 * The function name starts with capital character. - convention
 * Decorator is used just before the class name with `@` symbol.
 * Decorator needs one or more arguments to be used as a decorator.
 * The number of args will depend where you are using the decorator.
 *
 * Decorator executes when a class is defined.
 */
/**
 * ===== Decorator Basic
 */
console.log('## Decorator Basic');
// for class decorator the argument is only the constructor function
function Logger(target: Function) {
	console.log('Logging...');
	console.log(target);
}

@Logger
class Person {
	name = 'Max';

	constructor() {
		console.log('Creating new person...');
	}
}
console.log('Before instantiating object');
const pers = new Person();
console.log(pers);

/**
 * ===== Decorator Factories
 *
 * We can return an annonymous function from a decorator.
 * And when we use the decorator we have to call is as function. - LoggerFactory()
 * And by this the decorator can take any number of arguments other than the necessary ones
 */
console.log('## Decorator Factories');
function LoggerFactory(text: string) {
	return function (constructor: Function) {
		console.log(text);
		console.log(constructor);
	};
}

@LoggerFactory('Logging - Person Factory')
class PersonFactory {
	name = 'Ann';

	constructor() {
		console.log('Creating new person factory...');
	}
}
const persFac = new PersonFactory();
console.log(persFac);

/**
 * ===== More Useful Decorators
 */
console.log('## More Useful Decorators');
function WithTemplate(template: string, hookId: string) {
	return function (_: Function) {
		// as the variable is not needed so we can use `_` as argument instead of any name
		const hookEl = <HTMLBodyElement>document.getElementById(hookId);
		// const hookEl = document.getElementById(hookId)!;
		hookEl.innerHTML = template;
	};
}

@WithTemplate('<h1>This came from decorator...</h1>', 'app')
class UsefulDecorators {
	name = 'Ann';

	constructor() {
		console.log('Creating new person factory...');
	}
}
const usefullDec = new UsefulDecorators();
console.log(usefullDec);

/**
 * ===== Use Multiple Decorators
 *
 * The bottom decorator will execute first
 * The order is bottom to up ⤴
 */
console.log('## Use Multiple Decorators');

@LoggerFactory('Logging - Person')
@Logger
class MultipleDecorators {
	name = 'Ann';

	constructor() {
		console.log('Creating new person factory...');
	}
}

/**
 * ===== Property Decorators
 *
 * If we use a decorator to a class property then it receives 2 args
 * And the property should be public.
 */
console.log('## Property Decorators');
function Log(target: any, propertyName: string) {
	console.log('Logging Property!');
	console.log(target, propertyName);
}

class Product {
	@Log
	title: string;

	constructor(title: string, private _price: number) {
		this.title = title;
	}

	set price(val: number) {
		if (val > 0) this._price = val;
		else throw new Error('Invalid price!');
	}

	getPriceWithTax(tax: number) {
		return this._price * (1 + tax);
	}
}

/**
 * ===== Accessor, Method & Parameter Decorators
 *
 * Accessor and Method decorator are same and have same argument.
 * The only difference is the descriptors are different.
 * Takes 3 args
 */
console.log('## Accessor, Method & Parameter Decorators');
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log('Logging Accessor!');
	console.log(target);
	console.log(name);
	console.log(descriptor);
}
function Log3(
	target: any,
	name: string | Symbol,
	descriptor: PropertyDescriptor
) {
	console.log('Logging Method!');
	console.log(target);
	console.log(name);
	console.log(descriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
	console.log('Logging Parameter!');
	console.log(target);
	console.log(name);
	console.log(position);
}

class AccessorAndMethod {
	title: string;

	@Log2
	set price(val: number) {
		if (val > 0) this._price = val;
		else throw new Error('Invalid price!');
	}

	constructor(title: string, private _price: number) {
		this.title = title;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}
