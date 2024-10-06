1. Single Responsibility Principle
// Definition: A class should have only one reason to change, meaning it should only have one job.

//Before (Violates SRP):
class UserService {
    constructor(name) {
        this.name = name;
    }

    save() {
        
    }

    sendEmail() {
        
    }
}


const userService = new UserService('John Doe');
userService.save();
userService.sendEmail();



// After
class User {
    constructor(name) {
        this.name = name;
    }
}

class UserRepository {
    save(user) {
        
    }
}

class UserNotification {
    sendEmail(user) {
        
    }
}

const user = new User('John Doe');
const userRepo = new UserRepository();
const userNotification = new UserNotification();

userRepo.save(user);
userNotification.sendEmail(user);



2. Open/Closed Principle
// Definition: Software entities should be open for extension but closed for modification.

//Before (Violates OCP):

class Shape {
    area(type, dimensions) {
        if (type === 'circle') {
            return Math.PI * dimensions.radius * dimensions.radius;
        } else if (type === 'rectangle') {
            return dimensions.width * dimensions.height;
        }
    }
}

const shape = new Shape();
console.log(shape.area('circle', { radius: 5 })); // Area of circle
console.log(shape.area('rectangle', { width: 4, height: 6 })); // Area of rectangle


// After
class Shape {
    area() {
        throw new Error("This method should be overridden!");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

function calculateArea(shapes) {
    return shapes.map(shape => shape.area());
}


const shapes = [new Circle(5), new Rectangle(4, 6)];
console.log(calculateArea(shapes));



3. Liskov’s Substitution Principle
// Definition: Subtypes must be substitutable for their base types without altering the correctness of the program.

// Before (LSP Violates):
class Bird {
    fly() {
        console.log("I can fly!");
    }
}

class Penguin extends Bird {
    fly() {
        throw new Error("Penguins can't fly!");
    }
}

function letBirdFly(bird) {
    bird.fly();
}

let letPenguinFly = new Penguin();
// letBirdFly(letPenguinFly); // Throws error: Penguins can't fly!



//AFter 
class Bird {
    fly() {
        console.log("I can fly!");
    }
}

class Sparrow extends Bird {}

class Ostrich extends Bird {
    fly() {
        throw new Error("Ostriches can't fly!");
    }
}

function letBirdFly(bird) {
    bird.fly();
}


let letSparrowFly = new Sparrow();
letBirdFly(letSparrowFly); // Works fine

// let letOstrichFly = new Ostrich();
// letBirdFly(letOstrichFly); // Throws error: Ostriches can't fly!




4. Interface Segregation Principle
// Definition: No client should be forced to depend on methods it does not use. Instead of one fat interface, many small interfaces are preferred.

// Before (Violates ISP):
class Worker {
    work() {
        // working implementation
    }

    eat() {
        // eating implementation
    }
}

class Robot extends Worker {
    eat() {
        throw new Error("Robots don't eat");
    }
}

Explanation: The Robot class is forced to implement the eat method even though it doesn’t need it.

// After
class Workable {
    work() {
        // working implementation
    }
}

class Eatable {
    eat() {
        // eating implementation
    }
}

class Human extends Workable {
    eat() {
        // eating implementation
    }
}

class Robot extends Workable {
    // No eat method needed
}

// Explanation: Now, Human implements both Workable and Eatable, while Robot only implements Workable, adhering to the Interface Segregation Principle.




5. Dependency Inversion Principle
Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces). Abstractions should not depend on details. Details should depend on abstractions.

// Before (Violates DIP):
class Database {
    connect() {
        //logic
    }
}

class UserService {
    constructor() {
        this.db = new Database(); 
    }
}

//Explanation: The UserService class is tightly coupled with the Database class. If we want to switch to a different database, we need to modify UserService.


// After
class Database {
    connect() {
        // logic
    }
}

class UserService {
    constructor(database) {
        this.db = database; // depends on abstraction
    }
}

const db = new Database();
const userService = new UserService(db);

// Explanation: Now, UserService depends on the database abstraction, allowing for easier changes to the database implementation without modifying UserService.

