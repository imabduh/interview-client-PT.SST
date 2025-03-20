import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const apiContext = createContext();

export default function ApiProvider({ children }) {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  let myId = "";
  if (token) myId = jwtDecode(token).id;

  const API = axios.create({
    baseURL: "https://interview-server-pt-sst.vercel.app/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  API.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      return Promise.reject(error);
    }
  );

  const getUserId = async (id) => {
    try {
      const res = await API.get(`/users/${id}`);
      setUserData(res.data);
    } catch (error) {
      console.error("Gagal mengambil layanan:", error);
    }
  };

  const getServiceId = async (id) => {
    try {
      const res = await API.get(`/services/${id}`);
      setServiceData(res.data);
    } catch (error) {
      console.error("Gagal mengambil layanan:", error);
    }
  };

  const userLogin = async (data) => {
    try {
      const res = await API.post("/auth/login", data);
      setToken(res.data.token);
    } catch (error) {
      alert("Login gagal!");
    }
  };

  const userRegister = async (data) => {
    try {
      await API.post("/auth/register", data);
      alert("Pendaftaran berhasil! Silakan login.");
    } catch (error) {
      alert("Pendaftaran gagal! Pastikan email belum digunakan.");
    }
  };

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Gagal mengambil layanan:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Gagal mengambil pesanan:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Gagal mengambil users:", error);
    }
  };

  const createOrder = async (data) => {
    try {
      await API.post("/orders", data);
      fetchOrders()
    } catch (error) {
      console.error("Gagal menambahkan pemesanan:", error);
    }
  };

  const createService = async (data) => {
    try {
      await API.post("/services", data);
    } catch (error) {
      console.error("Gagal menambahkan layanan:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await API.delete(`/orders/${id}`);
    } catch (error) {
      console.error("Gagal menghapus pesanan:", error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Gagal memperbarui status pesanan:", error);
    }
  };

  const deleteService = async (id) => {
    try {
      await API.delete(`/services/${id}`);
    } catch (error) {
      console.error("Gagal menghapus layanan:", error);
    }
  };
  const deleteManyOrderByServiceId = async (id) => {
    try {
      await API.delete(`/orders/${id}/many`);
    } catch (error) {
      console.error("Gagal menghapus layanan:", error);
    }
  };
  return (
    <apiContext.Provider
      value={{
        myId,
        deleteManyOrderByServiceId,
        createOrder,
        deleteOrder,
        createService,
        deleteService,
        updateOrderStatus,
        fetchOrders,
        fetchUsers,
        orders,
        setOrders,
        userRegister,
        getUserId,
        fetchServices,
        userLogin,
        getServiceId,
        userData,
        setUserData,
        serviceData,
        setServiceData,
        users,
        setUsers,
        token,
        setToken,
        services,
        setServices,
      }}
    >
      {children}
    </apiContext.Provider>
  );
}
