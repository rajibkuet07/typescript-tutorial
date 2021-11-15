/**
 * OOP
 *
 * Classes
 *
 * Class is newly introduced in ES6 and available in modern JS.
 *
 * Everything in JS is object.
 * Class is the template/blueprint of an object.
 * Object is an instance of a class.
 * To learn more just check any tutorial for Object Oriented Programming.
 */

/**
 * ===== Class
 * Using 'class' keyword a class is defined.
 * Class name convention is to start the name with uppercase.
 * Class should have a 'constructor' method (special method).
 * Constructor will execute when the object is created.
 * Class property do not need any `var`, `let` or `const` to define a variable.
 * To use or refer to a property of a class 'this' keyword is used.
 * 'this' indicates the instance currently responsible.
 */
console.log('## Class');
class Department {
	departmentName: string;

	constructor(name: string) {
		this.departmentName = name;
	}

	simpleMethod() {
		console.log(
			`A simple method! The name of department is ${this.departmentName}`
		);
	}

	anotherSimpleMethod = function () {
		console.log('A simple method using anonymous function!');
	};

	arrowMethod = () => {
		console.log('A simple method using arrow function!');
	};

	// using 'this' keyword as argument adds extra security in TS
	useThisArg = function (this: Department) {
		console.log(
			`Using 'this' as argument! The name of department is ${this.departmentName}`
		);
	};
}
const accounting = new Department('Accounting');
console.log(accounting);
accounting.simpleMethod();
accounting.anotherSimpleMethod();
accounting.arrowMethod();
accounting.useThisArg();
let accountingCopy = {
	simpleMethod: accounting.simpleMethod,
	useThisArg: accounting.useThisArg,
};
accountingCopy.simpleMethod(); // will show unwanted result.
// accountingCopy.useThisArg(); // will show development/compilation error because of the 'this' argument in this method.
// however if we define the object similar to the Department object or 'this' then it can be omitted
let anotherAccountingCopy = {
	departmentName: 'Information',
	simpleMethod: accounting.simpleMethod,
	anotherSimpleMethod: accounting.anotherSimpleMethod,
	arrowMethod: accounting.arrowMethod,
	useThisArg: accounting.useThisArg,
};
anotherAccountingCopy.useThisArg();

/**
 * ===== Access Modifiers
 * In JS Class does not have access modifiers like 'private', 'protected', 'public', 'static' etc.
 * 'static' is available in ES6
 * Public is default and not necessary to add.
 */
console.log('## Access Modifiers');
class UserClass {
	private username: string;
	protected age: number;
	department: number;

	constructor(username: string, age: number, department: number) {
		this.username = username;
		this.age = age;
		this.department = department;
	}

	private privateMethod() {
		console.log(
			`This is a private method. Can be accessed from this class property only!`
		);
	}

	public publicMethod(this: UserClass) {
		console.log(`A public method!`);
		console.log(
			`Accessing a private property from a class method! The username is ${this.username}`
		);
		this.privateMethod();
	}
}
const userObject = new UserClass('Rajib Dey', 32, 1);
console.log(userObject.department);
console.log(userObject.publicMethod());
// console.log(userObject.username); // will not work
// console.log(userObject.privateMethod()); // will not work

/**
 * ===== Shorthand Initialization
 * Using access modifiers in the constructor arguments.
 * Then you have to write few codes.
 */
console.log('## Shorthand Initialization');
class ShorthandInitialization {
	constructor(
		private username: string,
		public department: number,
		protected age: number
	) {}

	getData(this: ShorthandInitialization) {
		console.log(
			`Username: ${this.username}, Department: ${this.department}, Age: ${this.age}`
		);
	}
}
const shorthand = new ShorthandInitialization('Rajib Dey', 1, 32);
shorthand.getData();

/**
 * ===== Readonly Modifier
 * Suppose we want a property not to change after initialization.
 * 'readonly' modifiers is used
 */
console.log('## Readonly Modifier');
class ReadonlyExample {
	public someProp: string;
	constructor(private readonly id: number, someProp: string) {
		this.someProp = someProp;
	}
	getId() {
		console.log(`Get ID: ${this.id}`);
	}
}
const readonly = new ReadonlyExample(99, 'Public Prop');
console.log(readonly.someProp);
// console.log(readonly.id); // will not work
readonly.getId();

