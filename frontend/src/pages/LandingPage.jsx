import {
  ArrowRight,
  FileText,
  Pin,
  Tags,
  Search,
  Shield,
  Feather,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import ThemeSelector from "../components/ThemeSelector";

export default function LandingPage() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "forest");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObject = JSON.parse(user);

    if (user) {
      navigate("/home");
      toast.success(`Welcome back ${userObject.name}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="navbar px-6 max-w-7xl mx-auto ">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <Feather className="size-8 text-primary" />
            <h1 className="text-3xl font-bold  font-mono tracking-tight">
              MakeNotes
            </h1>
          </Link>
        </div>

        <div className="flex gap-2 justify-center items-center">
          {/* Theme Selector: Always visible */}
          <div>
            <ThemeSelector />
          </div>

          {/* DESKTOP NAV: Hidden on mobile, flex on medium screens and up */}
          <div className="hidden md:flex gap-2">
            <Link to="/login">
              <button className="btn btn-outline btn-primary">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary">Register</button>
            </Link>
          </div>

          {/* MOBILE NAV (Hamburger Dropdown): Flex on mobile, hidden on medium screens and up */}
          <div className="dropdown dropdown-end md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>

            {/* Dropdown Menu Content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow-2xl gap-1"
            >
              <li>
                <Link
                  to="/login"
                  className="btn  btn-sm text-white text-center"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm text-white text-center"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="hero min-h-[75vh]">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <div className="badge badge-primary badge-lg mb-6">
              Simple • Fast • Organized
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Your Notes.
              <br />
              Organized.
              <br />
              Everywhere.
            </h1>

            <p className="py-8 text-lg opacity-80">
              Capture ideas, organize them with tags, pin important notes, write
              in Markdown, and access everything from one place.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <button className="btn btn-primary btn-lg">
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </Link>

              <Link to="/login">
                <button className="btn btn-outline btn-lg">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-16 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Everything you need to stay organized
          </h2>

          <p className="mt-4 opacity-70">
            Designed for students, developers and anyone who loves keeping
            thoughts structured.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <FileText className="text-primary" size={32} />
              <h3 className="card-title">Markdown Support</h3>
              <p>Write beautifully formatted notes using Markdown.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <Pin className="text-primary" size={32} />
              <h3 className="card-title">Pin Important Notes</h3>
              <p>Keep your most important notes at the top.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <Tags className="text-primary" size={32} />
              <h3 className="card-title">Smart Tags</h3>
              <p>Categorize and organize notes effortlessly.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <Search className="text-primary" size={32} />
              <h3 className="card-title">Instant Search</h3>
              <p>Find exactly what you're looking for in seconds.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <Shield className="text-primary" size={32} />
              <h3 className="card-title">Secure Accounts</h3>
              <p>Protected with authentication and private note ownership.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <FileText className="text-primary" size={32} />
              <h3 className="card-title">Cloud Access</h3>
              <p>Access your notes from anywhere after logging in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="px-6 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mockup-window border bg-base-200">
            <div className="bg-base-100 p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <div className="badge badge-primary">Pinned</div>

                    <h3 className="font-bold text-lg">Linux Commands</h3>

                    <p>Docker, Git, SSH and Kubernetes notes...</p>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="font-bold text-lg">Interview Preparation</h3>

                    <p>Data Structures, System Design and Networking...</p>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="font-bold text-lg">MERN Notes</h3>

                    <p>JWT, MongoDB, React Hooks and Express...</p>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="font-bold text-lg">College Work</h3>

                    <p>Assignment deadlines and project ideas...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 opacity-70">
            A clean workspace designed to keep ideas organized.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold">Ready to organize your thoughts?</h2>

        <p className="mt-4 opacity-70">
          Create an account and start taking notes today.
        </p>

        <Link to="/register">
          <button className="btn btn-primary btn-lg mt-8">Get Started</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-8 bg-base-200 text-base-content">
        <aside>
          <p>
            Built with React, Express, MongoDB and a questionable amount of
            caffeine.
          </p>
        </aside>
      </footer>
    </div>
  );
}
