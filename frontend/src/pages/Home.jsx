import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";
import { useAuth } from "../context/ContextProvider";

const Home = () => {
  const { user, loading } = useAuth();

  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNote] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  
  useEffect(() => {
    if (!user) {
      setNotes([]);          
      setFilteredNote([]);
      return;
    }
    fetchNotes();
  }, [user]);

  
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredNote(notes);
    } else {
      setFilteredNote(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(
        "https://web-app-backend-5134.onrender.com/api/note",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes(data.notes || []);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setCurrentNote(null);
    setModelOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "https://web-app-backend-5134.onrender.com/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Note Added");
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `https://web-app-backend-5134.onrender.com/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Note Deleted");
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `https://web-app-backend-5134.onrender.com/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Note Updated");
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ✅ Prevent flicker on refresh */
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 text-xl">
        Loading...
      </p>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      {/* ✅ USER NOT LOGGED IN */}
      {!user ? (
        <p className="text-center mt-10 text-gray-500 text-2xl">
          Please login to view your notes
        </p>
      ) : (
        <>
          <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={onEdit}
                  deleteNote={deleteNote}
                />
              ))
            ) : (
              <p className="text-gray-500 text-2xl">No notes</p>
            )}
          </div>

          {/* ✅ Add Note Button */}
          <button
            onClick={() => setModelOpen(true)}
            className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
          >
            +
          </button>
        </>
      )}

      {isModelOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
