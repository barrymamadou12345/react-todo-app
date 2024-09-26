import React, { createContext, useState, useEffect, useContext } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
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
    <TaskContext.Provider
      value={{
        todo,
        setTodo,
        todoTasks,
        setTodoTasks,
        edit,
        setEdit,
        editTaskId,
        setEditTaskId,
        activeTab,
        setActiveTab,
        erreur,
        setErreur,
        addTask,
        handleDeleteTask,
        handleEditTask,
        handleTaskStatus,
        handleArchiveTask,
        handleUnarchiveTask,
        handleSave,
        handleCancel,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