/**
 * ===== Inheritance
 * One of the pillars of OOP.
 * If we need to add some more features to a specific class then we can extend the base class and create a new class.
 * The newly created class is called sub class and it will have access all the properties of the base class except the private property.
 * private properties of the base class are mot accessible.
 * public and protected properties are accessible from here.
 * `super()` is must to call in the constructor of sub class
 *
 * A sub class can extend only one base class.
 */
console.log('## Inheritance');
class StudentClass extends UserClass {
	constructor(
		name: string,
		age: number,
		department: number,
		private report: string
	) {
		super(name, age, department);
	}

	getProtectedOfParent() {
		console.log(`Accessing protected property of UserClass - ${this.age}`);
	}

	getReport() {
		console.log(`Get the report - ${this.report}`);
	}
}
const student = new StudentClass('Sachin', 44, 2, "Sachin's report");
console.log(student.department); // access public prop of base class
student.getReport();
student.getProtectedOfParent();
// console.log(student.report); // will not work
// console.log(student.age); // will not work

/**
 * ===== Overriding
 * If the sub class need to modify a method of the base class or does not have access of the method then the sub class can override the method in it.
 */
console.log('## Overriding');
class OverrideExample extends ShorthandInitialization {
	constructor(name: string) {
		super(name, 12, 48);
	}
	getData() {
		console.log(`Overriding the method of the base class!`);
	}
}
const override = new OverrideExample('Pointing');
console.log(override.department);
override.getData();

/**
 * ===== Getters & Setters
 * Getter and Setters are used to access protected or private prop using the instance.
 * Getter method is defined using 'get' keyword before the method name.
 * Setter method is defined using 'set' keyword before the method name.
 * Setter method also accept argument or the value of the prop.
 */
console.log('## Getters & Setters');
class GetterSetter {
	private name: string = '';

	constructor(public age: number, protected id: number) {}

	get getName() {
		return this.name;
	}

	set setName(name: string) {
		this.name = name;
	}
}
const getterSetter = new GetterSetter(45, 25);
getterSetter.setName = 'Jhon';
console.log(getterSetter.getName);

/**
 * ===== Static Modifier
 * Static prop and methods are class related properties not instance properties.
 * By adding 'static' keyword before prop or method you can make a prop or method static.
 * A static prop or method can not be called from a non-static method using this keyword.
 * Static prop or method always should be called using <class name>.<method name>
 * But inside a static method we can call other static prop or method using this keyword.
 */
console.log('## Static Modifier');
class StaticExample {
	static someProp: number;
	constructor() {}

	static printSomething() {
		console.log(
			`This is a static method! Some prop value is - ${StaticExample.someProp}`
		);
	}
}
const staticEx = new StaticExample();
// the staticEx instance can not access the printSomething method.
StaticExample.someProp = 32;
StaticExample.printSomething();

/**
 * ===== Abstraction
 * Another pillar of OOP.
 * If we do not know the definition of a method and want it to be derived in the sub class of a base class then we should use abstraction.
 * A class will be abstract class if and only if one or more of the methods are abstract.
 * An 'abstract' keyword is used before the abstract methods and the class also
 * Property also can be abstract.
 */
console.log('## Abstraction');
abstract class AbstractClass {
	constructor() {}

	abstract print(): void;

	abstract returnNumber(number: number): number;

	nonAbstractMethod() {
		console.log('A simple method');
	}
}
class AbstractSubClass extends AbstractClass {
	constructor() {
		super();
	}

	// print in the abstract method of the base class, so we are implementing its here.
	print() {
		console.log(`Implemented the abstract method!`);
	}

	returnNumber(number: number) {
		return number;
	}
}
const abstractEx = new AbstractSubClass();
abstractEx.print();
console.log(abstractEx.returnNumber(44));

/**
 * ===== Singleton & Private Constructors
 * A design pattern which indicates that the class only have one instance all over the project whether multiple instances created or not.
 * Suppose we have a database setup class. We need this class to have only one instance.
 * Multiple instance may cause issues.
 * So in such situation we need Singleton patten.
 */
console.log('## Singleton & Private Constructors');
class Database {
	private static instance: Database;

	private constructor(public host: string, public dbName: string) {}

	static getInstance(hostname: string, dbname: string) {
		if (!this.instance) {
			this.instance = new Database(hostname, dbname);
		}
		return this.instance;
	}
}
// const database = new Database('127.0.0.1', 'test_db'); // it will not work
const databaseOne = Database.getInstance('127.0.0.1', 'test_db');
const databaseTwo = Database.getInstance('localhost', 'test_db');
console.log(databaseOne, databaseTwo); // Both are same object
