import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiContext } from "../services/apis";

const Login = () => {
  const { userLogin, token } = useContext(apiContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    userLogin({
      email,
      password,
    });
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen gap-6">
      <h2 className="font-bold text-lg text-cyan-500">Login</h2>
      <form className="flex flex-col gap-3 w-full px-3" onSubmit={handleLogin}>
        <input
          type="email"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="p-3 outline-cyan-500 rounded bg-cyan-500 cursor-pointer text-white hover:bg-cyan-600"
          type="submit"
        >
          Login
        </button>
      </form>
      <Link className="text-gray-500" to={"/register"}>
        Belom punya akun?
      </Link>
      <div className="text-center fixed bottom-5">
      <p className="text-gray-500 text-xs font-bold">Muhammad Abduh</p>
      <p className="text-gray-500 text-xs">PT. Sedayu Sehat Tekhnologi</p>
      </div>
    </div>
  );
};

export default Login;
