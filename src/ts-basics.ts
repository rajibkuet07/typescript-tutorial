/**
 * What is TypeScript or TS?
 *
 * Programming language build up on JS and also an tool.
 * A JS superset. Its a better version of JS.
 * It adds new features and make JS code easier and powerful.
 * Browser can't execute TS. TS also acts like a tool which complies the TS code to JS to run on Browsers.
 * It uses type and as a developer we can find errors earlier.
 * JS is dynamically types and resolved the type during runtime.
 * TS is statically type and shows error during development or compilation.
 * All the features of a type available in JS will work on TS to. For ex: map function of array will work on an array type variable in TS too.
 */
/**
 * ### to compile a TS file we have to run "tsc <filename.ts>".
 * ### this command will create a js file converting the TS code to run on the browser.
 */

/**
 * =======Table Of Content=======
 * ### Basic example - 34
 * ### Example using dom element - 60
 * ### Core types - 84
 * ### Union type - 195
 * ### Type aliases - 227
 * ### Function return types & 'void' - 255
 * ### Function as type -273
 * ### Function Types & Callbacks -284
 * ### Unknown Types - 305
 * ### Never Types - 324
 * =======/table of content======
 */

/**
 * ===== Basic example
 * Let use the following example
 * We have a function which takes two numbers.
 * Adds them and return the integer result.
 *
 * In JS if we pass two string it will concat the strings and will return a string.
 * It will give any runtime error though but it will create many unwanted results.
 * However, using TS we can omit this issue.
 */
console.log('## Basic example');
// Using JS - As its TS file the following will rise error
/* function add(a, b) {
	return a + b;
} */
// console.log('JS Add Number = ', add(5, 10)); // 15
// console.log('JS Add String = ', add('15', '10')); // 1510 - string - which is an unwanted result
// NOTE: However we can omit this by using sanitization, but its hard to maintain all the time.

// Using TS
function addTs(a: number, b: number) {
	return a + b;
}
console.log('TS Add = ', addTs(5, 10)); // 15
// console.log(addTs('5', '10')); // which will show error in the development/compilation

/**
 * ===== Example using dom element
 * Lets see an example using dom element
 */
console.log('## DOM Example');
// Using JS
// var input_one = document.getElementById('firstNumber');
// var input_two = document.getElementById('secondNumber');
// console.log(add(input_one.value, input_two.value));
/**
 * The above code is correct. However on the development/compilation it will show error in TS.
 * But this can be solved by TS code as follows.
 * Using an "!" sign after the query line. It indicates that the element with the ID is must exist in the dom.
 * "as HTMLInputElement" is used to indicate that its an input element which has a value property.
 */
// var button = document.getElementById('addButton'); // Will rise development/compilation error
var button = document.getElementById('addButton')!;
var input_one = document.getElementById('firstNumber')! as HTMLInputElement;
var input_two = document.getElementById('secondNumber')! as HTMLInputElement;

button.addEventListener('click', function () {
	console.log('TS DOM Add = ', addTs(+input_one.value, +input_two.value)); // "+" used to typecast the value to integer/number cause input value is always string.
});

/**
 * ===== Core types
 * 	# 'any' - Any type - This type does not tell TS anything. You can assign any type of value.
 * 					- But it is recommended to avoid any.
 * 					- Can be used as fallback.
 * 					- Skip all checking
 *
 * ### The core primitive types are all lowercase! 'number', 'boolean', 'string'
 * 	# 'number' - all numbers - 1, 5.3, -10
 * 	# 'string' - all text - 'Hi', "Hello", `World`
 * 	# 'boolean' - true or false
 * ###
 *
 * ### Other core types
 * 	# 'object' OR { <key>: <type>; <key>: <type>; ...} -  Object like JS - { roll: 17 }
 * 	# <primitive type>[] - Array like JS - [ 1, 17, 'rajib' ]
 * 	# [<primitive type>, <primitive type>, ...] - Tuple - Fixed length and fixed type array - [ 2, 'Rajib' ]
 * 	# enum <Name> {ADMIN, AUTHOR, SUBSCRIBER} - Enum - One of the list
 */
console.log('## Primitive Core Type');
const coreTypes = (a: number, b: number, print: boolean, phrase: string) => {
	console.log(typeof a);
	console.log(typeof print);
	console.log(typeof phrase);
	const result = a + b;
	print && console.log(`${phrase} = ${result}`); // if true
	print || console.log(`${phrase}`); // if false
};
const number1 = 53.6;
const number2 = 2.5;
coreTypes(number1, number2, true, 'The sum is'); // The sum is = 16.5
coreTypes(15, 1.5, false, 'Do not print!'); // 56.1

// For variable it actually do not need to assign type for const.
// But if you use let/var and do not set any value while defining then its best practice to assign type.
// Its not mandatory!
const numVar = 100; // its already constant and not changeable
let numVarChangeable; // for this you can assign anything you want
numVarChangeable = 5;
numVarChangeable = 'Some text';
// but if you assign a type when defining the variable then its obvious to store the same type data for this variable.
let typedNumVarChangeable: number;
typedNumVarChangeable = 15; // its OK
// typedNumVarChangeable = 'Its not OK'; // it will show development/compile error

console.log('## Object - Core Type');
// 'object' type are written almost like JS object
// without assigning type for person object
const person = {
	name: 'Rajib Dey',
	roll: 17,
};
console.log(person.name); // Its OK
// console.log(person.nickname); // Its not OK

// However if we assign type for the person as object
const personObj: object = {
	name: 'Rajib Dey',
	roll: 17,
};
// console.log(personObj.name); // Its also not OK
// The reason is TS now consider the personObj as the more generic 'object' type.
// And we did not tell anything about the object type
// To solve this issue we 🇨🇦

