const lab2I = require("./utilities");
const lab2= require("./geometry");


const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const test = "Hello, the pie is in the oven";
const testArr = ["a", "a", "b", "a", "b", "c"];


try{
console.log(lab2.volumeOfRectanglePrism(5,8,3));
}catch(e){
    throw Error;
}


try{
console.log(lab2.surfaceAreaOfRectanglePrism(5,-1, 3));
}catch(e){
    throw Error;
}


try{
console.log(lab2.volumeOfSphere(7));
}
catch(e){
    throw Error;
}


try{
console.log(lab2.surfaceAreaOfSphere(9));
}
catch(e){
    throw Error;
}


try{
console.log(lab2I.deepEquality(first,second));
}catch(e){
    throw Error;
}


try{
console.log(lab2I.deepEquality(first,third));
}catch(e){
    throw Error;
}


try{
console.log(lab2I.uniqueElements(testArr));
}catch(e){
    throw Error;
}


try{
const charMap = console.log(lab2I.countOfEachCharacterInString(test));
}catch(e){
    throw Error;
}