import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiContext } from "../services/apis";

const Dashboard = () => {
  const { setToken, services, fetchServices, myId, userData, getUserId } =
    useContext(apiContext);
    const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
    getUserId(myId);
    setLoading(false);

  }, [myId]);

  if (loading) return <div className="flex items-center justify-center h-screen">Tunggu Sebentar...</div>;


  return (
    <div>
      <div className="fixed bottom-0 flex justify-between gap-3 w-full p-1 text-white bg-cyan-500 px-3">
        <div className="flex gap-3">
          <b>{userData.name}</b>-<p>{userData.role}</p>
        </div>

        <button
          className="border text-xs px-3 rounded-full cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
            navigate("/login");
          }}
        >
          LogOut
        </button>
      </div>
      <div className="container mx-auto flex flex-col">
        <div className="flex justify-between gap-3 p-3 text-cyan-500">
          <b>JualBeliRumah</b>
          <div className="flex gap-3 text-xs justify-center items-center">
            {userData.role === "admin" ? (
              <Link
                className="border font-semibold px-1.5 py-0.5 rounded-full truncate block"
                to={"/add-service"}
              >
                Tambah Pesanan
              </Link>
            ) : null}
            <Link
              className="border font-semibold px-1.5 py-0.5 rounded-full truncate block"
              to={"/order-services"}
            >
              {userData.role === "buyer"
                ? "Pemesanan Saya"
                : "Pesanan Pelanggan"}
            </Link>
          </div>
        </div>
        <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3 gap-3">
          {services.map((service) => (
            <Link key={service._id} to={"/service-detile/" + service._id}>
              <div className="text-sm border border-cyan-500 rounded-xl p-3 text-gray-800">
                <img
                  className="rounded-lg mb-1.5"
                  src="https://static.vecteezy.com/system/resources/previews/000/551/891/original/vector-illustration-of-modern-house.jpg"
                  alt="img"
                  loading="lazy"
                />
                <p className="truncate block font-bold text-cyan-500">
                  {service.name.toUpperCase()}
                </p>
                <p className="truncate block">
                  Rp.{service.price.toLocaleString("id-ID")}
                </p>
                <p className="truncate block text-xs font-semibold">
                  {service.userProvider[0].name}
                </p>
                <p className="truncate block text-xs text-gray-500">
                  {service.userProvider[0].address}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
