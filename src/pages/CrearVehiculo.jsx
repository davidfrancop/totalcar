// ========================
// Archivo: src/pages/CrearVehiculo.jsx
// ========================

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, isAuthenticated, logout } from "../utils/auth";
import { getMarcas, getModelos, getAnios } from "../utils/vehiculoApi";

export default function CrearVehiculo() {
  const { id } = useParams();   // id_cliente
  const navigate = useNavigate();

  // Debug: verificar importaciones
  console.log("vehiculoApi exports:", { getMarcas, getModelos, getAnios });

  const [marcas, setMarcas]     = useState([]);
  const [modelos, setModelos]   = useState([]);
  const [anios, setAnios]       = useState([]);
  const [vehiculo, setVehiculo] = useState({
    matricula: "",
    marca: "",
    modelo: "",
    anio: "",
    vin: "",
    tipo_combustible: "",
    transmision: "",
    drive: "",
    color: "",
    kilometraje: "",
    hsn_tsn: "",
    bateria_estado: "",
    tuv_valido_hasta: "",
    fecha_ingreso_taller: ""
  });

  useEffect(() => {
    console.log("useEffect iniciado, getMarcas:", getMarcas);
    if (!isAuthenticated()) {
      console.log("No autenticado → logout y redirect");
      logout();
      navigate("/login");
      return;
    }
    // cargar marcas
    getMarcas()
      .then(lista => {
        console.log("getMarcas() devolvió:", lista);
        setMarcas(lista);
      })
      .catch(err => console.error("Error en getMarcas():", err));
    // cargar años
    getAnios()
      .then(lista => {
        console.log("getAnios() devolvió:", lista.slice(0,5), "…");
        setAnios(lista);
      })
      .catch(err => console.error("Error en getAnios():", err));
  }, [navigate]);

  const handleMarcaChange = async (e) => {
    const marca = e.target.value;
    console.log("handleMarcaChange, marca seleccionada:", marca);
    setVehiculo(v => ({ ...v, marca, modelo: "", anio: "" }));
    if (marca) {
      getModelos(marca)
        .then(lista => {
          console.log(`getModelos("${marca}") devolvió:`, lista);
          setModelos(lista);
        })
        .catch(err => console.error("Error en getModelos():", err));
    } else {
      setModelos([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handleChange:", name, "=", value);
    setVehiculo(v => ({ ...v, [name]: value }));
  };

  const guardarVehiculo = async () => {
    try {
      console.log("guardando vehículo:", vehiculo);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/vehiculos`,
        { ...vehiculo, id_cliente: id },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log("Vehículo guardado correctamente");
      navigate(`/admin/clientes/${id}/editar`);
    } catch (err) {
      console.error("Error al guardar vehículo:", err);
      alert("No se pudo registrar el vehículo");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Registrar Vehículo</h2>
      <div className="space-y-4">
        <input
          name="matricula"
          placeholder="Matrícula"
          value={vehiculo.matricula}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="marca"
          value={vehiculo.marca}
          onChange={handleMarcaChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccionar marca</option>
          {marcas.map(m => (
            <option key={m} value={m}>{m.toUpperCase()}</option>
          ))}
        </select>

        <select
          name="modelo"
          value={vehiculo.modelo}
          onChange={handleChange}
          disabled={!vehiculo.marca}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccionar modelo</option>
          {modelos.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          name="anio"
          value={vehiculo.anio}
          onChange={handleChange}
          disabled={!vehiculo.modelo}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccionar año</option>
          {anios.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <input
          name="vin"
          placeholder="VIN"
          value={vehiculo.vin}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="tipo_combustible"
          value={vehiculo.tipo_combustible}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccionar combustible</option>
          <option value="gasolina">Gasolina</option>
          <option value="diesel">Diésel</option>
          <option value="electrico">Eléctrico</option>
          <option value="hibrido">Híbrido</option>
        </select>

        <select
          name="transmision"
          value={vehiculo.transmision}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccionar transmisión</option>
          <option value="manual">Manual</option>
          <option value="automatica">Automática</option>
        </select>

        <select
          name="drive"
          value={vehiculo.drive}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccionar tracción</option>
          <option value="fwd">FWD</option>
          <option value="rwd">RWD</option>
          <option value="awd">AWD</option>
        </select>

        <input
          name="color"
          placeholder="Color"
          value={vehiculo.color}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="kilometraje"
          placeholder="Kilometraje"
          value={vehiculo.kilometraje}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="hsn_tsn"
          placeholder="HSN/TSN"
          value={vehiculo.hsn_tsn}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <label className="block font-medium mt-4">Estado de la batería</label>
        <select
          name="bateria_estado"
          value={vehiculo.bateria_estado}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccionar estado</option>
          <option value="100">Buena</option>
          <option value="60">Regular</option>
          <option value="30">Requiere revisión</option>
          <option value="0">No aplica</option>
        </select>

        <label className="block font-medium mt-4">TÜV válido hasta</label>
        <input
          type="month"
          name="tuv_valido_hasta"
          value={vehiculo.tuv_valido_hasta}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <label className="block font-medium mt-4">Fecha de ingreso al taller</label>
        <input
          type="date"
          name="fecha_ingreso_taller"
          value={vehiculo.fecha_ingreso_taller}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={guardarVehiculo}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Guardar Vehículo
      </button>
    </div>
  );
}
