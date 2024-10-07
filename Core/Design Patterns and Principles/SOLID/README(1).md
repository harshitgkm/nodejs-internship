The SOLID principles are essential guidelines in object-oriented programming aimed at improving the design, maintainability, and scalability of software systems. Here's a detailed explanation of each principle with JavaScript examples and real-life analogies.

### 1. **Single Responsibility Principle (SRP)**

**Definition**: A class or module should have one, and only one, reason to change. This means it should have only one job or responsibility.

#### JavaScript Example:
Bad Example (violates SRP):
```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getUserDetails() {
    return `${this.name} (${this.email})`;
  }

  saveToDatabase() {
    // code to save user to database
    console.log("Saving user to the database");
  }
}
```
Here, the `User` class handles both user data and database operations.

Good Example (follows SRP):
```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getUserDetails() {
    return `${this.name} (${this.email})`;
  }
}

class UserRepository {
  save(user) {
    // code to save user to the database
    console.log("Saving user to the database");
  }
}
```
Now, the `User` class is only responsible for user data, while `UserRepository` handles data persistence.

#### Real-Life Example:
Think of a chef in a restaurant. If the chef is responsible for cooking, cleaning, and managing the restaurant, they have multiple responsibilities. Instead, if they focus solely on cooking, they can excel at their job, while others handle cleaning and management.

---

### 2. **Open/Closed Principle (OCP)**

**Definition**: Software entities (classes, modules, functions) should be open for extension but closed for modification. You should be able to extend a class's behavior without altering its existing code.

#### JavaScript Example:
Bad Example (violates OCP):
```javascript
class AreaCalculator {
  calculate(shape) {
    if (shape.type === "circle") {
      return Math.PI * shape.radius * shape.radius;
    } else if (shape.type === "square") {
      return shape.side * shape.side;
    }
  }
}

const circle = { type: "circle", radius: 5 };
const square = { type: "square", side: 4 };
console.log(new AreaCalculator().calculate(circle));
console.log(new AreaCalculator().calculate(square));
```
This violates OCP because adding a new shape requires modifying the `AreaCalculator` class.

Good Example (follows OCP):
```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Square {
  constructor(side) {
    this.side = side;
  }

  area() {
    return this.side * this.side;
  }
}

class AreaCalculator {
  calculate(shape) {
    return shape.area();
  }
}

const circle = new Circle(5);
const square = new Square(4);
console.log(new AreaCalculator().calculate(circle));
console.log(new AreaCalculator().calculate(square));
```
Now, you can easily add a new shape by creating a new class without modifying `AreaCalculator`.

#### Real-Life Example:
Consider a smartphone. When new features are added (like a camera or fingerprint sensor), the phone's design remains intact, but new functionalities can be added through software updates or new hardware without changing the existing structure.

---

### 3. **Liskov Substitution Principle (LSP)**

**Definition**: Objects of a superclass should be replaceable with objects of a subclass without altering the correctness of the program. Derived classes must be substitutable for their base classes.

#### JavaScript Example:
Bad Example (violates LSP):
```javascript
class Bird {
  fly() {
    console.log("Flying...");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly!");
  }
}

const penguin = new Penguin();
penguin.fly(); // Error: Penguins can't fly!
```
Here, substituting `Penguin` for `Bird` breaks the code because `Penguin` cannot fly.

Good Example (follows LSP):
```javascript
class Bird {
  move() {
    console.log("The bird is moving...");
  }
}

class Sparrow extends Bird {
  move() {
    console.log("The sparrow is flying...");
  }
}

class Penguin extends Bird {
  move() {
    console.log("The penguin is swimming...");
  }
}

const sparrow = new Sparrow();
const penguin = new Penguin();

sparrow.move(); // Output: The sparrow is flying...
penguin.move(); // Output: The penguin is swimming...
```
Now, both `Sparrow` and `Penguin` can be substituted for `Bird`, and they behave according to their specific implementations.

#### Real-Life Example:
Think of a vehicle class with methods like `start()`, `stop()`, and `drive()`. If you have a `Car` subclass and a `Bicycle` subclass, both should work with the `Vehicle` interface. If the `Bicycle` class does not implement `drive()` in a way that makes sense (like trying to drive a bicycle), it violates LSP.

---

### 4. **Interface Segregation Principle (ISP)**

**Definition**: A client should not be forced to implement an interface it doesn't use. Instead of one large interface, create multiple small, specific interfaces.

#### JavaScript Example:
Bad Example (violates ISP):
```javascript
class Animal {
  makeSound() {}
  fly() {}
  swim() {}
}

class Dog extends Animal {
  makeSound() {
    console.log("Bark");
  }
  fly() {
    throw new Error("Dogs can't fly");
  }
  swim() {
    console.log("Dog is swimming");
  }
}
```
Here, `Dog` is forced to implement methods it doesn't need.

Good Example (follows ISP):
```javascript
class SoundCapable {
  makeSound() {}
}

class SwimCapable {
  swim() {}
}

class Dog extends SoundCapable {
  makeSound() {
    console.log("Bark");
  }
}

class Fish extends SwimCapable {
  swim() {
    console.log("Fish is swimming");
  }
}
```
Now, `Dog` only implements the `SoundCapable` interface, and `Fish` implements `SwimCapable`, keeping the interfaces specific to their purpose.

#### Real-Life Example:
Think of a multi-functional printer. If it has a fax function, it should not force a user who only wants to print to deal with fax-related features. Instead, a simple printer interface can be created for those users, while another interface can include fax capabilities for users who need it.

---

### 5. **Dependency Inversion Principle (DIP)**

**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces). This promotes loose coupling between modules.

#### JavaScript Example:
Bad Example (violates DIP):
```javascript
class MySQLDatabase {
  connect() {
    console.log("Connected to MySQL database");
  }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // Tight coupling to MySQL
  }

  getUser() {
    this.db.connect();
    console.log("Fetching user...");
  }
}
```
The `UserService` is tightly coupled to `MySQLDatabase`, making it hard to switch databases.

Good Example (follows DIP):
```javascript
class Database {
  connect() {
    throw new Error("Method not implemented");
  }
}

class MySQLDatabase extends Database {
  connect() {
    console.log("Connected to MySQL database");
  }
}

class PostgreSQLDatabase extends Database {
  connect() {
    console.log("Connected to PostgreSQL database");
  }
}

class UserService {
  constructor(db) {
    this.db = db; // Depends on an abstraction
  }

  getUser() {
    this.db.connect();
    console.log("Fetching user...");
  }
}

const mySQLDb = new MySQLDatabase();
const postgreSQLDb = new PostgreSQLDatabase();

const userServiceMySQL = new UserService(mySQLDb);
userServiceMySQL.getUser();

const userServicePostgreSQL = new UserService(postgreSQLDb);
userServicePostgreSQL.getUser();
```
Here, `UserService` depends on the abstraction `Database`, allowing us to switch between `MySQL` and `PostgreSQL` without modifying the `UserService` class.

#### Real-Life Example:
Consider a power supply unit (PSU) in a computer. If the computer's components depend directly on a specific PSU (e.g., one from a particular brand), replacing it becomes complicated. Instead, if components depend on a standard interface (like voltage and current ratings), any compatible PSU can be used, making upgrades and replacements easier.
