import React, { useState } from "react";
import { Trash2, Calendar, Tag, Pin, PinOff } from "lucide-react";
import { Link } from "react-router";
import { formateDate } from "../lib/utils";
import apiUrl from "../lib/axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

function NoteCard({ note, setNotes, notes }) {
  const [isPinned, setIsPinned] = useState(note.pinned);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await apiUrl.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }
  };

  const handlePin = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsPinned((prev) => !prev);
      const { data: updatedNote } = await apiUrl.patch(`/notes/${id}/pin`);
      setNotes(
        notes
          .map((note) => (note._id === updatedNote._id ? updatedNote : note))
          .sort((a, b) => {
            if (a.pinned !== b.pinned) {
              return b.pinned - a.pinned;
            }
          }),
      );

      toast.success("Note Updated!");
    } catch (e) {
      setIsPinned((prev) => !prev);
      console.error(e);
      toast.error("Failed to pin/unpin note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative flex flex-col justify-between min-h-70 sm:min-h-75 bg-base-200/40 hover:bg-base-200/80 border border-base-content/5 hover:border-base-content/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 ease-out shadow-sm hover:shadow-md"
    >
      {/* Absolute Hover Action Icon */}
      <div className="  absolute top-4 right-4 opacity-60 group-hover:opacity-80 transition-opacity duration-300 text-base-content ">
        <button
          onClick={(e) => handlePin(e, note._id)}
          title={isPinned ? "Unpin Note" : "Pin Note"}
        >
          {isPinned ? (
            <PinOff className="size-4 text-primary font-bold" />
          ) : (
            <Pin className="size-4" />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Title */}
        <h2 className="text-xl font-bold tracking-tight text-base-content/90 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {note.title || "Untitled Note"}
        </h2>

        {/* Minimalist Tags Row (Nested nicely under the header) */}
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-[11px] font-medium tracking-wide bg-base-content/5 text-primary rounded-md px-2 py-0.5"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-[11px] font-mono text-base-content/40 pl-1">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Premium Markdown Preview Panel */}
        <div className="relative mt-1 overflow-hidden">
          <div
            className="
              prose
              prose-xs
              sm:prose-sm
              max-w-none
              max-h-24 sm:max-h-28
              overflow-hidden
              pointer-events-none
              select-none
              opacity-80
              group-hover:opacity-100
              transition-opacity
              duration-300

              prose-headings:my-1
              prose-headings:text-base-content
              prose-headings:font-bold
              prose-headings:text-sm

              prose-p:my-0.5
              prose-p:leading-relaxed
              prose-p:text-base-content

              prose-ul:my-1
              prose-ol:my-1
              prose-li:my-0

              prose-blockquote:my-1
              prose-blockquote:border-primary/40
              prose-blockquote:pl-3

              prose-pre:my-1
              prose-pre:bg-base-content/5
              prose-pre:p-2
              prose-pre:rounded-md

              prose-code:text-primary
              prose-code:before:content-none
              prose-code:after:content-none
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-sm font-bold">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xs font-semibold">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xs font-medium">{children}</h3>
                ),
                img: () => (
                  <span className="inline-flex items-center text-xs opacity-50 bg-base-content/5 px-1.5 py-0.5 rounded gap-1">
                    <Tag className="size-3" /> Image
                  </span>
                ),
                pre: ({ children }) => (
                  <pre className="text-xs font-mono opacity-80">{children}</pre>
                ),
                code: ({ children }) => (
                  <code className="text-xs font-mono font-medium">
                    {children}
                  </code>
                ),
                table: () => (
                  <span className="text-xs opacity-40">[Table Component]</span>
                ),
                hr: () => null,
              }}
            >
              {note.content}
            </ReactMarkdown>
          </div>

          {/* Premium Fade Out Shutter Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-base-100 group-hover:from-base-200/80 via-transparent to-transparent pointer-events-none transition-colors duration-300" />
        </div>
      </div>

      {/* Simplified, Clean Footer Workspace */}
      <div className="mt-4 pt-3 border-t border-base-content/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-base-content/40 font-medium">
          <Calendar className="size-3" />
          <span className="truncate">
            {formateDate(new Date(note.createdAt))}
          </span>
        </div>

        {/* Minimal Context Action Block */}
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-xl text-base-content/30 hover:text-error hover:bg-error/10 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={(e) => handleDelete(e, note._id)}
            title="Delete Document"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
