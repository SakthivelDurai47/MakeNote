import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  Loader2,
  Sparkles,
  X,
  Eye,
  FileEdit,
} from "lucide-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import apiUrl from "../lib/axios";
import { themeSetter } from "../lib/theme";

function CreatePage() {
  themeSetter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dynamic Workspace Focus States (Notion / Obsidian Hybrid Mode)
  const [isEditing, setIsEditing] = useState(true);
  const textareaRef = useRef(null);

  const navigate = useNavigate();

  // Convert stats on the fly
  const stats = useMemo(() => {
    const charCount = content.length;
    const words =
      content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { charCount, words, readingTime };
  }, [content]);

  // Handle Inline Tag Creation
  const handleTagKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const cleanTag = tagInput.trim().replace(/,/g, "");

      if (cleanTag && !tagsArray.includes(cleanTag)) {
        setTagsArray([...tagsArray, cleanTag]);
      }
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput && tagsArray.length > 0) {
      // Remove last tag if backspacing into an empty field
      setTagsArray(tagsArray.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove) => {
    setTagsArray(tagsArray.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields must be filled.");
      return;
    }

    setLoading(true);

    try {
      await apiUrl.post("/notes", {
        title,
        content,
        tags: tagsArray,
      });

      toast.success("Note Created!");
      navigate("/home");
    } catch (e) {
      if (e.response?.status === 429) {
        toast.error("Too Many Requests! Slow Down.");
      } else {
        toast.error("Couldn't create note.");
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  // Automatically focus input when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const placeholderText = `# Today's Notes\n\nClick anywhere inside this block to write. Click outside or use the mode switcher toggle to see rich rendering live.\n\nMarkdown Syntax Guide:\n- Use # for Header 1\n- Use ## for Header 2\n- **Bold text** or *Italics*\n- \`code blocks\``;

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col antialiased selection:bg-primary/20">
      {/* Sticky Premium Header */}
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

            {/* Live Mode Toggle Switcher */}
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

          <div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-primary btn-sm px-5 rounded-xl shadow-sm hover:shadow transition-all font-medium gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>Create Note</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Single Composition Workspace */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 pt-12 pb-24 flex flex-col gap-6">
        {/* Title Input Block */}
        <div className="w-full">
          <input
            type="text"
            className="input input-ghost w-full text-4xl sm:text-5xl font-bold p-0 tracking-tight placeholder:opacity-50 focus:bg-transparent focus:outline-none border-none text-base-content h-auto"
            placeholder="Add a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        {/* Premium Unified Tag Field */}
        <div className="w-full flex flex-wrap items-center gap-2 py-1 border-b border-base-content/5 focus-within:border-primary/30 transition-colors">
          {tagsArray.map((tag, index) => (
            <span
              key={index}
              className="badge bg-base-content/5 text-primary border border-base-content/10 rounded-md font-medium pl-2.5 pr-1 py-3 text-xs tracking-wide flex items-center gap-1 group transition-all"
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
            className="input input-ghost flex-1 min-w-50 p-0 h-7 text-sm font-mono focus:bg-transparent focus:outline-none border-none text-base-content/80 "
            placeholder={
              tagsArray.length === 0
                ? "Add tags (press space or comma to confirm)..."
                : "Add tag..."
            }
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
        </div>

        {/* Focus Sandbox Environment */}
        <div className="w-full mt-4 min-h-[60vh]">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              className="w-full min-h-[60vh] bg-transparent resize-none font-mono text-[16px] leading-relaxed placeholder:text-base-content/30 focus:outline-none border-none text-base-content/90 p-0"
              placeholder={placeholderText}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={(e) => {
                // Smooth switch to preview if user clicks fully outside canvas elements
                if (e.relatedTarget === null && content.trim().length > 0) {
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="w-full min-h-[60vh] cursor-text rounded-xl hover:bg-base-200/10 transition-colors p-1"
            >
              {content.trim() ? (
                <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-primary prose-pre:bg-base-200 prose-pre:text-base-content prose-img:rounded-xl">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {content}
                  </ReactMarkdown>
                </article>
              ) : (
                <div className="py-20 flex flex-col items-center text-base-content/20 select-none">
                  <Eye className="size-8 stroke-[1.5] mb-2" />
                  <p className="text-sm font-medium">
                    Workspace Empty. Click to Write.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Persistent Live Stats Status Bar */}
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
          </div>
          <div className="hidden sm:flex items-center gap-1.5 opacity-80 font-mono tracking-tight">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-success"></span>
            Live Render Workspace Active
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CreatePage;
