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
let rerun, stars, result;
let movieTitle = "Howard Bates is awesome"
let arrayStars = [];

function main() {
    setReRun();
    while (rerun === 1) {
        setStars();
        populateArrayStars();
        setReRun();
    }
    setResults();
}
main();

function setReRun() {
    if (rerun === 1 || rerun === 0) {
        rerun = Number(PROMPT.question(`\nWould you like to rate a movie? [0=no, 1=yes]: `));
        while (rerun !== 0 && rerun !== 1) {
            console.log(`${rerun} is an incorrect value. Please try again.`);
            rerun = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    }else {
        rerun = 1;
    }
}

function setStars() {
    const NUMTRY = 3;
    console.log(`\nWith 0 stars being worst and 5 stars equaling the best, how would you rate the movie "${movieTitle}" ?`);
    stars = Number(PROMPT.question(`Please enter a number from 0 to 5 representing how many stars you would give this movie: `));
    if (stars < 0 || stars > 5) {
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
            rerun = 0;
        }
    }
    wrongNum = 0;
}

function populateArrayStars() {
    arrayStars.push(stars);
    Array.prototype.values();
    numVotes++;
}

function setResults() {
    let sum;
    process.stdout.write('\x1Bc');
    sum = arrayStars.reduce(function (a, b) {return a + b;}, 0);
    result = (sum / numVotes);
    console.log(`\nWith ` + numVotes + ` votes, the average star rating of the movie "` + movieTitle + `" is ` + result + ` stars.`);
}