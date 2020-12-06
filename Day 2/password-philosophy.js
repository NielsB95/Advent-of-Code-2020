var fs = require('fs');
var text = fs.readFileSync("./input.txt").toString('utf-8');
var passwords = text.split('\n');

// Part 1
let count = 0;
const partOne = passwords.map((passwordRecord) => {
    let [upperLowerBound, requiredChar, password] = passwordRecord.split(" ");
    requiredChar = requiredChar[0];
    let [lower, upper] = upperLowerBound.split("-");

    // Check how many times the char is used;
    let occurences = password.split("").filter(x => x == requiredChar).length;
    let isValid = occurences >= lower && occurences <= upper;
    return isValid;
});

console.log("Part 1: " + partOne.filter(x => x).length);

// Part 2
const partTwo = passwords.map((passwordRecord) => {
    let [upperLowerBound, requiredChar, password] = passwordRecord.split(" ");
    requiredChar = requiredChar[0];

    let [first, second] = upperLowerBound.split("-");
    let splittedChars = password.split("");

    let firstValid = splittedChars[Number(first) + 1] == requiredChar;
    let secondValid = splittedChars[Number(second) + 1] == requiredChar;

    // XOR the two variables
    let isValid = (firstValid || secondValid) && !(firstValid && secondValid);
    return isValid;
});
console.log("Part 2: " + partTwo.filter(x => x).length);