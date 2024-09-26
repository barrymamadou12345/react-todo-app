import React from 'react'
import { TodoItem } from './TodoItem';
import { PiSmileyXEyesThin } from "react-icons/pi";


export const TodoList = ({
  todoTasks,
  handleDeleteTask,
  handleEditTask,
  handleTaskStatus,
  handleArchiveTask,
  handleUnarchiveTask,
}) => {
  return (
    <ul className=" w-[43%] relative max-xl:w-[60%] max-lg:w-[70%] max-md:w-[96%] mt-[235px] ">
      {todoTasks.length === 0 ? (
        <div className="text-center mt-3 text-2xl border border-gr py-14 rounded-lg text-gray-400">
          <PiSmileyXEyesThin className="text-8xl m-auto text-gray-400" />
          Aucune tâche à afficher !
        </div>
      ) : (
        todoTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            handleTaskStatus={handleTaskStatus}
            handleArchiveTask={handleArchiveTask}
            handleUnarchiveTask={handleUnarchiveTask}
          />
        ))
      )}
    </ul>
  );
};
