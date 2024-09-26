import React from 'react'
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export const TodoInput = ({
  todo,
  setTodo,
  addTask,
  edit,
  handleSave,
  handleCancel,
}) => {
  return (
    <div className="flex gap-3 w-[43%] relative max-xl:w-[60%] max-lg:w-[70%] max-md:w-[96%] justify-center mt-4 items-center pb-6">
      <textarea
        type="text"
        rows={3}
        className={`border border-bl/20 text-gray-500 text-lg pe-24 scroll-px-8 w-full resize-none p-2 outline-vr rounded-lg`}
        value={todo}
        placeholder="Ajouter une nouvelle tâche"
        onChange={(e) => setTodo(e.target.value)}
      ></textarea>
      {edit ? (
        <div className="absolute bottom-9 right-5 gap-2 flex">
          <button
            onClick={handleSave}
            className="px-2 py-2 bg-vr/20 text-vr rounded-lg"
          >
            <FaCheck />
          </button>
          <button
            onClick={handleCancel}
            className="px-2 py-2 bg-rg/20 text-rg rounded-lg"
          >
            <FaXmark />
          </button>
        </div>
      ) : (
        <button
          onClick={addTask}
          className="px-6 py-2 absolute right-1 hover:scale-[95%] transition-all duration-500 bg-bl bottom-7 text-white rounded-lg"
        >
          Ajouter
        </button>
      )}
    </div>
  );
};
