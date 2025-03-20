import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { apiContext } from "../services/apis";

export default function ServiceDetile() {
  const [newOrder, setNewOrder] = useState({
    serviceId: "",
    appointmentDate: "",
    providerId: "",
    buyerId: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    deleteService,
    createOrder,
    userData,
    getUserId,
    myId,
    getServiceId,
    serviceData,
    deleteManyOrderByServiceId,
  } = useContext(apiContext);

  const handleAddOrder = async (e) => {
    e.preventDefault();
    createOrder(newOrder);
    setNewOrder({
      serviceId: "",
      appointmentDate: "",
      providerId: "",
      buyerId: "",
    });
    navigate("/order-services");
  };

  useEffect(() => {
    getServiceId(id);
    getUserId(myId);
  }, []);

  const handleDeleteService = async () => {
    deleteService(id);
    deleteManyOrderByServiceId(id);
    navigate("/");
  };

  return (
    <div>
      {serviceData.userProvider ? (
        <div className="flex max-sm:flex-col sm:justify-center sm:items-center h-screen w-full gap-3">
          <img
            className="rounded-lg mb-1.5 sm:w-80"
            src="https://static.vecteezy.com/system/resources/previews/000/551/891/original/vector-illustration-of-modern-house.jpg"
            alt="img"
          />
          <div className="max-sm:px-3">
            <Link to={"/"}>
              <button className=" text-cyan-500 hover:text-cyan-600 cursor-pointer">
                Kembali
              </button>
            </Link>
            <br />
            <br />
            <p>Judul Layanan: {serviceData.name.toUpperCase()}</p>
            <p>Deskripsi: {serviceData.description}</p>
            <p>Harga: Rp.{serviceData.price?.toLocaleString("id-ID")}</p>
            <p>Penyedia: {serviceData.userProvider[0]?.name}</p>
            <p>Email penyedia: {serviceData.userProvider[0]?.email}</p>
            <p>No Telepon penyedia: {serviceData.userProvider[0]?.phone}</p>
            <p>Tempat: {serviceData.userProvider[0]?.address}</p>

            <br />
            {userData.role === "buyer" ? (
              <form onSubmit={handleAddOrder}>
                <input
                  type="date"
                  className="p-3 outline-cyan-500 rounded border border-cyan-500 cursor-pointer hover:bg-cyan-600 w-full"
                  value={newOrder.appointmentDate}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      appointmentDate: e.target.value,
                      serviceId: serviceData._id,
                      buyerId: myId,
                      providerId: serviceData.providerId,
                    })
                  }
                  required
                />
                <br />
                <br />
                <button
                  className="p-3 w-full outline-cyan-500 rounded bg-cyan-500 cursor-pointer text-white hover:bg-cyan-600"
                  type="submit"
                >
                  Tambah Pesanan
                </button>
                <br />
              </form>
            ) : null}
            {userData.role === "admin" ? (
              <button
                className="p-3 outline-cyan-500 rounded bg-cyan-500 cursor-pointer text-white hover:bg-cyan-600 w-full"
                onClick={() => handleDeleteService()}
              >
                Hapus (admin)
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center text-center">
          Tunggu Sebenter
        </div>
      )}
    </div>
  );
}
