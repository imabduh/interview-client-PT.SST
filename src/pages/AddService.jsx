import { useContext, useEffect, useState } from "react";
import { apiContext } from "../services/apis";
import { Link, useNavigate } from "react-router-dom";

export default function AddService() {
  const { createService,fetchUsers, users, getUserId, myId } = useContext(apiContext);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    providerId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getUserId(myId);
    fetchUsers();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    createService(newService);
    setNewService({ name: "", description: "", price: "", providerId: "" });
    navigate("/");
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen gap-6">
      <h3 className="font-bold text-lg text-cyan-500">Tambah Layanan</h3>
      <form className="flex flex-col w-full px-3" onSubmit={handleAddService}>
        <input
          type="text"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Nama Layanan"
          value={newService.name}
          onChange={(e) =>
            setNewService({
              ...newService,
              name: e.target.value,
            })
          }
          required
        />
        <br />
        <input
          type="text"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Deskripsi"
          value={newService.description}
          onChange={(e) =>
            setNewService({
              ...newService,
              description: e.target.value,
            })
          }
          required
        />
        <br />
        <input
          type="number"
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          placeholder="Harga"
          value={newService.price}
          onChange={(e) =>
            setNewService({
              ...newService,
              price: e.target.value,
            })
          }
          required
        />
        <br />
        <select
          className="p-3 outline-cyan-500  border-b border-cyan-500"
          onChange={(e) =>
            setNewService({
              ...newService,
              providerId: e.target.value,
            })
          }
          required
        >
          <option value="">Pilih Penyedia Layanan</option>
          {users.map((user, index) =>
            user.role === "provider" ? (
              <option key={index} value={user._id}>
                {user.name}
              </option>
            ) : null
          )}
        </select>
        <br />

        <button
          className="p-3 outline-cyan-500 rounded bg-cyan-500 cursor-pointer text-white hover:bg-cyan-600"
          type="submit"
        >
          Tambah ke daftar layanan
        </button>
      </form>
      <Link
       className=" text-cyan-500 hover:text-cyan-600"
      to={"/"}>
        <button className="cursor-pointer">Kembali</button>
      </Link>
    </div>
  );
}
