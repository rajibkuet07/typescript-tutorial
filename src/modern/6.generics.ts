/**
 * What?
 * Generics offer a way to create reusable components.
 * Generics provide a way to make components work with any data type and not restrict to one data type.
 * So, components can be called or used with a variety of data types.
 */
/**
 * ===== Generic Basic Example
 */
console.log('## Generic Basic Example');
const simpleBeforeGeneric = (
	initial: string
): [() => string, (v: string) => void] => {
	let str: string = initial;
	return [
		() => str,
		(v: string) => {
			str = v;
		},
	];
};
const [getter1, setter1] = simpleBeforeGeneric('Rajib');
// const [getter100, setter100] = simpleBeforeGeneric(12); // will not work
console.log(getter1());
setter1('Dey');
console.log(getter1());
// 📓 In the above example we can not use any other types rather than string as initial value
// 📓 To increase the reusability of the above function we can add a dynamic type or generic
const simpleAfterGeneric = <Custom>(
	initial: Custom
): [() => Custom, (v: Custom) => void] => {
	let str: Custom = initial;
	return [
		() => str,
		(v: Custom) => {
			str = v;
		},
	];
};
// 📓 here "Custom" is generic type
// 📓 and we can pass any type of data  as initial value
const [getter2, setter2] = simpleAfterGeneric<string>('Rajib');
// const [getter101, setter101] = simpleAfterGeneric<string>(12); // will not work
const [getter102, setter102] = simpleAfterGeneric<string | number>(12); // will work
console.log(getter2());
setter2('Dey');
console.log(getter2());
console.log(getter102());
setter102(36);
console.log(getter102());

/**
 * ===== Built in Generics of TS
 *	# 'Array' - Array<T> T = core types | any custom types | any advance types etc
 *	# 'Promise'
 */
console.log('## Built in Generics of TS');
console.log('## Array - Built in Generics');
const names = ['Max', 'Jhon']; // type is string[]
const anyArray = []; // type is any[]
const arrayString: Array<string> = ['Max', 'Jhon']; // Array<string> denotes that its an array of string
const arrayInt: Array<number> = [12, 31, 44, 55488]; // Array<number> denotes that its an array of integers
// arrayString[0] = 12; // will not work
// arrayInt[0] = 'Robin'; // will not work
const arrayUnion: Array<number | string | null> = [null, 'Doe', 12, 25, 55];

console.log('## Promise - Built in Generics');
const promise: Promise<string> = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('This promise is resolved!');
	}, 2000);
});

promise.then(data => {
	console.log('## Output of Promise - Built in Generics');
	console.log(data.split(' ')); // we can use split cause the type of the promise is <string>
});

const promiseNumber: Promise<number> = new Promise((resolve, reject) => {
	setTimeout(() => {
		// resolve('This promise is resolved!'); // will not work
	});
});

promiseNumber.then(data => {
	// console.log(data.split(' ')); // will not work cause the type of the promise is <number>
});

/**
 * ===== Creating Generic Function
 */
console.log('## Creating Generic Function');
// We can consider the above simpleAfterGeneric function of '## Generic Basic Example'
const genericFunction = <T, U>(obj1: T, obj2: U) => {
	return Object.assign(obj1, obj2);
};
console.log(
	genericFunction({ name: 'Rajib' }, { occupation: 'Software Engineer' })
);
console.log(genericFunction({ name: 'Rajib' }, 30));
// console.log(genericFunction<string, number>({ name: 'Rajib' }, 30)); // will not work
console.log(genericFunction<string, number>('Rajib', 30)); // will work

/**
 * ===== Working with constraints
 */
console.log('## Working with constraints');
const genericConstraints = <T, U extends object>(obj1: T, obj2: U) => {
	return Object.assign(obj1, obj2);
};
console.log(
	genericConstraints({ name: 'Rajib' }, { occupation: 'Software Engineer' })
);
// console.log(genericConstraints({ name: 'Rajib' }, 30)); // will not work
// console.log(genericFunction<string, number>({ name: 'Rajib' }, 30)); // will not work
// console.log(genericConstraints<string, number>('Rajib', 30)); // will not work, no need to use <string, number> cause we already fixed U as object

/**
 * ===== Another Generic Function
 */
console.log('## Another Generic Function');
interface Lengthy {
	length: number;
}
function countAndDescribe<G extends Lengthy>(element: G) {
	let description = 'Got no value.';
	if (element.length === 1) description = 'Got 1 element.';
	if (element.length > 1) description = `Got ${element.length} element.`;
	return [element, description];
}
console.log(countAndDescribe('Hi there!')); // string has length
console.log(countAndDescribe([1, 2, 3])); // array has length
// console.log(countAndDescribe(30)); // will not work, number has length

/**
 * ===== keyof in Generics
 */
console.log('## "keyof" Constraints in Generics');
function keyofConstraints<X extends object, K extends keyof X>(obj: X, key: K) {
	return obj[key];
}
console.log(keyofConstraints({ name: 'Rajib' }, 'name'));
// console.log(keyofConstraints({ name: 'Rajib' }, 'age')); // will not work, age is not keyof the object

/**
 * ===== Generic Classes
 */
console.log('## Generic Classes');
class StorageGenericClass<GT extends string | number | boolean> {
	private data: GT[] = [];

	addItem(item: GT) {
		this.data.push(item);
	}

	removeItem(item: GT) {
		if (this.data.indexOf(item) === -1) {
			return;
		}
		this.data.splice(this.data.indexOf(item), 1);
	}

	getItems() {
		return [...this.data];
	}
}

const textStorage = new StorageGenericClass<string>();
textStorage.addItem('Max');
textStorage.addItem('Jhon');
console.log(textStorage.getItems());

const numberStorage = new StorageGenericClass<number>();
numberStorage.addItem(12);
numberStorage.addItem(25);
console.log(numberStorage.getItems());
numberStorage.removeItem(12);
console.log(numberStorage.getItems());

/**
 * ===== Generic Utility Types
 */
console.log('## Generic Utility Types');
// Partial
// Readonly
const readonlynames: Readonly<string[]> = ['Max', 'Ann'];
// readonlynames.push('Jhon'); // will not work
