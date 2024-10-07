// 5. Question

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

