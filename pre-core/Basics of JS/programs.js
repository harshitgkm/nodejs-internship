//************** Program to print even number from an array. ****************

// const arr = [1,2,3,4,5,6,7,8,9,10]

//  arr.forEach((ele)=>{
//  	if(ele%2==0)
//  	console.log(ele)
//  })

//************** Program to print array of name and address from an array of objects. ***************

// const obj = [
// {
// 	name:"Harshit",
// 	address: "udaipur",
// 	number: 123456
// },
// {
// 	name:"ABC",
// 	address: "jaipur",
// 	number: 1234567
// },
// {
// 	name:"XYZ",
// 	address: "delhi",
// 	number: 1234589
// },
// {
// 	name:"PQR",
// 	address: "delhi",
// 	number: 45678
// },
// ]


// obj.forEach((ele)=>{
// 	// console.log(ele.name + ":" + ele.address)
// 	console.log(`${ele.name} : ${ele.address}`)
// })

//************* Program to print array of name and address as well as string of name and address from an array of objects. ***************


// obj.forEach((ele)=>{
// 	console.log(`${ele.name} : ${ele.address}`)
// })	

//************* Program to print name of the user having even phone number from an array of objects. ****************


// obj.forEach((ele)=>{
	
// 	if(ele.number %2==0){
// 		console.log(ele.name)
// 	}
// })	


// ************* Task To-do's ****************
//sort ,reduce, - (number, strings , arrr of objects) map, forEach, find, filter


//******************** 1. map ********************

// Description: Creates a new array by applying a function to each element of the original array.

// ************ Example: *************

// const numbers = [1, 2, 3, 4];
// const doubled = numbers.map(num => num * 2);
// console.log(doubled); // [2, 4, 6, 8]
// When to Use: Use map when you want to transform each element of an array and return a new array of the same length.


//******************** example 1 ********************
// const numbers = [10,20,30,40,50]
// const newArr1 = numbers.map(multiplyByTen);

// function multiplyByTen (num){
//     return num*10
// }

// console.log(newArr1)

//******************** example 2 ********************

// const filteredNumbers = numbers.map((num,index) => {
// 	if(index<3){
// 		return num
// 	}
// })


//******************** 2. forEach ********************

// ******************** example 1 ********************

// let sum = 0;
// numbers.forEach(myFunction);

// function myFunction(item) {
//   sum += item;
// }

// console.log(sum)

//******************** example 2 - multiply each arr ele by 10 ********************

// numbers.forEach(myFunction);

// function myFunction(item,index,arr) {
//   arr[index] = item*10
// }

// console.log(numbers)

// ******************** 3. find - The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.********************


// Description: Returns the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.

// Example:

// const numbers = [1, 2, 3, 4];
// const found = numbers.find(num => num > 2);
// console.log(found); // 3
// When to Use: Use find when you want to locate the first element that matches a condition and return that element. It stops searching after finding the first match.


//******************** example 1 ********************

// const fruits = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "cherries", quantity: 5 },
// ];

// const res = fruits.find((fruit)=> fruit.name==="apples")

// console.log(res.name)


//********************* 4. filter ********************

// Description: Creates a new array with all elements that pass the test implemented by the provided function.

// ******************** Example ********************

// const numbers = [1, 2, 3, 4];
// const evens = numbers.filter(num => num % 2 === 0);
// console.log(evens); // [2, 4]
// When to Use: Use filter when you want to select a subset of elements based on a condition, returning only those that meet the criteria.

//******************** example 1 ********************

// const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
// const word = words.filter((word)=> word.length > 8)
// console.log(word)


// console.log(ans)


//******************** 5. Reduce -- reduce() method is recommended when you need to have a single value returned from iterating over your array. ********************

// Syntax : arr.reduce(callback(accumulator, currentValue), initialValue)

// Description: Executes a reducer function on each element of the array, resulting in a single output value.

// ******************** Example: ********************

// const numbers = [1, 2, 3, 4];
// const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
// console.log(sum); // 10
// When to Use: Use reduce when you need to compute a single value from an array (like a sum, product, or concatenation) or transform an array into a different data structure.



//******************** example 1 ********************
// const items = [
//   { name: 'Apple', price: 1 },
//   { name: 'Orange', price: 2 },
//   { name: 'Mango', price: 10 },
// ];

// // let totalPrice = 0;

// const ans1 = items.reduce((accumulator, item)=>{
// 	return accumulator+= item.price
// },0)

// console.log(ans1)


//******************** 6. sort ********************

//******************** example 1 - sorting array of string in asc order ********************
// const months = ['March', 'Jan', 'Feb', 'Dec'];
// months.sort();
// console.log(months);
//******************** Expected output: Array ["Dec", "Feb", "Jan", "March ********************

//******************** example 2 - sorting array of string in desc order ********************
// const months = ['March', 'Jan', 'Feb', 'Dec'];
// months.sort((a,b)=> b.localCompare(a));
// console.log(months);

//******************** example 3 - It does not sort numbers ******************** 
// const array1 = [1, 30, 4, 21, 100000];
// array1.sort();
// console.log(array1);
// Expected output: Array [1, 100000, 21, 30, 4]


//******************** example 4 - sorting numbers in asc order/desc order(replace a with b) ********************

// const numbers = [112,343,124,76,1,56]

// const ans = numbers.sort(function(a,b){return a-b})
// console.log(ans)


//******************** (a, b) => a - b: ********************

// This is a compare function. It takes two arguments, a and b, which represent two elements from the array being compared.
// The expression a - b calculates the difference between the two elements:
// If a is less than b, the result will be negative, indicating that a should come before b.
// If a is greater than b, the result will be positive, indicating that a should come after b.

// for eg: const numbers = [10, 1, 21, 2];
// If a and b are equal, the result will be zero, indicating that their order does not matter.


//******************** example 5 - sorting objects ********************

// const people = [
//     { name: 'John', age: 25 },
//     { name: 'Jane', age: 20 },
//     { name: 'Alice', age: 30 }
// ];

// const ans = people.sort((a,b)=> a.age - b.age)
// console.log(ans)


//******************** example 6 - sort on basis of name or any string key ********************

// const ans = people.sort((a,b) => a.name.localeCompare(b.name))
// console.ans(ans)


//******************** 7. Deep and shallow ********************
// deep copy
// A deep copy creates a new object and recursively copies all objects and arrays nested within it. Changes to nested objects in the deep copy do not affect the original object.

//shallow copy
// A shallow copy creates a new object but does not create copies of nested objects. Instead, it copies references to those objects. If you change a nested object in the shallow copy, it will also affect the original object.

