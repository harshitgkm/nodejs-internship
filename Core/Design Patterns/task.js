// Identify which SOLID principles are violated in each example.

1. Question

//Code 
class NotificationService {
    sendEmail(email, message) {
        // Sending email logic
        console.log(`Sending email to ${email}: ${message}`);
    }

    sendSMS(phoneNumber, message) {
        // Sending SMS logic
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }

    logNotification(message) {
        // Logging logic
        console.log(`Logging notification: ${message}`);
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.sendEmail(recipient, message);
            this.logNotification(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.sendSMS(recipient, message);
            this.logNotification(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

const service = new NotificationService();
service.notify("email", "user@example.com", "Hello via Email!");


-- Answer :  It violates the Single Responsibility Principle.


// Good code

class EmailService {
    send(email, message) {
        console.log(`Sending email to ${email}: ${message}`);
    }
}

class SMSService {
    send(phoneNumber, message) {
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }
}

class Logger {
    log(message) {
        console.log(`Logging notification: ${message}`);
    }
}

class NotificationService {
    constructor(emailService, smsService, logger) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.logger = logger;
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.emailService.send(recipient, message);
            this.logger.log(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.smsService.send(recipient, message);
            this.logger.log(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

const emailService = new EmailService();
const smsService = new SMSService();
const logger = new Logger();
const service = new NotificationService(emailService, smsService, logger);

service.notify("email", "user@example.com", "Hello via Email!");





2. Question

//Code
class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            if (item.type === 'book') {
                total += item.price * 0.9; // 10% discount on books
            } else if (item.type === 'electronics') {
                total += item.price;
            }
        });
        return total;
    }
}

const cart = new ShoppingCart();
const items = [{ type: 'book', price: 100 }, { type: 'electronics', price: 200 }];
console.log(cart.calculateTotal(items)); // Output: 290


-- ANSWER : It violates the Open/Closed Principle.

// Good code

class Item {
    constructor(price) {
        this.price = price;
    }

    getTotal() {
        return this.price; 
    }
}

class Book extends Item {
    getTotal() {
        return this.price * 0.9; 
    }
}

class Electronics extends Item {
    getTotal() {
        return this.price; // 0 discount
    }
}

class ShoppingCart {
    calculateTotal(items) {
        return items.reduce((total, item) => total + item.getTotal(), 0);
    }
}

const cart = new ShoppingCart();
const items = [new Book(100), new Electronics(200)];
console.log(cart.calculateTotal(items)); // Output: 290



3. Question

//Code
class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
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

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}


function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);


--ANSWER : It violates Liskov Substitution Principle.

// Good code
class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
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

class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    area() {
        return this.side * this.side;
    }
}

function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);

const rectangle = new Rectangle(10, 5);
printArea(rectangle);


4. Question

//Code
class UserManager {
    createUser(username) {
        console.log(User ${username} created.);
    }

    deleteUser(userId) {
        console.log(User ${userId} deleted.);
    }

    resetPassword(userId) {
        console.log(Password for user ${userId} reset.);
    }

    sendEmail(userId, message) {
        console.log(Sending email to user ${userId}: ${message});
    }
}

const userManager = new UserManager();
userManager.createUser("john_doe");
userManager.sendEmail(1, "Welcome!");


--ANSWER : It violates the Single Responsibility Principle.


//Good code
class UserCreator {
    createUser(username) {
        console.log(`User ${username} created.`);
    }
}

class UserDeleter {
    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }
}

class PasswordManager {
    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }
}

class EmailService {
    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

const userCreator = new UserCreator();
const userDeleter = new UserDeleter();
const passwordManager = new PasswordManager();
const emailService = new EmailService();

userCreator.createUser("john_doe");
emailService.sendEmail(1, "Welcome!");



5. Question

class PayPalPayment {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class StripePayment {
    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }
}

class PaymentProcessor {
    constructor() {
        this.paymentMethod = new PayPalPayment(); 
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

const processor = new PaymentProcessor();
processor.processPayment(100);


--ANSWER : It violates the Dependency Inversion Principle.


//Good Code
class Payment {
    pay(amount) {
        throw new Error("Method 'pay()' must be implemented.");
    }
}

class PayPalPayment extends Payment {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class StripePayment extends Payment {
    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }
}

class PaymentProcessor {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod; // Depend on abstraction
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

const paypalPayment = new PayPalPayment();
const stripePayment = new StripePayment();

const paypalProcessor = new PaymentProcessor(paypalPayment);
paypalProcessor.processPayment(100); // Output: Paid 100 using PayPal.

const stripeProcessor = new PaymentProcessor(stripePayment);
stripeProcessor.processPayment(200); // Output: Paid 200 using Stripe.

