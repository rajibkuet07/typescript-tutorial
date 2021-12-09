/**
 * OOP
 *
 * Interfaces
 *
 * Interface is not available in JS.
 * Interface describes the structure of an object.
 * Its just a custom type.
 * No default value can be assigned to the properties of interface.
 * The methods also should not be derived/implemented in the interface. But the structure should be described.
 */

console.log('## Class');
interface Person {
	name: string;
	age: number;

	greet(phrase: string): void;
}

let personOne: Person;
// userOne = 'Max'; // its not possible
personOne = {
	name: 'Warner',
	age: 48,
	greet(phrase: string) {
		console.log(phrase);
	},
};

/**
 * QUESTION
 *
 * So, why Interface instead of Custom Type?
 *
 * Interface can only be used to describe the structure of an object.
 * Whereas Type can also be used for other types such as primitives, unions, and tuples.
 * Interface is clear that fully describes an object.
 * An interface can implement class.
 * Which means an interface can be used as the contract of a class.
 * Interface shares the structure of the object only not the implementation of its properties and methods.
 *
 * A class can implements more than one interface using coma separation.
 * class <class name> implements <interface 1>, <interface 2>
 * Class can extends base class and interface at the same time.
 *
 * All the access modifiers of the interface should be kept same in the derived class.
 *
 * The Abstract class and Interface may be considered as similar. but the difference is the abstract class has a mixer of implementation details, but the interface only have structure and no implementation.
 *
 * An interface also can extend another interface using 'extends' keyword like classes.
 */
class Teacher implements Person {
	private designation: string = 'Dhaka';
	constructor(public name: string, public age: number) {}

	greet(phrase: string) {
		console.log(`${phrase} ${this.name}. Designation in ${this.designation}`);
	}
}
const teacher = new Teacher('Rajib', 32);
teacher.greet('The teacher name is');

/**
 * QUESTION
 *
 * Why Interface?
 *
 * Suppose we need to create an object which has to have the greet method of the Person interface.
 * So, if we set the type of the object is Person, then whatever we use to construct the object, the object must have the greet method.
 */
let teacherOne: Person;
teacherOne = {
	name: 'Jhon',
	age: 45,
	greet(phrase) {
		console.log(phrase);
	},
};
// OR
teacherOne = new Teacher('Jhon', 45);
// teacherOne = { name: 'Jhon', age: 32 }; // it will not work

/**
 * ===== Readonly Interface
 * readonly modifier can be used for the properties of an interface.
 * This property can only be initialized once when the object is created.
 * Can not be changed after that.
 */
console.log('## Readonly Interface');
interface ReadOnlyInterface {
	readonly name: string;
}
let readonlyEx: ReadOnlyInterface;
readonlyEx = { name: 'Rajib' };
// readonlyEx.name = 'Jhon'; // it will not work

/**
 * ===== Interface Inheritance
 * readonly modifier can be used for the properties of an interface.
 * This property can only be initialized once when the object is created.
 * Can not be changed after that.
 */
console.log('## Interface Inheritance');
interface Named {
	name: string;
}
interface GreetAble extends Named {
	greet(): void;
}

class PersonGreetAble implements GreetAble {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
	getName() {
		console.log(`A simple method!`);
	}
	greet() {
		console.log(`The name is ${this.name}`);
	}
}
const personGreet = new PersonGreetAble('Jhon');
personGreet.greet();

/**
 * ===== Interface as Function Type
 */
console.log('## Interface as Function Type');
// Using type for function definition
type AddFn = (a: number, b: number) => number;
let add: AddFn;
add = (a: number, b: number) => a + b;
console.log(add(5, 5));
// Using interface for function definition
interface AddFnInterface {
	(a: number, b: number): number;
}
let addFn: AddFnInterface;
addFn = (a: number, b: number) => a + b;
console.log(addFn(20, 45));

/**
 * ===== Optional Parameters & Properties
 *
 * If a property is not mandatory then optional pop is used.
 * In interface when properties are added then a '?' is used to denote that the prop is optional.
 * However, property in a class also can be optional
 * The optional props are strongly related with interface and in classes
 */
console.log('## Optional Parameters & Properties');
interface Optional {
	name: string;
	nickName?: string;
	favorite?: string;
}
class OptionalClass implements Optional {
	name: string;
	age?: number; // optional in the class
	// If we do not use school in this class, then will not create any issue
	nickName?: string; // optional in the interface, its not mandatory to assign value to it.

	// `nickname: string = ''` is default parameter value
	// it also can be written as `nickname?: string`
	constructor(n: string, nickname: string = '') {
		this.name = n;

		// if we pass a value for the nickname then assign this optional prop
		if (nickname) this.nickName = nickname;
	}
}
