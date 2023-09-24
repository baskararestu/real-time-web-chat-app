import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await axios.post(`${baseUrl}/users/sign_in`, {
        username,
        password,
      });
      console.log(response);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("expires_at", response.data.expires_at);
      localStorage.setItem("user_data", JSON.stringify(response.data.user));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-100 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 shadow-xl gap-3">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-start flex flex-col">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                name="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="text-start flex flex-col">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a
          href="/register"
          className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