const personObjSolved: {
	name: string;
	roll: number;
} = {
	name: 'Rajib Dey',
	roll: 17,
};
console.log(personObjSolved.name); // working fine
// now we are telling the object should have a 'name': string property and an 'roll' : number property

console.log('## Array - Core Type');
const hobbies = ['Badminton', 17]; // OK if we do not assign type
let favoriteSports: string[];
// favoriteSports = 'Badminton'; // Not OK
// favoriteSports = ['Badminton', 17]; // Not OK
favoriteSports = ['Badminton', 'Chess']; // OK
console.log(hobbies);
console.log(favoriteSports);

console.log('## Tuple - Core Type');
// Just like array
const role = [2, 'author']; // is just a normal array
role[2] = 'Rajib'; // Ok for array
let roleTuple: [number, string]; // length is 2 and first item is number and second number is string
roleTuple = [10, 'author']; // Its OK
// roleTuple = [10, 'author', 'Rajib']; // Not OK
console.log(roleTuple);

console.log('## Enum - Core Type');
// Suppose we want the role to be one of 'Admin', 'Author, 'Subscriber'
let roleEnum = 'Author';
roleEnum = 'Administrator'; // its possible, but not wanted
// We can solve it by
enum Role {
	ADMIN,
	AUTHOR,
	SUBSCRIBER,
}
// behind the scene ADMIN will be 0, AUTHOR will be 1 and SUBSCRIBER will be 2 if we explicitly do not assign the value.
let roleEnumSolved = Role.AUTHOR;
console.log(roleEnumSolved);
// if we assign any number ot one of the items of the enum, then all the next will increment by one.
// For example if we assign AUTHOR = 5 then SUBSCRIBER will be 6.
// We can also assign specific value for each item and any type of primitive value
// EX: enum Role { ADMIN = 'ADMIN', AUTHOR = 100, SUBSCRIBER = 'Follower' }

/**
 * ===== Union type
 * Union is flexible if we want to use one of the primitive type for any variable.
 * Suppose we want to add and both concat string using same function.
 * Then we can use union type for the params.
 */
console.log('## Union Type');
const unionExample = (a: number | string, b: number | string) => {
	// return a + b; // it will show development/compile error
	if (typeof a === 'number' && typeof b === 'number') {
		return a + b;
	}

	// one of a or b is string so concat that
	return a.toString() + b.toString();
};

console.log('Union add = ', unionExample(15, 10));
console.log('Union concat = ', unionExample('Rajib', 10));

/**
 * ===== Literal type
 * Union type using any literal(a text value) instead of primitive type.
 */
console.log('## Literal Type');
// Union type using any literal(a text value) instead of primitive type.
let literal: 'as-number' | 'as-text';
let literalExample = 'as-number';
if (literalExample === 'as-number') console.log('Literal as number');
literalExample = 'as-text';
if (literalExample === 'as-text') console.log('Literal as text');

/**
 * ===== Type aliases
 * using 'type' keyword
 * you can use any type setup for type aliases
 *
 * Type aliases can be used to create your own types.
 * You're not limited to storing union types though.
 * You can also provide an alias to a (possibly complex) object type.
 */
console.log('## Type Aliases');
type Alias1 = number | string;
type Alias2 = 'as-number' | 'as-text';
let aliasExample: Alias1;
aliasExample = 'Rajib'; // Rajib
console.log(aliasExample);
aliasExample = 17; // 17
console.log(aliasExample);
// type alias of the previously used person object
type User = {
	name: string;
	roll: number;
};
const personObjTypeAlias: User = {
	name: 'Rajib Dey',
	roll: 17,
};
console.log(personObjTypeAlias);

/**
 * ===== Function return types & 'void'
 * function <function name>(<param>:<type>, ...):<return type>
 * and the function must return the <return type> value
 *
 * There is another type called 'void'.
 * This means the function will never return anything
 */
console.log("## Function return types & 'void'");
function functionReturnType(a: number, b: number): number {
	return a + b;
}

const functionReturnTypeVoid = (a: number): void => {
	console.log(`Void return type = ${a}`);
};
functionReturnTypeVoid(999);

/**
 * ===== Function as type
 * It means the type of a variable will be a function
 * (<param>:<type>, ...) => <return type>
 * EX: (a: number, b: number) => number
 */
console.log('## Function as type');
let functionAsType: (a: number, b: number) => number;
functionAsType = addTs;
console.log(functionAsType(8, 17));

/**
 * ===== Function Types & Callbacks
 * It means a function is passed as an argument of another function.
 * <function name> : (<param>:<type>, ...) => <return type>
 * EX: cb: (a: number, b: number) => number
 */
console.log('## Function Types & Callbacks');
const functionAsCallback = (
	a: number,
	b: number,
	cb: (a: number, b: number) => number
) => {
	return cb(a, b);
};
console.log(functionAsCallback(12, 13, addTs));
console.log(
	functionAsCallback(13, 14, (a, b) => {
		return a + b;
	})
);

/**
 * ===== Unknown Types
 * Unknown is bit more restrictive than 'any' type
 * It does not know the type
 * Its better choice over 'any'
 * Extra typechecking may be needed while using 'unknown'
 */
console.log('## Unknown Types');
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Rajib';
console.log(typeof userInput);
// userName = userInput; // Its not OK
if (typeof userInput === 'string') {
	userName = userInput; // its OK
}

/**
 * ===== Never Types
 * This function does not just return 'void'.
 * Actually it returns nothing.
 * More specifically returns never.
 *
 * The following example function do not return void or anything, just crashes/stop the code compiling.
 */
console.log('## Never Types');
function neverType(message: string, code: number): never {
	throw { message, errorCode: code };
}
// neverType('Custom Error', 501); // uncomment to test
