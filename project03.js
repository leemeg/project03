/**
 *   @author Marshall, Lee (marshalll@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');


let wrongNum = 0; // presets incorrect response attempts to max number of tries
let numVotes = 0; //resets votes for new run
let stars, result;
let movieTitle = "Howard Bates is awesome";
let arrayStars = [];

function main() {
    //setReRun();
    while (stars !== 99) {
        setStars();

        //setReRun();
    }
    setResults();
}
main();



function setStars() {
    const NUMTRY = 3;
    const END = 99;
    //process.stdout.write('\x1Bc');
    console.log(`\nWith 0 stars being worst and 5 stars equaling the best, how would you rate the movie "${movieTitle}" ?`);
    console.log(`Or if you no longer wish to participate, enter 99.`);
    stars = Number(PROMPT.question(`Please enter a number from 0 to 5 representing how many stars you would give this movie: `));

    if ((stars >= 0 && stars <= 5) && stars !== END) {
        wrongNum = 0;
        (arrayStars.push(stars));
        numVotes++;
    }
    else if ((stars < 0 || stars > 5) && (stars !== END)){
        wrongNum++;
        if (wrongNum < (NUMTRY - 1)) {
            console.log(`\nIncorrect rating, please try again.`);
            return setStars();
        }
        if (wrongNum < NUMTRY) {
            console.log(`\nIncorrect rating, one attempt remaining.`);
            return setStars();
        }
        if (wrongNum === NUMTRY) {
            console.log(`\nSorry that rating is not allowed, Thank you for your participation.`);
            stars = null;
        }
    }

}



function setResults() {
    let sum;
    process.stdout.write('\x1Bc');
    sum = arrayStars.reduce(function (a, b) {return a + b;}, 0);//https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    result = (sum / numVotes);
    console.log(`\nWith ` + numVotes + ` votes, the average star rating of the movie "` + movieTitle + `" is ` + result + ` stars.`);
}