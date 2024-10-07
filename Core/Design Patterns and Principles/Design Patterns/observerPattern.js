// Observer Pattern
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
