import React from "react";

const Modal = ({ isOpen, onClose, blog, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] text-white rounded-lg w-11/12 md:w-1/2 p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            ✕
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="mb-6 overflow-y-auto overflow-x-hidden" style={{ maxHeight: "60vh" }}>
          <p className="text-gray-300 leading-relaxed break-words">{blog.content}</p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
