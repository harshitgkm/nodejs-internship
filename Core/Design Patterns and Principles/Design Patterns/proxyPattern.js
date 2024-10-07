// Logging Proxy


// Bad 

const target = {};

const proxy = new Proxy(target, {
  get(target, prop) {
    if (prop === 'foo') {
      // Complex logic here...
    } else if (prop === 'bar') {
      // More complex logic...
    }
    // ...
  },
  set(target, prop, value) {
    if (prop === 'foo') {
      // Even more complex logic...
    }
    // ...
  }
});



// Good

const targetObject = {
  name: "John",
  age: 30,
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const loggingProxy = new Proxy(targetObject, {
  get(target, prop, receiver) {
    console.log(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },

  set(target, prop, value, receiver) {
    console.log(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
});

loggingProxy.name = "Jane"; // Logs: Setting property: name to Jane
loggingProxy.greet(); // Logs: Accessing property: greet, Hello, I'm Jane