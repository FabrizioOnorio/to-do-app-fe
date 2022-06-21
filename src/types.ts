export interface IList {
	listName: string;
	listId: string;
	items: ItodoItem[];
}

export interface ItodoItem {
  completed: boolean;
	itemName: string;
	itemId: string;
}
