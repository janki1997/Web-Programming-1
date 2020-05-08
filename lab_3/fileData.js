const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));
const util = require('util');  
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


async function getFileAsString(path) {
    if (!path) throw "You must provide a path";
    const note = await readFile(path, "utf-8");
    return note

}

async function getFileAsJSON(path) {

    if (!path) throw "You must provide a path";
    const note = await readFile(path);
    return JSON.parse(note);
}



async function saveStringToFile(path, text) {

    if (!path) throw "You must provide a path";
    writeFile(path, text);
    return true;

}

async function saveJSONToFile(path, text) {

    if (!path) throw "You must provide a path";
    if (typeof text == "object") {
        writeFile(path, JSON.stringify(text));
        return true;
    }
    else{
            throw "enter a valid obj";
    }
}
    module.exports = {
        getFileAsString: getFileAsString,
        getFileAsJSON: getFileAsJSON,
        saveStringToFile: saveStringToFile,
        saveJSONToFile: saveJSONToFile
    };