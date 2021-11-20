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
