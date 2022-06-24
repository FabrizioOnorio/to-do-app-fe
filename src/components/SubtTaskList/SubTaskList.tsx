import React from "react";
import { ISubTaskAdded, ItodoItem } from "../../types";
import SubTask from "../Subtask/SubTask";

interface ISubTaskListProps {
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
	todoItem: ItodoItem;
	selectedListId: string | undefined;
}

const SubTaskList = ({
	setTodoLists,
	todoItem,
	selectedListId,
}: ISubTaskListProps) => {
	return (
		<>
			{todoItem.subTasks?.map((subTask: ISubTaskAdded) => {
				return (
					<SubTask
						key={subTask.subTaskId}
						subTask={subTask}
						setTodoLists={setTodoLists}
						todoItem={todoItem}
						selectedListId={selectedListId}
					/>
				);
			})}
		</>
	);
};

export default SubTaskList;
