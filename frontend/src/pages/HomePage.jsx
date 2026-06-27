import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimited from "../components/RateLimited";
import apiUrl from "../lib/axios.js";
import toast from "react-hot-toast";
import NoteNotFound from "../components/NoteNotFound";
import { themeSetter } from "../lib/theme.js";

function HomePage() {
  themeSetter();

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await apiUrl.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load Notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center true-primary py-10">
            {" "}
            Loading Notes...
          </div>
        )}
        {notes.length === 0 && !isRateLimited && <NoteNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
