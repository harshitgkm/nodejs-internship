// 4. Question

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