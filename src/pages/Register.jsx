import { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      await api.post("/auth/register", {
        ...form,
        email: form.email.toLowerCase(),
      });

      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div>
      <div className="container flex flex-col mx-auto bg-white rounded-lg justify-center items-center overflow-hidden">
        <div className="flex justify-center items-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={submitHandler}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Registration
                </h3>
                <p className="mb-4 text-grey-700">
                  Enter your Name,E-mail and Password
                </p>

                <label
                  htmlFor="name"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Name*
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-blue-100 mb-7 placeholder:text-grey-700 bg-blue-50/75 text-black rounded-2xl"
                />

                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-blue-100 mb-7 placeholder:text-grey-700 bg-blue-50/75 text-black rounded-2xl"
                />

                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="off"
                  placeholder="Enter a password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-blue-100 mb-7 placeholder:text-grey-700 bg-blue-50/75 text-black rounded-2xl"
                />

                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 bg-blue-500 cursor-pointer"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
