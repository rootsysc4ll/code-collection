class inputElement {
    constructor(element) {
        this.element = element;
        element.addEventListener('click', () => {
            messageTimer();
        });
    }
}
let timeoutDelayMS = 2000;
let messageContainerElement = document.querySelector('.js-message-container');
let clckButton = new inputElement(document.querySelector('.js-button'));
function messageTimer() {
    messageContainerElement.innerHTML = 'You clicked me!';
    setTimeout(() => {
        messageContainerElement.innerHTML = '';
    }, timeoutDelayMS);
}
class user {
    constructor(name, age, works, gender) {
        this.name = name;
        this.age = age;
        this.works = works;
        this.gender = gender;
    }
    getBornDate() {
        let currentTime = new Date();
        return (currentTime.getFullYear() - this.age);
    }
    helloMessage() {
        return `Hi! My name is ${this.name} and I'm ${this.age} years old.`;
    }
    get isWorking() {
        return this.works;
    }
    set isWorking(value) {
        this.works = value;
    }
    get sensitiveData() {
        return [this.works, this.gender];
    }
    set sensitiveData(data) {
        data.forEach((someData) => {
            if (typeof someData === 'boolean') {
                this.works = someData;
            }
            else if (typeof someData === 'string') {
                this.gender = someData;
            }
        });
    }
}
const loadingFactorPX = 20;
class inputButton {
    constructor(element) {
        this.element = element;
        element.addEventListener('click', () => {
            let temp = barProgress + loadingFactorPX;
            if (temp <= barWidth) {
                barProgress = temp;
                // Math.round((barProgress / barWidth) * 100)
                let progress = `${((barProgress / barWidth) * 100).toFixed(2)}%`;
                fillElement.style.width = progress;
                statusElement.innerHTML = progress;
                console.log(barProgress);
            }
            else {
                console.log('trying to exceed loading bar width');
            }
        });
    }
}
let barProgress = 0;
let fillElement = document.querySelector('.js-fill');
let barButton = new inputButton(document.querySelector('.js-loading-bar-button'));
let loadingBarElement = document.querySelector('.js-loading-bar');
let barWidth = parseInt(getComputedStyle(loadingBarElement).width.split('px')[0]);
let statusElement = document.querySelector('.js-status');
export {};
//# sourceMappingURL=main.js.map