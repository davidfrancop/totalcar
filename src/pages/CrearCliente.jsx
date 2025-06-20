// ========================
// Archivo: src/pages/CrearCliente.jsx
// ========================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function CrearCliente() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("particular");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    // Empresa
    nombre_empresa: "",
    id_fiscal: "",
    persona_contacto: "",
    email_contacto: "",
    telefono_contacto: "",
    direccion: "",
    ciudad: "",
    pais: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/clientes`, {
        ...form,
        tipo,
        empresa: tipo === "empresa",
      });
      navigate("/admin/clientes");
    } catch (error) {
      setMensaje("❌ Error al registrar cliente");
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrar Nuevo Cliente</h1>

      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="particular"
            checked={tipo === "particular"}
            onChange={() => setTipo("particular")}
          />
          Particular
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="empresa"
            checked={tipo === "empresa"}
            onChange={() => setTipo("empresa")}
          />
          Empresa
        </label>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {tipo === "particular" && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={form.apellido}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="DNI / Identificación"
              value={form.dni}
              onChange={(e) => setForm({ ...form, dni: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className="border p-2 rounded"
            />
          </>
        )}

        {tipo === "empresa" && (
          <>
            <input
              type="text"
              placeholder="Nombre de la Empresa"
              value={form.nombre_empresa}
              onChange={(e) => setForm({ ...form, nombre_empresa: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="ID Fiscal / Registro"
              value={form.id_fiscal}
              onChange={(e) => setForm({ ...form, id_fiscal: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Nombre de Contacto"
              value={form.persona_contacto}
              onChange={(e) => setForm({ ...form, persona_contacto: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email de Contacto"
              value={form.email_contacto}
              onChange={(e) => setForm({ ...form, email_contacto: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Teléfono de Contacto"
              value={form.telefono_contacto}
              onChange={(e) => setForm({ ...form, telefono_contacto: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Dirección fiscal"
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Ciudad"
              value={form.ciudad}
              onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="País"
              value={form.pais}
              onChange={(e) => setForm({ ...form, pais: e.target.value })}
              className="border p-2 rounded"
            />
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cliente
        </button>
        {mensaje && <p className="text-red-600 text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}
