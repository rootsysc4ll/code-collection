class inputElement {
    constructor(
        public element: HTMLButtonElement
    ) {
        element.addEventListener('click', () => {
            messageTimer();
        })
    }
}

let timeoutDelayMS: number = 2000;

let messageContainerElement = document.querySelector('.js-message-container') as HTMLParagraphElement

let clckButton = new inputElement(document.querySelector('.js-button') as HTMLButtonElement)

function messageTimer() {
    messageContainerElement.innerHTML = 'You clicked me!'
    setTimeout(() => {
        messageContainerElement.innerHTML = ''
    }, timeoutDelayMS);
}

type privateData = (boolean | string)

class user{
    constructor(
        public name:    string,
        public age:     number,
        private works:  boolean,
        private gender: string
    ) {}

    getBornDate(): number {
        let currentTime = new Date()

        return (currentTime.getFullYear() - this.age)
    }

    helloMessage(): string {
        return `Hi! My name is ${this.name} and I'm ${this.age} years old.`
    }

    get isWorking() {
        return this.works
    }

    set isWorking(value: boolean) {
        this.works = value
    }

    get sensitiveData() {
        return [this.works, this.gender]
    }

    set sensitiveData(data: privateData[]) {
        data.forEach((someData) => {
            if (typeof someData === 'boolean') {
                this.works = someData
            } else if (typeof someData === 'string') {
                this.gender = someData
            }
        })
    }
}

const loadingFactorPX: number = 20

class inputButton {
    constructor(
        public element: HTMLButtonElement
    ) {
        element.addEventListener('click', () => {
            let temp = barProgress + loadingFactorPX
            if (temp <= barWidth) {
                barProgress = temp
                // Math.round((barProgress / barWidth) * 100)
                let progress = `${((barProgress / barWidth) * 100).toFixed(2)}%`
                fillElement.style.width = progress

                statusElement.innerHTML = progress
                console.log(barProgress)
            } else {
                console.log('trying to exceed loading bar width')
            }
        })
    }
}

let loadingBarElement: HTMLDivElement = document.querySelector('.js-loading-bar') as HTMLDivElement
let barWidth: number = parseInt(getComputedStyle(loadingBarElement).width.split('px')[0] as string)

let barProgress: number = 0
let statusElement: HTMLDivElement = document.querySelector('.js-status') as HTMLDivElement

let fillElement: HTMLDivElement = document.querySelector('.js-fill') as HTMLDivElement

let barButton = new inputButton(document.querySelector('.js-loading-bar-button') as HTMLButtonElement)