// 3. Liskov’s Substitution Principle

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


