import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";

//initial State
const initialState = {
  email: "",
  password: "",
  role: "user",
};

export function Login() {
  const dispatch = useDispatch();
  const [userLoginInfo, setUserLoginInfo] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserLoginInfo({
      ...userLoginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (userLoginInfo.email === "") {
      return;
    }

    e.preventDefault();
    dispatch(loginUser(userLoginInfo));

    setUserLoginInfo(initialState);
    navigate("/");
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x">
                Sign in to your account
              </h1>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    type="email"
                    name="email"
                    id="email"
                    value={userLoginInfo.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    id="password"
                    value={userLoginInfo.password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 mr-5 font-medium text-gray-900 "
                  >
                    Role:
                  </label>
                  <select
                    value={userLoginInfo.role}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    id="role"
                    name="role"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link to="/signup" className="font-medium">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
