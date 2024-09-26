import React, { useState } from "react";
import {TaskActions} from "./TaskActions";
import { RiProgress5Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTaskContext } from "../context/TaskContext";
import { Modal } from "./TaskModal";
import { FaEye } from "react-icons/fa";

 export const TodoItem = ({ task }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { handleTaskStatus } = useTaskContext();

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

  const truncateText = (text, lines = 4) => {
    const lineHeight = 50; 
    const maxHeight = lineHeight * lines;
    if (text.length > maxHeight) {
      return text.slice(0, maxHeight) + " .......";
    }
    return text;
  };

  return (
    <>
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
          className={`text-gray-500 w-full text-lg font- break-words ${
            task.status === "completed" ? "line-through" : ""
          }`}
        >
          {truncateText(task.value)}
        </li>
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-md">
            <div className="flex w-full justify-end">
              <TaskActions task={task} />
            </div>
            <div className="bottom-0 right-0 absolute">
              {task.value.length > 300 && (
                <button
                  className="text-blc bg-vr/50 flex items-center gap-2 px-3 rounded-md py-1 bg- ml-2"
                  onClick={() => setShowModal(true)}
                >
                  <FaEye className="text-lg" />
                  Voir toute la tâche
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Détails de la tâche"
      >
        {task.value}
      </Modal>
    </>
  );
};
