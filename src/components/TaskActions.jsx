import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { GoAlert } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuArchiveRestore } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { PiArchiveBold, PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiProgress5Line } from "react-icons/ri";
import { useTaskContext } from "../context/TaskContext";

export const TaskActions = ({ task }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    handleEditTask,
    handleTaskStatus,
    handleArchiveTask,
    handleUnarchiveTask,
    handleDeleteTask,
  } = useTaskContext();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleStatusChange = (newStatus) => {
    handleTaskStatus(task.id, newStatus);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        className="pe-2 py-[3px] rounded-md flex items-center bg-bl/80 text-white border border-blc "
        onClick={toggleMenu}
      >
        <PiDotsThreeVerticalBold className="text-xl" /> Actions
      </button>
      {showMenu && (
        <div className="absolute right-0 bg-white shadow-lg rounded-lg p-4 z-20">
          {task.status === "non_demarré" && (
            <>
              <button
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-200 rounded-md"
                onClick={() => handleStatusChange("active")}
              >
                <RiProgress5Line className="text-xl text-orange" /> En cours
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-200 rounded-md"
                onClick={() => handleEditTask(task.id)}
              >
                <BiEditAlt className="text-xl text-blue-500" /> Modifier
              </button>
            </>
          )}
          {task.status === "active" && (
            <button
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-200 rounded-md"
              onClick={() => handleStatusChange("completed")}
            >
              <IoMdCheckmarkCircleOutline className="text-xl text-vr" /> Terminé
            </button>
          )}
          {task.status === "completed" && !task.archived && (
            <button
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-200 rounded-md"
              onClick={() => handleArchiveTask(task.id)}
            >
              <PiArchiveBold className="text-xl text-purple-500" />
              Archiver
            </button>
          )}
          {task.archived && (
            <button
              className="flex items-center gap-2 px-4 w-full py-2 hover:bg-gray-200 rounded-md"
              onClick={() => handleUnarchiveTask(task.id)}
            >
              <LuArchiveRestore className="text-xl text-purple-500" />
              Désarchiver
            </button>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-200 rounded-md"
            onClick={toggleModal}
          >
            <MdDeleteForever className="text-xl text-red-500" /> Supprimer
          </button>
        </div>
      )}

      {showModal && (
        <div className="absolute w-[280px] shadow-lg right-0 z-[200] p-3 bg-white rounded-xl">
          <GoAlert className="text-3xl text-rg text-center m-auto " />

          <p className="text-rg text-center font-">
            Vous êtes sûr de vouloir supprimer cette tâche ? Cette action est
            irreversible !
          </p>

          <div className="flex mt-4 gap-2">
            <button
              className="text-center gap-2 p-1 w-full bg-gray-200 rounded-md"
              onClick={toggleModal}
            >
              Annuler
            </button>
            <button
              className=" text-center gap-2 p-1 w-full bg-vr text-blc rounded-md"
              onClick={() => handleDeleteTask(task.id)}
            >
              Confirmer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
