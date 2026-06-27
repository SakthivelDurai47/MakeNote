import { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function UserMenu() {
  const isuser = localStorage.getItem("user");
  const user = JSON.parse(isuser);
  const userTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(userTheme ? userTheme : "forest");
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (window.confirm("Do you want to log out?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
      toast.success("logged out successfylly!");
    }
  };

  useEffect(() => {
    console.log(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end ">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-outline btn-primary"
      >
        <User className="size-4 " />
      </div>
      <div
        tabIndex="-1"
        className="dropdown-content menu bg-base-200 rounded-box z-1 w-70 p-2 shadow-sm mt-5 border border-base-content/10"
      >
        <div className="text-center mb-2 ">
          <div className="flex justify-center mb-3  ">
            <div className="bg-primary/10 p-3 rounded-full ">
              <User className="size-6 text-primary" />
            </div>
          </div>

          <h1 className="text-xl font-bold pb-3 border-b border-base-content/20">{`Hi, ${user.name}`}</h1>
        </div>
        <div className="border px-2 pb-2 rounded-md border-base-content/10">
          {" "}
          <p className=" font-bold border rounded-md border-primary text-primary text-center w-full mb-2 mt-2">
            Themes
          </p>
          <div className="join join-vertical w-full">
            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item rounded-t-sm justify-start text-sm"
              aria-label="Forest"
              value="forest"
              checked={theme === "forest"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start"
              aria-label="Halloween"
              value="halloween"
              checked={theme === "halloween"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start"
              aria-label="Dark"
              value="dark"
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start"
              aria-label="Light"
              value="light"
              checked={theme === "light"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start"
              aria-label="Nord"
              value="nord"
              checked={theme === "nord"}
              onChange={(e) => setTheme(e.target.value)}
            />

            <input
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item justify-start"
              aria-label="Corporate"
              value="corporate"
              checked={theme === "corporate"}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
        </div>

        <div className="border  rounded-md border-base-content/10 mt-2">
          <p
            className="font-bold flex items-center justify-center gap-2 rounded-sm alert alert-error btn  p-2"
            onClick={handleLogOut}
          >
            <LogOut className="size-4" />
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
  {
    (" ");
  }
}

export default UserMenu;
