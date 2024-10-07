// 2. Question

//Code
class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            if (item.type === 'book') {
                total += item.price * 0.9; // 10% discount on books
            } else if (item.type === 'electronics') {
                total += item.price;
            }
        });
        return total;
    }
}

const cart = new ShoppingCart();
const items = [{ type: 'book', price: 100 }, { type: 'electronics', price: 200 }];
console.log(cart.calculateTotal(items)); // Output: 290


-- ANSWER : It violates the Open/Closed Principle.

// Good code

class Item {
    constructor(price) {
        this.price = price;
    }

    getTotal() {
        return this.price; 
    }
}

class Book extends Item {
    getTotal() {
        return this.price * 0.9; 
    }
}

class Electronics extends Item {
    getTotal() {
        return this.price; // 0 discount
    }
}

class ShoppingCart {
    calculateTotal(items) {
        return items.reduce((total, item) => total + item.getTotal(), 0);
    }
}

const cart = new ShoppingCart();
const items = [new Book(100), new Electronics(200)];
console.log(cart.calculateTotal(items)); // Output: 290


