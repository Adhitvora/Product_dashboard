import { useState } from "react";
import api from "../api/api.js";
import { Link } from "react-router-dom";

const submitHandler = async (e) => {
  e.preventDefault();  

  if (!email) {
    alert("Email is required");
    return;
  }

  try {
    setLoading(true);
    const { data } = await api.post("/auth/forgot-password", { email });
    setMessage(data.message || "Reset link sent to your email");
  } catch (error) {
    alert(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Forgot Password
        </h2>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-sm text-center mt-4">{message}</p>
        )}

        <div className="text-center mt-6">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
