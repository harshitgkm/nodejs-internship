// 1. Question

//Code 
class NotificationService {
    sendEmail(email, message) {
        // Sending email logic
        console.log(`Sending email to ${email}: ${message}`);
    }

    sendSMS(phoneNumber, message) {
        // Sending SMS logic
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }

    logNotification(message) {
        // Logging logic
        console.log(`Logging notification: ${message}`);
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.sendEmail(recipient, message);
            this.logNotification(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.sendSMS(recipient, message);
            this.logNotification(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

const service = new NotificationService();
service.notify("email", "user@example.com", "Hello via Email!");


-- Answer :  It violates the Single Responsibility Principle.


// Good code

class EmailService {
    send(email, message) {
        console.log(`Sending email to ${email}: ${message}`);
    }
}

class SMSService {
    send(phoneNumber, message) {
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }
}

class Logger {
    log(message) {
        console.log(`Logging notification: ${message}`);
    }
}

class NotificationService {
    constructor(emailService, smsService, logger) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.logger = logger;
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.emailService.send(recipient, message);
            this.logger.log(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.smsService.send(recipient, message);
            this.logger.log(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

const emailService = new EmailService();
const smsService = new SMSService();
const logger = new Logger();
const service = new NotificationService(emailService, smsService, logger);

service.notify("email", "user@example.com", "Hello via Email!");


