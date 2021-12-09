/**
 * ===== Intersection Type
 * Intersection is the combination of two or more thing.
 * If a type/interface has all the properties of two or more type/interface then intersection is used.
 * Using '&' operator between two or more type intersection is done.
 * Extending the two or more interfaces intersection is done.
 */
console.log('## Intersection Type');
// using types
type Admin = {
	name: string;
	privileges: string[];
};
type Employee = {
	name: string;
	startDate: Date;
};
type ElevatedEmployee = Admin & Employee;

// an object should have all of the 'name', 'privileges' and 'startDate' to be of type 'ElevatedEmployee'
const empOne: ElevatedEmployee = {
	name: 'Jhon',
	privileges: ['create-employee', 'edit-posts'],
	startDate: new Date(),
};

// using interfaces
interface AdminInterface {
	name: string;
	privileges: string[];
}
interface EmployeeInterface {
	name: string;
	startDate: Date;
}
interface ElevatedEmployeeInterface extends AdminInterface, EmployeeInterface {}
// an object should have all of the 'name', 'privileges' and 'startDate' to be of type 'ElevatedEmployeeInterface'
const empTeo: ElevatedEmployeeInterface = {
	name: 'Jhon',
	privileges: ['create-employee', 'edit-posts'],
	startDate: new Date(),
};

/**
 * ===== Type Guards
 * Rechecking if the properties are exist or not in some cases.
 * Can be done by -
 * 		for others - `typeof`
 * 		for objects - `in` or `instanceof`
 */
console.log('## Type Guards');
type Combinable = string | number; // union type
type Numeric = number | boolean; // union type

type Universal = Combinable & Numeric;

const addTypeGuard = (a: Combinable, b: Combinable) => {
	// return a + b; // only this will not work
	// cause `a` and `b` can be either string or number
	// so without any check the add is not possible
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
};

type UnknownEmployee = Admin | Employee; // union type
function printEmployeeInfo(emp: UnknownEmployee) {
	console.log(`Name is ${emp.name}`);
	// console.log(emp.privileges); // not possible
	// cause emp is either Admin or Employee.
	// So, it may or may not have 'privileges' property
	// if (emp.privileges) { } // its also not work for same reason
	if ('privileges' in emp) {
		// will work
		console.log('Privileges are - ', emp.privileges);
	}
}
printEmployeeInfo({ name: 'Jhon', privileges: ['create-user'] });

/* However for classes the Type Guard is little different */
class Car {
	drive() {
		console.log('Driving a car....');
	}
}
class Truck {
	drive() {
		console.log('Driving a truck....');
	}
	loadCargo() {
		console.log('A method of truck...');
	}
}
type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
	vehicle.drive();
	// vehicle.loadCargo(); // will not work
	// cause vehicle can be either car or truck
	// if (vehicle.loadCargo){} // will not work
	if ('loadCargo' in vehicle) {
		vehicle.loadCargo(); // will work
	}
	// another way is using instance of a class
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(); // will work too
	}
};

/**
 * ===== Discriminated Unions
 * Special type of type guard
 * Available in object types
 * Its a pattern which can be used when you are working with union type it makes implementing type guards easier.
 */
console.log('## Discriminated Unions');
interface Bird {
	type: 'bird'; // literal type
	flyingSpeed: number;
}
interface Horse {
	type: 'horse'; // literal type
	runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	// we can use
	// if ('flyingSpeed' in animal)
	// but sometime we can make any mistake to write the property
	// we can add a new prop for each interface to narrow down the type guard
	let speed;
	switch (animal.type) {
		case 'bird':
			speed = animal.flyingSpeed;
			break;
		case 'horse':
			speed = animal.runningSpeed;
	}
	console.log(`Moving speed of ${animal.type} is ${speed}`);
}
// moveAnimal({ type: 'bird', runningSpeed: 30 }); // will not work
// moveAnimal({ type: 'horse', flyingSpeed: 30 }); // will not work
moveAnimal({ type: 'bird', flyingSpeed: 30 });
moveAnimal({ type: 'horse', runningSpeed: 90 });

/**
 * ===== Type Casting
 * This can be explained using the DOM element we explained in the basic DOM example.
 * TS does not know about the type of the DOM element if we do not specify the type of the element.
 * So, for example whenever we want to use an input element value in the TS file if we do not specify ht element type then it will show error during compilation or development.
 * To specify the element type is called typecasting.
 * Its not only for DOM element only by the way!
 *
 * There are two way to specify the type.
 * 		One - using angle bracket before the thing like `<HTMLInputElement>document.getElementById('firstNumber')!`
 * 		Two - using element name and `as` keyword before it after the thing like `document.getElementById('secondNumber')! as HTMLInputElement`
 */
/* SEE ts-basics.ts line - 63 */
console.log('## Type Casting');
var button = document.getElementById('addButtonTypeCasting')!;
var input_one = <HTMLInputElement>(
	document.getElementById('firstNumberTypeCasting')!
);
var input_two = document.getElementById(
	'secondNumberTypeCasting'
)! as HTMLInputElement;

button.addEventListener('click', function () {
	console.log(
		'TS DOM Add Type Casting = ',
		addTs(+input_one.value, +input_two.value)
	); // "+" used to typecast the value to integer/number cause input value is always string.
});

/**
 * ===== Index Properties
 * If we do not know the props/keys name or the number of prop/keys of the object but just know the dynamic prop type and prop value type then index properties is used.
 * Suppose, we have a From in the front end and we can have error for some of the fields.
 * So if we do not want to keep all the keys/items which do not have the error then we can use index properties type.
 * This type of object could have some other properties but should be of same type of index properties type.
 */
console.log('## Index Properties');
interface ErrorContainer {
	// id: string; // will work, and must be added to create this object.
	// id: number; // will not work cause [prop:string] is of type string
	[prop: string]: string; // by this we indicate that the key must be a string and the value must be a string too.
}

const errors: ErrorContainer = {
	username: 'The username is not valid!',
	email: 'The email is not valid!',
};
console.log(errors);

const noErrors: ErrorContainer = {};
console.log(noErrors);

/**
 * ===== Function Overloads
 * Multiple definition of a function with different signature more specifically different numbers of parameters.
 */
console.log('## Function Overloads');
type CombinableOverload = string | number;
type NumericOverload = boolean | number;

type UniversalOverload = CombinableOverload & NumericOverload;

function addOverload(a: number, b: number): number;
function addOverload(a: string, b: string): string;
function addOverload(a: string, b: number): string;
function addOverload(a: CombinableOverload, b: CombinableOverload) {
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
}
console.log(addOverload('Max', 'Milan'));
console.log(addOverload('Max', 7));
// console.log(addOverload(7, 'Max')); // will not work
console.log(addOverload(6, 7));

/**
 * ===== Optional Chaining
 * Suppose you do not know the prop of an object return from any backend like DB, API etc.
 * So how to check if the prop is exist?
 * Simple way is operation chaining.
 */
console.log('## Optional Chaining');
const fetchedObject = {
	id: 999,
	name: 'Max',
	address: {
		home: 21,
		street: 32,
		postcode: 3020,
	},
};
// so if fetchedObject.address does not exist then using fetchedObject.address in code will show error.
// but we can use optional chaining like -
console.log(fetchedObject?.address?.home);

/**
 * ===== Nullish Coalescing
 * TO check if a value is null or undefined then use default.
 * Not using the falsy value like <value> || <otherValue>
 */
console.log('## Nullish Coalescing');
let user: any = '';
console.log(user ?? 'Max'); // output: ''
user = null;
console.log(user ?? 'Max'); // output: Max
