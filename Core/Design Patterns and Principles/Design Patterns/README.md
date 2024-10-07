### Understanding Design Patterns

**What are Design Patterns?**

Think of design patterns like recipes for cooking. Just like a recipe tells you how to make a dish using specific ingredients and steps, design patterns are solutions for common problems in programming. They provide a guide or template for how to solve problems in your code.

#### Why Do We Use Design Patterns?

1. **Reusability**: Imagine you have a favorite recipe that you use again and again. Design patterns are like those favorite recipes; they let you reuse code instead of starting from scratch every time.

2. **Efficiency**: Sometimes, when cooking, you might forget a step or add too much salt. Design patterns help programmers avoid mistakes by providing proven ways to write code, making the whole process smoother.

3. **Communication**: Just like how you and your friends can talk about cooking using the same terms (like "bake" or "fry"), design patterns give developers a common language to discuss coding ideas. This makes teamwork easier!

4. **Flexibility**: If you want to change a recipe, it’s easier if you have a good base to start with. Design patterns help you build your programs in a way that makes it easy to add or change features later.

### Examples of Design Patterns

Let’s go through some design patterns with coding examples. We’ll start with simple concepts and then show how they can be implemented in JavaScript.

### Conclusion

Design patterns are like cooking recipes for programmers. They help us solve common problems in a reusable, efficient, and flexible way. By understanding these patterns, you can improve your coding skills and make your programs easier to maintain and understand.



### 1. **Singleton Pattern**

**Purpose:** Ensure a class has only one instance and provides a global point of access to that instance.

**Use Case:** Database connections, logging services, or configuration settings in an application.

#### Code Example: Singleton for Logger

```javascript
// logger.js
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance; // Return existing instance
    }

    this.logs = []; // Store logs
    Logger.instance = this; // Save instance

    return this;
  }

  log(message) {
    this.logs.push(message);
    console.log(`Log: ${message}`);
  }

  getLogs() {
    return this.logs;
  }
}

const loggerInstance = new Logger();
Object.freeze(loggerInstance); // Ensure instance is immutable

module.exports = loggerInstance;
```

#### Usage:

```javascript
// app.js
const logger = require('./logger');

logger.log('This is the first log');
logger.log('This is the second log');

console.log(logger.getLogs()); // [ 'This is the first log', 'This is the second log' ]
```

**Explanation:**
- The `Logger` class is designed to have only one instance across the application. Every time you require the logger, it returns the same instance, ensuring that logs are shared across different modules.



### 2. **Factory Pattern**

**Purpose:** Create objects without specifying the exact class of object that will be created. This is useful when dealing with multiple object types that share common interfaces.

**Use Case:** Object creation based on input or configuration, e.g., creating different user roles (admin, guest) or database connections.

#### Code Example: Factory for Different Payment Gateways

```javascript
// paymentFactory.js
class PayPal {
  constructor() {
    this.name = 'PayPal';
  }

  processPayment(amount) {
    console.log(`Processing ${amount} via PayPal`);
  }
}

class Stripe {
  constructor() {
    this.name = 'Stripe';
  }

  processPayment(amount) {
    console.log(`Processing ${amount} via Stripe`);
  }
}

class PaymentFactory {
  static createPayment(type) {
    switch (type) {
      case 'paypal':
        return new PayPal();
      case 'stripe':
        return new Stripe();
      default:
        throw new Error('Unsupported payment gateway');
    }
  }
}

module.exports = PaymentFactory;
```

#### Usage:

```javascript
// app.js
const PaymentFactory = require('./paymentFactory');

const paymentGateway = PaymentFactory.createPayment('paypal');
paymentGateway.processPayment(100); // Processing 100 via PayPal
```

**Explanation:**
- The **Factory** pattern allows you to create objects based on dynamic inputs (`'paypal'` or `'stripe'`). You can add more payment gateways without modifying the client code.



### 3. **Observer Pattern**

**Purpose:** Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

**Use Case:** Event-based systems like chat applications, where you want to notify multiple subscribers when a message is received.

#### Code Example: Observer for Event Notifications

```javascript
// eventEmitter.js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(listener => listener(data));
    }
  }
}

module.exports = EventEmitter;
```

#### Usage:

