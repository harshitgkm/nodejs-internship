// 1. Single Responsibility Principle

// Definition: A class should have only one reason to change, meaning it should only have one job.

//Before (Violates SRP):
class UserService {
    constructor(name) {
        this.name = name;
    }

    save() {
        
    }

    sendEmail() {
        
    }
}


const userService = new UserService('John Doe');
userService.save();
userService.sendEmail();



// After
class User {
    constructor(name) {
        this.name = name;
    }
}

class UserRepository {
    save(user) {
        
    }
}

class UserNotification {
    sendEmail(user) {
        
    }
}

const user = new User('John Doe');
const userRepo = new UserRepository();
const userNotification = new UserNotification();

userRepo.save(user);
userNotification.sendEmail(user);
