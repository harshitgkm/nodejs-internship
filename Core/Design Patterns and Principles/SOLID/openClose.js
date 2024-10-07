// 2. Open/Closed Principle

// Definition: Software entities should be open for extension but closed for modification.

//Before (Violates OCP):

class Shape {
    area(type, dimensions) {
        if (type === 'circle') {
            return Math.PI * dimensions.radius * dimensions.radius;
        } else if (type === 'rectangle') {
            return dimensions.width * dimensions.height;
        }
    }
}

const shape = new Shape();
console.log(shape.area('circle', { radius: 5 })); // Area of circle
console.log(shape.area('rectangle', { width: 4, height: 6 })); // Area of rectangle


// After
class Shape {
    area() {
        throw new Error("This method should be overridden!");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

function calculateArea(shapes) {
    return shapes.map(shape => shape.area());
}


const shapes = [new Circle(5), new Rectangle(4, 6)];
console.log(calculateArea(shapes));
