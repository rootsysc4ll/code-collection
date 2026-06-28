import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement
    render(fullList: FullList): void 
    clear(): void
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate()
    
    private constructor() {
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = '';    
    }

    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item => {
            const li: HTMLLIElement = document.createElement('li')
            li.className = 'item'
            
            const input: HTMLInputElement = document.createElement('input')
            input.type = 'checkbox'
            input.id = item.id
            input.tabIndex = 0
            input.checked = item.checked
            li.append(input)
            input.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })


            const label: HTMLLabelElement = document.createElement('label')
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button: HTMLButtonElement = document.createElement('button')
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click', () => {
                fullList.remove(item.id)
                this.render(fullList)
            })

            this.ul.append(li)
        })
    }
}