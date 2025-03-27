/**
 * Represents an item in the list.
 * @template T - The type of the metadata.
 */
export interface ListItem<T>
{
    id: string;
    metadata: T;
}

/**
 * Interface for a generic list.
 * @template U - The type of the items in the list.
 */
export interface IList<U>
{
    items: ListItem<U>[];
    add (item: U, position?: number, onAdd?: (item?: U) => void): U[] | null;
    remove (position: number, onRemove?: (item?: U) => void): U[] | null;
    update (items: ListItem<U>[]): void;
    clear (): void;
}

/**
 * Constructor parameters for the List class.
 * @template T - The type of the items in the list.
 */
export type IListConstructor<T> = {
    items?: T[];
    onUpdate?: (list: List<T>, item?: T) => void;
};

/**
 * A generic list class that implements the IList interface.
 * @template V - The type of the items in the list.
 */
export class List<V> implements IList<V>
{
    #onUpdate: ((list: List<V>, item?: V) => void) | null = null;

    public items: ListItem<V>[] = [];

    /**
     * Constructor for the List class.
     * @param params - The constructor parameters.
     */
    constructor({ items, onUpdate }: IListConstructor<V>)
    {
        if (items)
        {
            this.items = items.map(item => ({ id: List.generateId(), metadata: item }));
        }

        if (onUpdate)
        {
            this.#onUpdate = onUpdate;
        }
    }

    /**
     * Updates the list with new items.
     * @param items - The new items to update the list with.
     */
    public update (items: ListItem<V>[]): void
    {
        this.items = items;
        if (this.#onUpdate)
        {
            this.#onUpdate(this);
        }
    }

    /**
     * Adds a new item to the list at the specified position.
     * @param item - The item to add.
     * @param position - The position to add the item at.
     * @param onAdd - Optional callback to execute after adding the item.
     * @returns The updated list of items.
     */
    public add (item: V, position?: number, onAdd?: (item?: V) => void): V[] | null
    {
        const newItem: ListItem<V> = { id: List.generateId(), metadata: item };
        if (position !== undefined && position >= 0 && position < this.items.length)
        {
            this.items.splice(position, 0, newItem);
        } else
        {
            this.items.push(newItem);
        }

        if (this.#onUpdate)
        {
            this.#onUpdate(this);
        }

        if (onAdd)
        {
            onAdd(item);
        }
        return this.items.map(i => i.metadata);
    }

    /**
     * Removes an item from the list at the specified position.
     * @param position - The position of the item to remove.
     * @param onRemove - Optional callback to execute after removing the item.
     * @returns The updated list of items.
     */
    public remove (position: number, onRemove?: (item?: V) => void): V[] | null
    {
        const index = this.items.findIndex(item => item.metadata === this.items[position].metadata);
        if (index !== -1)
        {
            const [removedItem] = this.items.splice(index, 1);

            if (this.#onUpdate)
            {
                this.#onUpdate(this);
            }

            if (onRemove)
            {
                onRemove(removedItem.metadata);
            }
            return this.items.map(i => i.metadata);
        }
        return null;
    }

    /**
     * Clears all items from the list.
     */
    public clear (): void
    {
        this.items = [];
    }

    /**
     * Generates a unique ID.
     * @returns A unique ID string.
     */
    public static generateId (): string
    {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}