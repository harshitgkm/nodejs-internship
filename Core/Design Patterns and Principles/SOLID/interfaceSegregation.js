// 4. Interface Segregation Principle
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
