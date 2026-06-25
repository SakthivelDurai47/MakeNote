import React from "react";
import { Link } from "react-router";
import { PlusIcon, Feather, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-base-100 backdrop-blur-md border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Feather className="size-8 text-primary" />
            <h1 className="text-3xl font-bold  font-mono tracking-tight">
              NoteBook
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              Add Note
            </Link>

            <div className="tooltip tooltip-bottom" data-tip="Profile">
              <Link to="/user" className="btn btn-circle btn-outline">
                <User className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
