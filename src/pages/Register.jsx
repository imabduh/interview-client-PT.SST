import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiContext } from "../services/apis";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { token, userRegister } = useContext(apiContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    userRegister(user);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen gap-6">
      <h2 className="font-bold text-lg text-cyan-500">Daftar</h2>
      <form
        className="flex flex-col gap-3 w-full px-3"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          name="name"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Nama"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Nomor Telepon"
          value={user.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Alamat"
          value={user.address}
          onChange={handleChange}
        />
        <select
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          name="role"
          value={user.role}
          onInput={handleChange}
          required
        >
          <option value="">Pilih Role</option>
          <option value="admin">admin</option>
          <option value="provider">provider</option>
          <option value="buyer">buyer</option>
        </select>
        <button
          className="p-3 outline-cyan-500 rounded bg-cyan-500 cursor-pointer text-white hover:bg-cyan-600"
          type="submit"
        >
          Daftar
        </button>
      </form>
      <Link className="text-gray-500" to={"/login"}>
        Sudah punya akun? Login
      </Link>
    </div>
  );
};

export default Register;
