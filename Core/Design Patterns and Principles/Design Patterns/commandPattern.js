//  Command pattern

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
