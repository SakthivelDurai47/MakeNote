import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import apiUrl from "../lib/axios";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields must be filled");
      return;
    }
    setLoading(true);
    try {
      await apiUrl.post("/notes", {
        title,
        content,
      });
      toast.success("Note Created!");
      navigate("/");
    } catch (e) {
      if (e.response.status === 429) {
        toast.error("Too Many Requests! Slow Down");
      } else {
        toast.error("Can't create Note");
        console.log("error occured", e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-5">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Title :</legend>
                    <input
                      className="input input-bordered w-full "
                      placeholder="Write Your Note Here..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </fieldset>
                </div>
                <div className="form-control mb-4">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">
                      Content :
                    </legend>
                    <textarea
                      className="textarea h-60 w-full"
                      placeholder="Write Your Note Here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </fieldset>
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
