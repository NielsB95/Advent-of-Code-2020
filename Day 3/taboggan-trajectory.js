var fs = require('fs');
var text = fs.readFileSync("./input.txt").toString('utf-8');
var forestRecords = text.split('\n');
var forestGrid = forestRecords.map(x => x.split(''));

const tree = "#";
const empty = ".";

// Part 1
console.log("Part one");
console.log("Tree count: " + treeEncounters(forestGrid, 3, 1));

function isTree(candidate) {
    return candidate == tree;
}

function treeEncounters(forest, dX, dY) {
    let treeCount = 0;
    let x = 0;
    for (let y = 0; y < forest.length; y += dY) {
        let position = forest[y][x];
        if (isTree(position))
            treeCount++;

        x += dX;
        x = x % forest[y].length;
    }

    return treeCount;
}


console.log();

// Part 2
console.log("Part two");
var slopes = [
    { dX: 1, dY: 1 },
    { dX: 3, dY: 1 },
    { dX: 5, dY: 1 },
    { dX: 7, dY: 1 },
    { dX: 1, dY: 2 },
]

let result = 1;
for (let i = 0; i < slopes.length; i++) {
    var slope = slopes[i];
    let treeCount = treeEncounters(forestGrid, slope.dX, slope.dY);
    console.log(`Right: ${slope.dX}, Down: ${slope.dY} = ${treeCount}`);

    result *= treeCount;
}

console.log(`Multiplication of all tree encounters: ${result}`);