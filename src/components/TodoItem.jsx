import React, { useState } from "react";
import { RiProgress5Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TaskActions } from "./TaskActions";

export const TodoItem = ({
  task,
  handleDeleteTask,
  handleEditTask,
  handleTaskStatus,
  handleArchiveTask,
  handleUnarchiveTask,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  let taskBackgroundColor = "bg-white border border-gray-300";
  let iconColor = " text-gray-300";
  if (task.status === "active") {
    taskBackgroundColor = " bg-white border border-orange/50";
    iconColor = " text-orange";
  } else if (task.status === "completed") {
    taskBackgroundColor = " bg-white border border-vr/50";
    iconColor = " hidden";
  }
  if (task.archived) {
    taskBackgroundColor = " bg-rg/10 border border-vr/30";
  }

  return (
    <div
      className={`flex ${taskBackgroundColor} ps-2 pe-3 py-2 mt-3 rounded-md relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RiProgress5Line className={`mt-2 me-2 ${iconColor}`} />
      {task.status === "completed" && (
        <IoMdCheckmarkCircleOutline className={`mt-2 me-2 text-vr`} />
      )}
      <li
        className={`text-gray-500 w-full text-lg font- break-words ${task.status === "completed" ? "line-through" : ""}`}
      >
        {task.value}
      </li>
      {isHovered && (
        <div className="absolute inset-0 flex items-start justify-end bg-black bg-opacity-10 rounded-md">
          <TaskActions
            task={task}
            handleEditTask={handleEditTask}
            handleTaskStatus={handleTaskStatus}
            handleArchiveTask={handleArchiveTask}
            handleUnarchiveTask={handleUnarchiveTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      )}
    </div>
  );
};
