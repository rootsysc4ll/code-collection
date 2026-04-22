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

function logType<T>(arg: T): void {
    console.log(typeof arg) 
}

logType({a: 'ddd', 1: true})

class GenericClass<Type> {
    constructor(
        private data: Type
    ) {}

    get value(): Type {
        return this.data
    }
    
    set value(arg: Type) {
        this.data = arg
    }
}

interface User { 
    username: string
    age: number
    id: string
    subscribed: boolean
}

let John = new GenericClass<User>({
    username: 'John',
    age: 21,
    id: '1112dsfsddsgsag4t3tedfsva',
    subscribed: false
})

John.value = {
    username: 'saggga',
    age: 21,
    id: '1112dsfsddsgsag4t3tedfsva',
    subscribed: false
}

console.log(John)

////////////////////////////////////////////////////////////

//ts-answer-container ---> change border
//ts-answer-button ---> change text and background color
//ts-answer-text-container ---> add the (ts-answer-text) 

interface StyleStateBefore {
    container: string
    revealButton: string
}

interface AnswerElementInterface {
    container: HTMLDivElement
    revealButton: HTMLDivElement
    textContainer: HTMLDivElement
    index: number
}
class AnswerElement implements AnswerElementInterface {
    constructor(
        public container: HTMLDivElement,
        public revealButton: HTMLDivElement,
        public textContainer: HTMLDivElement,
        public index: number
    ) {
        revealButton.addEventListener('click', () => {
            console.log('clicked')
            if (isShowingAnsw) {
                container.style.border = before.container
                revealButton.style.backgroundColor = before.revealButton
                revealButton.innerHTML = 'Show answer'
                textContainer.innerHTML = ''

                isShowingAnsw = false
            } else {
                container.style.border = onHideBorder
                revealButton.style.backgroundColor = onHideBackgroundColor
                revealButton.innerHTML = 'Hide answer'
                textContainer.innerHTML += answerText[index]

                isShowingAnsw = true
            }
        })
    }
}

function getAnswerElements(): AnswerElement[] {
    let accumulator: AnswerElement[] = []

    Array.from(document.querySelectorAll('.ts-question-card-container')).forEach((element, index) => {
        accumulator.push(new AnswerElement(
            element.querySelector('.ts-answer-container') as HTMLDivElement,
            element.querySelector('.ts-answer-button') as HTMLDivElement,
            element.querySelector('.ts-answer-text-container') as HTMLDivElement,
            index
        ))
    })

    return accumulator
}

let answerElements: AnswerElement[] = getAnswerElements()
let before: StyleStateBefore = {
    container: answerElements[0]!.container.style.border,
    revealButton: answerElements[0]!.revealButton.style.backgroundColor
}

let answerText: Array<string> = []
let answer = ['fassgsdgmklgjgjgprjhijreqhkeihj', 'Answer Text', 'sghdhdhhs', 'fngfsnjdnjndklhndskhn4123285921562567'] // assuming 4 elements
answer.forEach((element) => {
    answerText.push(`<div class="answer-text">${element}</div>`)
})

let onHideBackgroundColor = 'rgb(90, 197, 255)'
let onHideBorder = `border: ${onHideBackgroundColor} solid 2px;`
let isShowingAnsw = false