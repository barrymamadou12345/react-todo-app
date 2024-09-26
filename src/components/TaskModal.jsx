import React from "react";

export const Modal = ({ show, onClose, children, title }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/30 z-50">
      <div className="bg-white rounded-lg w-[42%] max-xl:w-[60%] max-lg:w-[69%] max-md:w-[96%] max-h-[80vh] overflow-y-auto py-6 px-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-gray-500 mb-4">{children}</div>
        <div className="w-full justify-end flex">
          <button
            onClick={onClose}
            className="bg-bl text-white px-6 py-2 rounded-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
