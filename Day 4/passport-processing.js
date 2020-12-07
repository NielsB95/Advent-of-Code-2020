var fs = require('fs');
var text = fs.readFileSync("./input.txt").toString('utf-8');
var data = text.split('\n');

let passports = [];
let passportID = 0;
for (let i = 0; i < data.length; i++) {
    if (data[i] == '') {
        passportID += 1;
        continue;
    }

    if (passports[passportID] == undefined)
        passports[passportID] = [];

    passports[passportID] = [...passports[passportID], ...data[i].split(' ')];
}

console.log(passports);

// Part one
let validCount = 0;
let requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
for (let i = 0; i < passports.length; i++) {
    let passport = passports[i];
    let keys = passport.map(x => x.split(':')[0]);
    let containsAll = keys.map(x => requiredFields.includes(x)).filter(x => x).length == requiredFields.length;

    if (containsAll)
        validCount += 1;
}
console.log("Part one, valid passports: " + validCount);

// Part two
validCount = 0;
for (let i = 0; i < passports.length; i++) {
    let passport = passports[i];

    // It's valid until we find something that's not valid
    let isValid = true;
    let j = 0;
    while (isValid && j < passport.length) {
        let field = passport[j];
        let key = field.split(':')[0];
        let value = field.split(':')[1];

        if (key == 'byr')
            isValid = Number(value) >= 1920 && Number(value) <= 2002;
        if (key == 'iyr')
            isValid = Number(value) >= 2010 && Number(value) <= 2020;
        if (key == 'eyr')
            isValid = Number(value) >= 2020 && Number(value) <= 2030;
        if (key == 'hgt')
            if (value.endsWith('cm'))
                isValid = Number(value.slice(0, value.length - 2)) >= 150 && Number(value.slice(0, value.length - 2)) <= 193;
            else if (value.endsWith('in'))
                isValid = Number(value.slice(0, value.length - 2)) >= 59 && Number(value.slice(0, value.length - 2)) <= 76;
        if (key == 'hcl')
            isValid = /#[0-9a-f]{6}/g.test(value);
        if (key == 'ecl')
            isValid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
        if (key == 'pid')
            isValid = /[0-9]{9}/g.test(value)

        if (!isValid)
            console.log(field);

        j += 1;
    }

    let keys = passport.map(x => x.split(':')[0]);
    let containsAll = keys.map(x => requiredFields.includes(x)).filter(x => x).length == requiredFields.length;

    if (containsAll && isValid)
        validCount += 1;
}
console.log("Part two, valid passports: " + validCount);
