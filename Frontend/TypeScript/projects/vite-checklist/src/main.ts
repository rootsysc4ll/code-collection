import './styles/style.css'
import ListItem from './model/ListItem'
import FullList from './model/FullList'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const fullList = FullList.instance
    const template = ListTemplate.instance

    let itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
    itemEntryForm.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault()

        const input = document.getElementById('newItem') as HTMLInputElement
        const newEntryText: string = input.value.trim()
        input.value = ''
        if (!newEntryText) return 
        
        const newItemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1

        const newItem = new ListItem(newItemId.toString(), newEntryText)
        fullList.add(newItem)
        template.render(fullList)
    })

    const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement
    clearItems.addEventListener('click', () => {
        fullList.clear()
        template.clear()
    })

    fullList.load()
    template.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)