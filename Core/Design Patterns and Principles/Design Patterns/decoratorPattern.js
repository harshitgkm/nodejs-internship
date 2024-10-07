// Decorator pattern

//BAD
class BadCoffee {
    cost() {
        return 5;
    }

    description() {
        return "Plain Coffee";
    }

    addMilk() {
        return {
            cost: () => this.cost() + 1,
            description: () => "Plain Coffee, with Milk"
        };
    }

    addSugar() {
        return {
            cost: () => this.cost() + 0.5,
            description: () => "Plain Coffee, with Sugar"
        };
    }
}
const badCoffee = new BadCoffee();
console.log(badCoffee.description() + " costs $" + badCoffee.cost());

const milkCoffee = badCoffee.addMilk();
console.log(milkCoffee.description() + " costs $" + milkCoffee.cost());

const sugarCoffee = badCoffee.addSugar();
console.log(sugarCoffee.description() + " costs $" + sugarCoffee.cost());



//GOOD

class Coffee {
    cost() {
        return 5; // Base cost of a plain coffee
    }

    description() {
        return "Plain Coffee";
    }
}

// Decorator classes
class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 1; // Adding cost of milk
    }

    description() {
        return this.coffee.description() + ", with Milk";
    }
}

class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 0.5; 
    }

    description() {
        return this.coffee.description() + ", with Sugar";
    }
}


let myCoffee = new Coffee();
console.log(myCoffee.description() + " costs $" + myCoffee.cost());

myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.description() + " costs $" + myCoffee.cost());

myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.description() + " costs $" + myCoffee.cost());