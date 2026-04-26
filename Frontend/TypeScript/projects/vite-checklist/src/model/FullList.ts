import ListItem from "./ListItem";

const localStorageKey = 'List'

interface List {
    list: ListItem[]
    save(): void
    load(): void
    clear(): void
    add(itemObj: ListItem): void
    remove(id: string): void
}

export default class FullList implements List {
    static instance: FullList = new FullList()

    protected constructor( private _list: ListItem[] = [] ) {}

    get list(): ListItem[] {
        return this._list
    }

    save(): void {
        localStorage.setItem(localStorageKey, JSON.stringify(this.list))
    }

    load(): void {
        const stringObj: string | null = localStorage.getItem(localStorageKey)
        if (typeof stringObj === null) return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(stringObj)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)

            FullList.instance.add(newListItem)  
        })
    }

    clear(): void {
        this._list = []
        this.save()
    }

    add(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    remove(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}