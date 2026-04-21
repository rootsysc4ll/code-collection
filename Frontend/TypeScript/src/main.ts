type someType = Record<('string1' | 'string2' | 'string3'), number>

let myObj: someType = {
    string1: 1,
    string2: 2,
    string3: 3
}

console.log(myObj)

let key: string = 'string1' 
myObj[key as keyof someType] = 11

console.log(myObj)

interface Student {
    [key: string]: string | number
    name: string
    gpa: number
    grade: string
}

let Kole: Student = {
    name: 'Kole',
    gpa: 450,
    grade: '12th',
}

console.log(Kole)

let logKey = (student: Student): void => {
    for (const key in student) {
        console.log(key)
    }
}
let logValue = (student: Student): void => {
    for (const key in student) {
        //console.log(student[key as keyof typeof student])
        console.log(student[key])
    }
}

logKey(Kole)
logValue(Kole)

let prop:number = 1
console.log(Kole[prop])

let arr = [1, 1, 'sskk']

arr[1] = 'aa'

console.log(arr)