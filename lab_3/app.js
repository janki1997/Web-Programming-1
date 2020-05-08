const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const fileData = require('./fileData'); 
const Promise = bluebird.Promise;
const textMetrics = require('./textMetrics'); 


async function main() {

    let rout1 = './chapter1.result.json';
    let path1 = './chapter1.txt';

    let rout2 = './chapter2.result.json';
    let path2 = './chapter2.txt';

    let rout3 = './chapter3.result.json';
    let path3 = './chapter3.txt';

    try {
        //chapter I
        if (fs.existsSync(rout1)) {
            let final = await fileData.getFileAsJSON(rout1);
            console.log("chapter 1");
            console.log(final);

        } else {
            let final = await fileData.getFileAsString(path1);
            const Matrix = await textMetrics.createMetrics(final);
            const save_file = await fileData.saveStringToFile(rout1, JSON.stringify(Matrix))
            console.log("chapter 1");
            console.log(Matrix);
        }

        // chapter II
        if (fs.existsSync(rout2)) {
            let final = await fileData.getFileAsJSON(rout2);
            console.log("chapter 2");
            console.log(final);

        } else {
            let final = await fileData.getFileAsString(path2);
            const Matrix = await textMetrics.createMetrics(final);
            const save_file = await fileData.saveStringToFile(rout2, JSON.stringify(Matrix))
            console.log("chapter 2");
            console.log(Matrix);
        }

        //chapter III
        if (fs.existsSync(rout3)) {
            let final = await fileData.getFileAsJSON(rout3);
            console.log("chapter 3");
            console.log(final);

        } else {
            let final = await fileData.getFileAsString(path3);
            const Matrix = await textMetrics.createMetrics(final);
            const save_file = await fileData.saveStringToFile(rout3, JSON.stringify(Matrix))
            console.log("chapter 3");
            console.log(Matrix);
        }
        // const tt = await textMetrics.createMetrics("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo! 2 3 4 23");
        // console.log(tt);

    } catch (err) {
        let final = await err;
        console.log("write proper path",final );
    }
}

main()