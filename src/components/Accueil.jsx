import React from "react";
import { GoAlert } from "react-icons/go";
import { TodoInput } from "./TodoInput";
import { NavTab } from "./NavTab";
import { TodoList } from "./TodoList";
import { useTaskContext } from "../context/TaskContext";

export const Accueil = () => {
  const { erreur, filteredTasks } = useTaskContext();

  return (
    <div className="p-4 ">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col pt-3 w-full items-center justify-center fixed top-0 z-10 bg-gray-100">
          <h1 className="text-bl text-2xl">Gestionaire de tâches</h1>
          {erreur && (
            <div className=" animate-pulse transition-all duration-700 w-[43%] max-xl:w-[63%] max-lg:w-[70%] max-md:w-[96%] py-4 bg-rg/15 flex  text-rg rounded-lg italic text-center items-center justify-center gap-3 text-xl">
              <GoAlert className="text-3xl " />
              Veuillez saisir le titre de la tâche avant de soumettre !
            </div>
          )}
          <TodoInput />
          <NavTab />
        </div>
        <TodoList todoTasks={filteredTasks()} />
      </div>
    </div>
  );
};
