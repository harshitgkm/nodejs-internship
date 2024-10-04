# Design Patterns

1.Singleton pattern

//BAD example

let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // false


//Good example

let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!



2. Factory Pattern


// BAD CODE
class Add {
    constructor(a, b){
        this.addition = a+b;
    }
    add(){
        console.log(this.addition);
    }
}
class Sub {
    constructor(a, b){
        this.subtraction = a-b;
    }
    sub(){
        console.log(this.subtraction);
    }
}
const ans = new Add(24, 13);
ans.add();
const result = new Sub(24,13);
result.sub();


// GOOD CODE
class Add {
    constructor(a, b){
        this.addition = a+b;
    }
    add(){
        console.log(this.addition);
    }
}
class Sub {
    constructor(a, b){
        this.subtraction = a-b;
    }
    sub(){
        console.log(this.subtraction);
    }
}
class MathFactory {
    static math(operation, a, b){
        switch (operation){
            case 'Add':
                this.ans = new Add(a,b);
                this.ans.add()
                return this.ans;
            break;
            case 'Sub':
                this.ans = new Sub(a,b);
                return this.ans.sub();
            break;
        }
        }
}
const ans = MathFactory.math("Add", 24, 13);
const result = MathFactory.math("Sub", 24, 13);



3. Observer Pattern
// BAD CODE
class Observable {
  constructor() {
    this.observers = [];
  }
  subscribe(func) {
    this.observers.push(func);
  }
  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }
  notify(data) {
    this.observers((observer) =>{
            console.log(observer(data));
            return observer(data)
    });
    // this is working only for single user, for multile users we have to make multiple notify functions
  }
}
const obj = new Observable();
let fun = (data)=>{
    return `subscriber 1 ${data}`;
}
obj.subscribe(fun);
// obj.unsubscribe(fun);
obj.notify("hey there!!");


// GOOD CODE

class Observable {
  constructor() {
    this.observers = [];
  }
  subscribe(func) {
    this.observers.push(func);
  }
  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }
  notify(data) {
    this.observers.forEach((observer) =>{
            console.log(observer(data));
            return observer(data)
    });
  }
}
const obj = new Observable();
let fun = (data)=>{
    return `subscriber 1 ${data}`;
}
obj.subscribe(fun);
// obj.unsubscribe(fun);
obj.notify("hey there!!");




4. Decorator pattern

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



5. Command pattern

// BAD CODE EXAMPLE:
class Television {
    turnOn() {
        console.log("Television is ON");
    }
    turnOff() {
        console.log("Television is OFF");
    }
}
class RemoteControl {
    constructor(tv) {
        this.tv = tv;
    }
    pressButton(action) {
        if (action === "on") {
            this.tv.turnOn();
        } else if (action === "off") {
            this.tv.turnOff();
        }
    }
}
const tv = new Television();
const remote = new RemoteControl(tv);
remote.pressButton("on");
remote.pressButton("off");



// GOOD CODE EXAMPLE:
class Command {
    execute() {}
}
class TurnOnCommand extends Command {
    constructor(device) {
        super();
        this.device = device;
    }
    execute() {
        this.device.turnOn();
    }
}
class TurnOffCommand extends Command {
    constructor(device) {
        super();
        this.device = device;
    }
    execute() {
        this.device.turnOff();
    }
}
class Television {
    turnOn() {
        console.log("Television is ON");
    }
    turnOff() {
        console.log("Television is OFF");
    }
}
class RemoteControl {
    setCommand(command) {
        this.command = command;
    }
    pressButton() {
        this.command.execute();
    }
}
const tv = new Television();
const remote = new RemoteControl();
const turnOn = new TurnOnCommand(tv);
const turnOff = new TurnOffCommand(tv);
remote.setCommand(turnOn);
remote.pressButton();
remote.setCommand(turnOff);
remote.pressButton();


6. Proxy Pattern

const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  }
});

personProxy.name;
personProxy.age = 43;