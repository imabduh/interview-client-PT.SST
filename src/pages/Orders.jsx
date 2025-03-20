import { useContext, useEffect, useState } from "react";
import { apiContext } from "../services/apis";
import { Link } from "react-router-dom";

export default function Orders() {
  const { updateOrderStatus, fetchOrders, orders, getUserId, userData, myId } =
    useContext(apiContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    getUserId(myId);
    setLoading(false);
  }, []);

  const handleUpdateOrderStatus = async (id, status) => {
    updateOrderStatus(id, status);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Tunggu Sebentar
      </div>
    );

  return (
    <div className="container mx-auto flex flex-col p-3">
      <div className="flex justify-between mb-3">
        <h3 className="font-bold text-lg text-cyan-500">Daftar Pemesanan</h3>
        <Link to={"/"}>
          <button className=" text-cyan-500 hover:text-cyan-600">
            Kembali
          </button>
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {orders.map((order) =>
          order.buyerId === myId ||
          order.providerId === myId ||
          userData.role === "admin" ? (
            <div
              key={order._id}
              className=" p-3 border rounded-lg border-cyan-500 text-sm text-gray-700"
            >
              <p>
                Status Pesanan: <b className="text-cyan-500">{order.status}</b>
              </p>
              <p>
                Pembelian:{" "}
                <b className="text-cyan-500">{order.serviceDetails[0].name}</b>
              </p>
              <p>
                Harga:{" "}
                <b className="text-cyan-500">
                  Rp.{order.serviceDetails[0].price.toLocaleString("id-ID")}
                </b>
              </p>
              <p>
                Nama Pembeli:{" "}
                <b className="text-cyan-500">{order.dataBuyer[0].name}</b>
              </p>
              <p>
                Nama Penjual:{" "}
                <b className="text-cyan-500">{order.dataProvider[0].name}</b>
              </p>
              <p>
                Tanggal ditinggali:{" "}
                <b className="text-cyan-500">
                  {new Date(order.appointmentDate).toLocaleDateString("id-ID")}
                </b>
              </p>
              <p>
                Tanggal Pemesanan:{" "}
                <b className="text-cyan-500">
                  {new Date(order.createdAt).toLocaleDateString("id-ID")}
                </b>
              </p>
              <p>
                Waktu Pemesanan:{" "}
                <b className="text-cyan-500">
                  {new Date(order.createdAt).toLocaleTimeString("id-ID")}
                </b>
              </p>
              <p>
                {userData.role === "provider" ? (
                  <p>
                    Ubah Status:{" "}
                    <select
                      disabled={false}
                      className="border rounded-full px-1"
                      value={order.status}
                      onChange={(e) => {
                        handleUpdateOrderStatus(order._id, e.target.value);
                      }}
                    >
                      <option value="Menunggu Konfirmasi">
                        Menunggu Konfirmasi
                      </option>
                      <option value="Sedang Diproses">Sedang Diproses</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </p>
                ) : null}
              </p>

              {userData.role === "buyer" ? (
                <p>
                  <button
                    className={`border rounded-md text-nowrap px-3 ${
                      order.status === "Dibatalkan"
                        ? "text-gray-500"
                        : "text-red-500 cursor-pointer"
                    }`}
                    disabled={order.status === "Dibatalkan" ? true : false}
                    onClick={() => {
                      if (
                        confirm("Apakah Anda yakin ingin membatalkan pesanan?")
                      )
                        handleUpdateOrderStatus(order._id, "Dibatalkan");
                    }}
                  >
                    {order.status === "Dibatalkan"
                      ? "Telah dibatalkan"
                      : "Batalkan pesanan"}
                  </button>
                </p>
              ) : null}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
