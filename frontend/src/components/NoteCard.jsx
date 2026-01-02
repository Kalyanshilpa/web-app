import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {note.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {note.description}
      </p>

      <div className="flex justify-end gap-3">
        <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"  onClick={() => onEdit(note)} >
          <FaEdit />
        </button>

        <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition" onClick={() => deleteNote(note._id) }>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
