export interface IList {
	listName: string;
	listId: string;
	items: ItodoItem[];
}

export interface ItodoItem {
	completed: boolean;
	itemName: string;
	itemId: string;
	subTasks: ISubTaskAdded[];
	totalCost: number;
  itemCost: number;
}

export interface ISubTaskAdded {
	subTaskName: string;
	subTaskId: string;
	completed: boolean;
	itemId: string;
  subTaskCost: number;
}
