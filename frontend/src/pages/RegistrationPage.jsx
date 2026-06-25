import React, { useState } from "react";
import { UserPen } from "lucide-react";
import { Link, useNavigate } from "react-router";
import apiUrl from "../lib/axios";
import toast from "react-hot-toast";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
      toast.error("All fields must be filled");
      return;
    }
    console.log({ name, email, password, username });
    setLoading(true);
    try {
      await apiUrl.post("users/register", {
        name,
        email,
        username,
        password,
      });
      toast.success("User Created");
      navigate("/login");
      toast.success("You can login now using the created account");
    } catch (e) {
      if (e.response.status === 429) {
        toast.error("Too Many Requests! Slow Down");
      } else {
        toast.error("Can't create user");
        console.log("error occured", e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center px-4 py-8">
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

              <h1 className="text-3xl font-bold">Create Account</h1>

              <p className="text-base-content/70 mt-2">
                Start organizing your notes today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </g>
                  </svg>

                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={3}
                    maxLength={30}
                  />
                </label>
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text">Email Address</span>
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
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </g>
                  </svg>

                  <input
                    type="email"
                    className="grow"
                    placeholder="mail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              {/* Username */}
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
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
                    className="grow"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    maxLength={30}
                  />
                </label>
              </div>

              {/* Password */}
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
                    className="grow"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </label>

                <label className="label">
                  <span className="label-text-alt opacity-70">
                    8+ characters, uppercase, lowercase and a number
                  </span>
                </label>
              </div>

              {/* Terms */}
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  required
                />

                <span className="text-sm">
                  I agree to the Terms and Conditions
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Footer */}
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-medium">
                  Login
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
