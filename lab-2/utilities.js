const deepEquality = function (obj1, obj2) {

    if (typeof obj1 == "object" && typeof obj2 == "object") {
        if (obj1 && obj2) {
            if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
                return true
            } else {

                return false;
            }
        } else {
            return ("argument is not correct");
      
        }
    } else {
        return ("argument is not correct");
    }
}

const uniqueElements = function (arr) {

    if (Array.isArray(arr)) {
        return[...new Set(arr)];
    
    } else {
        return ("argument is not correct");
     
    }
    
}

const countOfEachCharacterInString = function (str) {
    if (typeof str == "string" && str != "" && str != " ") {

      
        var a = [];
        [...new Set(str)].sort().filter(x => { a.push({ [x]: (str.split(x).length - 1) }) });
        return a;

    } else {
        return ("argument is not correct");
    }
}

module.exports = {
 
    deepEquality,
    uniqueElements,
    countOfEachCharacterInString
}