```javascript
// app.js
const EventEmitter = require('./eventEmitter');
const eventEmitter = new EventEmitter();

// Subscriber 1
eventEmitter.subscribe('message', (data) => {
  console.log(`Subscriber 1 received: ${data}`);
});

// Subscriber 2
eventEmitter.subscribe('message', (data) => {
  console.log(`Subscriber 2 received: ${data}`);
});

// Emit event
eventEmitter.emit('message', 'Hello, World!');

// Output:
// Subscriber 1 received: Hello, World!
// Subscriber 2 received: Hello, World!
```

**Explanation:**
- The **Observer** pattern allows subscribers to listen to events and react when those events are emitted. Multiple subscribers can respond to a single event.



### 4. **Decorator Pattern**

**Purpose:** Attach additional behaviors or responsibilities to objects dynamically without altering their code.

**Use Case:** Adding functionality to objects like logging, validation, or security checks without modifying the original object code.

#### Code Example: Decorator for Adding Timestamps to Messages

```javascript
// logger.js
class Logger {
  log(message) {
    console.log(message);
  }
}

class TimestampedLogger {
  constructor(logger) {
    this.logger = logger;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    this.logger.log(`[${timestamp}] ${message}`);
  }
}

module.exports = { Logger, TimestampedLogger };
```

#### Usage:

```javascript
// app.js
const { Logger, TimestampedLogger } = require('./logger');

const logger = new Logger();
const timestampedLogger = new TimestampedLogger(logger);

logger.log('Simple log'); // Simple log
timestampedLogger.log('Decorated log'); // [2024-10-03T10:00:00.000Z] Decorated log
```

**Explanation:**
- The **Decorator** pattern adds additional functionality (a timestamp) to the `Logger` without modifying its core logic.



### 5. **Proxy Pattern**

**Purpose:** Provide a surrogate or placeholder for another object to control access to it.

**Use Case:** Controlling access to expensive resources, like performing network requests or database queries only when necessary.

#### Code Example: Proxy for Lazy Database Connection

```javascript
// database.js
class RealDatabase {
  connect() {
    console.log('Connecting to the real database...');
  }

  query(sql) {
    console.log(`Executing query: ${sql}`);
  }
}

class DatabaseProxy {
  constructor() {
    this.realDatabase = null;
  }

  connect() {
    if (!this.realDatabase) {
      this.realDatabase = new RealDatabase();
      this.realDatabase.connect();
    }
  }

  query(sql) {
    this.connect(); // Only connect when needed
    this.realDatabase.query(sql);
  }
}

module.exports = new DatabaseProxy();
```

#### Usage:

```javascript
// app.js
const db = require('./database');

db.query('SELECT * FROM users'); // Connecting to the real database... Executing query: SELECT * FROM users
```

**Explanation:**
- The **Proxy** pattern controls access to a `RealDatabase`. The connection is made lazily, meaning the database only connects when a query is actually made.



### 6. **Command Pattern**

**Purpose:** Encapsulate a request as an object, allowing parameterization of clients with queues, logs, and support for undoable operations.

**Use Case:** Actions that can be triggered, stored, or undone, such as text editor commands (undo, redo).

#### Code Example: Command for Undo/Redo Operations

```javascript
// command.js
class AddCommand {
  constructor(value) {
    this.value = value;
  }

  execute(currentValue) {
    return currentValue + this.value;
  }

  undo(currentValue) {
    return currentValue - this.value;
  }
}

class CommandManager {
  constructor() {
    this.history = [];
  }

  execute(command, currentValue) {
    this.history.push(command);
    return command.execute(currentValue);
  }

  undo(currentValue) {
    const command = this.history.pop();
    if (command) {
      return command.undo(currentValue);
    }
    return currentValue;
  }
}

module.exports = { AddCommand, CommandManager };
```

#### Usage:

```javascript
// app.js
const { AddCommand, CommandManager } = require('./command');

const commandManager = new CommandManager();
let value = 10;

const add5 = new AddCommand(5);
value = commandManager.execute(add5, value); // 15
value = commandManager.undo(value); // 10
```

**Explanation:**
- The **Command** pattern allows actions like `execute()` and `undo()` to be encapsulated as objects. This is useful for managing user actions like in a text editor or GUI.



### Summary of Patterns:
1. **Singleton**: Ensures a class has only one instance.
2. **Factory**: Creates objects based on inputs.
3. **Observer**: Notifies subscribers of changes.
4. **Decorator**: Adds behavior to objects dynamically.
5. **Proxy**: Controls access to another object.
6. **Command**: Encapsulates requests as objects (e.g., undo/redo).

Each pattern solves a specific problem and helps improve flexibility, maintainability, and reusability in code.