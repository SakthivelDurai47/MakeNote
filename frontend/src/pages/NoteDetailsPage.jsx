import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import apiUrl from "../lib/axios";
import toast from "react-hot-toast";

import {
  Loader2,
  ArrowLeftIcon,
  Trash2,
  Sparkles,
  X,
  Eye,
  FileEdit,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { themeSetter } from "../lib/theme";

function NoteDetailsPage() {
  themeSetter();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Controls inline edit vs preview toggle (Defaults to preview mode for reading first)
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await apiUrl.get(`/notes/${id}`);
        setNote(res.data);
      } catch (e) {
        toast.error("Couldn't fetch note.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Focus textarea when clicking into edit canvas
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  // Dynamic Live Stats Tracking
  const stats = useMemo(() => {
    if (!note || !note.content)
      return { charCount: 0, words: 0, readingTime: 1 };
    const charCount = note.content.length;
    const words =
      note.content.trim() === "" ? 0 : note.content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { charCount, words, readingTime };
  }, [note?.content]);

  // Inline Tag Field Event Handlers
  const handleTagKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const cleanTag = tagInput.trim().replace(/,/g, "");
      const currentTags = note.tags || [];

      if (cleanTag && !currentTags.includes(cleanTag)) {
        setNote({
          ...note,
          tags: [...currentTags, cleanTag],
        });
      }
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput && note.tags?.length > 0) {
      setNote({
        ...note,
        tags: note.tags.slice(0, -1),
      });
    }
  };

  const removeTag = (indexToRemove) => {
    setNote({
      ...note,
      tags: note.tags.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await apiUrl.delete(`/notes/${id}`);
      toast.success("Note deleted.");
      navigate("/home");
    } catch (e) {
      toast.error("Failed to delete note.");
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    setSaving(true);

    try {
      await apiUrl.put(`/notes/${id}`, note);
      toast.success("Note updated.");
      navigate("/home");
    } catch (e) {
      toast.error("Couldn't update note.");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary/70" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col antialiased selection:bg-primary/20">
      {/* Premium Sticky Control Header */}
      <header className="sticky top-0 z-30 w-full border-b border-base-content/5 bg-base-100/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/home"
              className="btn btn-ghost btn-sm gap-2 hover:bg-base-content/10 rounded-lg text-base-content/70"
            >
              <ArrowLeftIcon className="size-4" />
              <span className="hidden sm:inline font-medium text-sm">Back</span>
            </Link>

            <div className="h-4 w-px bg-base-content/10"></div>

            {/* Split Mode Selector */}
            <div className="bg-base-200 p-1 rounded-xl flex border border-base-content/5">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className={`btn btn-xs border-none shadow-none rounded-lg gap-1.5 px-3 transition-all ${
                  isEditing
                    ? "bg-base-100 text-base-content"
                    : "bg-transparent text-base-content/40 hover:text-base-content"
                }`}
              >
                <FileEdit className="size-3" /> Edit
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={`btn btn-xs border-none shadow-none rounded-lg gap-1.5 px-3 transition-all ${
                  !isEditing
                    ? "bg-base-100 text-base-content"
                    : "bg-transparent text-base-content/40 hover:text-base-content"
                }`}
              >
                <Eye className="size-3" /> Preview
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-sm text-base-content/40 hover:text-error hover:bg-error/10 px-3 rounded-xl transition-all"
              title="Delete Note"
            >
              <Trash2 className="size-4" />
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary btn-sm px-5 rounded-xl shadow-sm hover:shadow transition-all font-medium gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>Save Note</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Single Canvas Workspace */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 pt-12 pb-24 flex flex-col gap-6">
        {/* Title Workspace Input */}
        <div className="w-full">
          <input
            type="text"
            className="input input-ghost w-full text-4xl sm:text-5xl font-bold p-0 tracking-tight placeholder:opacity-20 focus:bg-transparent focus:outline-none border-none text-base-content h-auto"
            placeholder="Untitled Note"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>

        {/* Unified Pill-Tag Container Component */}
        <div className="w-full flex flex-wrap items-center gap-2 py-1 border-b border-base-content/5 focus-within:border-primary/30 transition-colors">
          {(note.tags || []).map((tag, index) => (
            <span
              key={index}
              className="badge bg-base-content/5 text-primary/80 border border-base-content/10 rounded-md font-medium pl-2.5 pr-1 py-3 text-xs tracking-wide flex items-center gap-1 transition-all"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="p-0.5 rounded-md text-base-content/40 hover:text-error hover:bg-error/10 transition-colors"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}

          <input
            type="text"
            className="input input-ghost flex-1 min-w-[200px] p-0 h-7 text-sm font-mono focus:bg-transparent focus:outline-none border-none text-base-content "
            placeholder={
              (note.tags || []).length === 0
                ? "Add tags (press space or comma)..."
                : "Add tag..."
            }
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
        </div>

        {/* Intersecting Content Panel */}
        <div className="w-full mt-4 min-h-[60vh]">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              className="w-full min-h-[60vh] bg-transparent resize-none font-mono text-[16px] leading-relaxed placeholder:text-base-content/20 focus:outline-none border-none text-base-content/90 p-0"
              placeholder="Write something beautiful..."
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              onBlur={(e) => {
                // Return to preview smoothly if clicking off structural page boundaries
                if (
                  e.relatedTarget === null &&
                  note.content.trim().length > 0
                ) {
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="w-full min-h-[60vh] cursor-text rounded-xl hover:bg-base-200/10 transition-colors p-1"
            >
              {note.content.trim() ? (
                <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-primary prose-pre:bg-base-200 prose-pre:text-base-content prose-img:rounded-xl">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {note.content}
                  </ReactMarkdown>
                </article>
              ) : (
                <div className="py-20 flex flex-col items-center text-base-content/20 select-none">
                  <Eye className="size-8 stroke-[1.5] mb-2" />
                  <p className="text-sm font-medium">
                    This note is empty. Click to add your logs.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Floating Meta Stats Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-base-content/5 bg-base-100/90 backdrop-blur-md px-6 py-2.5 text-xs text-base-content/50 font-medium">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span>
              Chars:{" "}
              <strong className="text-base-content/80 font-semibold">
                {stats.charCount}
              </strong>
            </span>
            <span className="w-1 h-1 rounded-full bg-base-content/20"></span>
            <span>
              Words:{" "}
              <strong className="text-base-content/80 font-semibold">
                {stats.words}
              </strong>
            </span>
            <span className="w-1 h-1 rounded-full bg-base-content/20"></span>
            <span>
              Reading Time:{" "}
              <strong className="text-base-content/80 font-semibold">
                {stats.readingTime} min
              </strong>
            </span>
            {note.createdAt && (
              <>
                <span className="w-1 h-1 rounded-full bg-base-content/20"></span>
                <span className="opacity-80">
                  Saved:{" "}
                  {new Date(note.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-1.5 opacity-80 font-mono tracking-tight">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-info"></span>
            Synced Workspace View
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NoteDetailsPage;
