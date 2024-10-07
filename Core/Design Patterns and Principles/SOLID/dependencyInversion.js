// 5. Dependency Inversion Principle

//Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces). Abstractions should not depend on details. Details should depend on abstractions.

// Before (Violates DIP):
class Database {
    connect() {
        //logic
    }
}

class UserService {
    constructor() {
        this.db = new Database(); 
    }
}

//Explanation: The UserService class is tightly coupled with the Database class. If we want to switch to a different database, we need to modify UserService.


// After
class Database {
    connect() {
        // logic
    }
}

class UserService {
    constructor(database) {
        this.db = database; // depends on abstraction
    }
}

const db = new Database();
const userService = new UserService(db);

// Explanation: Now, UserService depends on the database abstraction, allowing for easier changes to the database implementation without modifying UserService.

