import { ArrowRight, FileText, Pin, Tags, Search, Shield } from "lucide-react";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="navbar px-6 lg:px-16">
        <div className="flex-1">
          <a className="text-2xl font-bold">NoteFlow</a>
        </div>

        <div className="flex gap-2">
          <Link to="/login">
            <button className="btn btn-ghost">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-primary">Register</button>
          </Link>
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
