import React, { useEffect, useState } from "react";

import { GoAlert } from "react-icons/go";
import { TodoInput } from "./TodoInput";
import { NavTab } from "./NavTab";
import { TodoList } from "./TodoList";

export const Accueil = () => {
  const [todo, setTodo] = useState("");
  const [todoTasks, setTodoTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("todo")) || [];
    setTodoTasks(tasks);
    if (todo.length >= 1) setErreur(false);
  }, [todo]);

  const addTask = (e) => {
    e.preventDefault();
    if (todo.trim() === "") return setErreur(true);

    const newTask = {
      id: new Date().getTime(),
      value: todo,
      status: "non_demarré",
      archived: false,
    };

    const updatedTasks = [newTask, ...todoTasks];
    setTodoTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
    setTodo("");
  };

  const handleDeleteTask = (taskId) => {
    const newTasks = todoTasks.filter((t) => t.id !== taskId);
    setTodoTasks(newTasks);
    localStorage.setItem("todo", JSON.stringify(newTasks));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = todoTasks.find((t) => t.id === taskId);
    setTodo(taskToEdit.value);
    setEditTaskId(taskToEdit.id);
    setEdit(true);
  };

  const handleTaskStatus = (taskId, newStatus) => {
    const updatedTasks = todoTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTodoTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
  };

  const handleArchiveTask = (taskId) => {
    const updatedTasks = todoTasks.map((task) => {
      if (task.id === taskId && task.status === "completed") {
        return { ...task, archived: true };
      }
      return task;
    });
    setTodoTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
  };

  const handleUnarchiveTask = (taskId) => {
    const updatedTasks = todoTasks.map((task) => {
      if (task.id === taskId && task.archived) {
        return { ...task, archived: false, status: "completed" };
      }
      return task;
    });
    setTodoTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
  };

  const handleSave = () => {
    const updatedTasks = todoTasks.map((task) => {
      if (task.id === editTaskId) {
        return { ...task, value: todo };
      }
      return task;
    });
    setTodoTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
    setTodo("");
    setEdit(false);
  };

  const handleCancel = () => {
    setTodo("");
    setEdit(false);
  };

  const filteredTasks = () => {
    switch (activeTab) {
      case "all":
        return todoTasks.filter((task) => !task.archived);
      case "non_demarré":
        return todoTasks.filter(
          (task) => task.status === "non_demarré" && !task.archived
        );
      case "active":
        return todoTasks.filter(
          (task) => task.status === "active" && !task.archived
        );
      case "completed":
        return todoTasks.filter(
          (task) => task.status === "completed" && !task.archived
        );
      case "archived":
        return todoTasks.filter((task) => task.archived);
      default:
        return todoTasks;
    }
  };

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
          <TodoInput
            todo={todo}
            setTodo={setTodo}
            addTask={addTask}
            edit={edit}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
          <NavTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <TodoList
          todoTasks={filteredTasks()}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleTaskStatus={handleTaskStatus}
          handleArchiveTask={handleArchiveTask}
          handleUnarchiveTask={handleUnarchiveTask}
        />
      </div>
    </div>
  );
};
