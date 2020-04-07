const questionOne = function questionOne(arr) {
    // Implement question 1 here
    if  (arr.length){
        let sumOfSquareRootNo = 0
        arr.filter(ele => {sumOfSquareRootNo += ele * ele;});
        return sumOfSquareRootNo;
    }
    else {
        return 0;
    }
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here

    if (num < 1) 
        return 0 ;
        else if(num == 1)
        return 1 ;
    
    else {
        return questionTwo(num - 1) + questionTwo(num - 2)
    }
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    const countVowels = Array.from(text).filter(letter => ('aeiouAEIOU'.indexOf(letter) != -1)).length;
    return countVowels;
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    if (num <= -1)
        return "NaN";
    else {
        return num < 2 ? 1 : num * questionFour(num-1);
         }
    }



module.exports = {
    firstName: "JANKI", 
    lastName: "PATEL", 
    studentId: "10457365",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};