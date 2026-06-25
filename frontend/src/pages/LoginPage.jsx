import React, { useState } from "react";
import { UserPen } from "lucide-react";
import { Link, useNavigate } from "react-router";
import apiUrl from "../lib/axios";
import toast from "react-hot-toast";

function RegistrationPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      toast.error("All fields must be filled");
      return;
    }

    setLoading(true);
    try {
      const response = await apiUrl.post("users/login", {
        identifier,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Logged in Succesfully");
      navigate("/home");
      toast.success("You can login now using the created account");
    } catch (e) {
      if (e.response.status === 401) {
        toast.error("Invalid Credentials");
      }
      if (e.response.status === 429) {
        toast.error("Too Many Requests! Slow Down");
      } else {
        toast.error("Can't login");
        console.log("error occured", e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <UserPen className="size-8 text-primary" />
                </div>
              </div>

              <h1 className="text-3xl font-bold">Welcome Back</h1>

              <p className="text-base-content/70 mt-2">
                Login to access your notes
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Username or Email</span>
                </label>

                <label className="input input-bordered w-full flex items-center gap-2">
                  <svg
                    className="h-4 w-4 opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                    </g>
                  </svg>

                  <input
                    type="text"
                    placeholder="Enter username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    className="grow"
                  />
                </label>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <label className="input input-bordered w-full flex items-center gap-2">
                  <svg
                    className="h-4 w-4 opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                    </g>
                  </svg>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="grow"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="label cursor-pointer gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span>Remember me</span>
                </label>

                <a href="#" className="link link-primary">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full btn-lg mt-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Logging In...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="link link-primary font-medium">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
