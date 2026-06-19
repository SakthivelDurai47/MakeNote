import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            NoteBook
          </h1>
          <div className="flex items-center gap-4">
            <Link className="btn btn-primary" to={"/create"}>
              <PlusIcon className="size-5" />
              <span>Add Note</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
