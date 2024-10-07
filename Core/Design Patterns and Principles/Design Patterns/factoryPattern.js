// Factory Pattern


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
