let myObj = {
    string1: 1,
    string2: 2,
    string3: 3
};
console.log(myObj);
let key = 'string1';
myObj[key] = 11;
console.log(myObj);
let Kole = {
    name: 'Kole',
    gpa: 450,
    grade: '12th',
};
console.log(Kole);
let logKey = (student) => {
    for (const key in student) {
        console.log(key);
    }
};
let logValue = (student) => {
    for (const key in student) {
        //console.log(student[key as keyof typeof student])
        console.log(student[key]);
    }
};
logKey(Kole);
logValue(Kole);
let prop = 1;
console.log(Kole[prop]);
let arr = [1, 1, 'sskk'];
arr[1] = 'aa';
console.log(arr);
export {};
//# sourceMappingURL=main.js.map