// Archivo: src/pages/EditarClienteVehiculos.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { isAuthenticated, getRol } from "../utils/auth";

const opcionesEmpresa = [
  { value: false, label: 'No' },
  { value: true, label: 'Sí' },
];

const opcionesEstado = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
];

export default function EditarClienteVehiculos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [form, setForm] = useState({});
  const [vehiculos, setVehiculos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editandoAuto, setEditandoAuto] = useState(null);
  const [autoForm, setAutoForm] = useState({});
  const [mostrandoNuevoAuto, setMostrandoNuevoAuto] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
    cargarDetalle();
    // eslint-disable-next-line
  }, []);

  const cargarDetalle = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/clientes/${id}/detalle`);
      setCliente(res.data);
      setVehiculos(res.data.vehiculos || []);
      setForm({
        nombre: res.data.nombre || "",
        apellido: res.data.apellido || "",
        dni: res.data.dni || "",
        ciudad: res.data.ciudad || "",
        pais: res.data.pais || "",
        email: res.data.email || "",
        telefono_oficina: res.data.telefono_oficina || "",
        telefono_casa: res.data.telefono_casa || "",
        telefono_movil: res.data.telefono_movil || "",
        fecha_nacimiento: res.data.fecha_nacimiento || "",
        notas: res.data.notas || "",
        empresa: res.data.empresa || false,
        nombre_empresa: res.data.nombre_empresa || "",
        estado: res.data.estado || "activo",
        fecha_alta: res.data.fecha_alta || "",
        calle: res.data.calle || "",
        nro_casa: res.data.nro_casa || "",
        codigo_postal: res.data.codigo_postal || "",
      });
    } catch (err) {
      setMensaje("❌ Error al cargar cliente");
    }
  };

  const handleClienteChange = (e) => {
    const { name, value, type } = e.target;
    let val = (type === "select-one" && name === "empresa") ? value === "true" : value;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? e.target.checked : val }));
  };

  const handleGuardarCliente = async () => {
    try {
      await axios.put(`http://localhost:4000/clientes/${id}`, form);
      setMensaje("✅ Cliente actualizado");
      cargarDetalle();
    } catch {
      setMensaje("❌ Error al actualizar cliente");
    }
  };

  // --- Vehículos: Lógica igual que antes ---

  const inputClass = "input w-full mb-2 border border-gray-300 p-2 rounded";

  if (!cliente) {
    return <div className="p-4">Cargando datos...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* .src/pages/EditarClienteVehiculos.jsx */}
      <button
        onClick={() => navigate("/admin/clientes")}
        className="mb-4 flex items-center gap-2 text-blue-600 hover:underline text-sm"
      >
        <ArrowLeft size={18} /> Volver a la lista de clientes
      </button>
      <h2 className="text-2xl font-bold mb-6">Editar Cliente y Vehículos</h2>
      {mensaje && <div className="mb-2 text-red-600">{mensaje}</div>}

      {/* DATOS DEL CLIENTE */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Datos del Cliente</h3>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={e => {
            e.preventDefault();
            handleGuardarCliente();
          }}
        >
          <div><label>Nombre</label>
            <input className={inputClass} name="nombre" value={form.nombre} onChange={handleClienteChange} required />
          </div>
          <div><label>Apellido</label>
            <input className={inputClass} name="apellido" value={form.apellido} onChange={handleClienteChange} required />
          </div>
          <div><label>DNI</label>
            <input className={inputClass} name="dni" value={form.dni} onChange={handleClienteChange} required />
          </div>
          <div><label>Ciudad</label>
            <input className={inputClass} name="ciudad" value={form.ciudad} onChange={handleClienteChange} />
          </div>
          <div><label>País</label>
            <input className={inputClass} name="pais" value={form.pais} onChange={handleClienteChange} />
          </div>
          <div><label>Email</label>
            <input className={inputClass} name="email" value={form.email} onChange={handleClienteChange} />
          </div>
          <div><label>Teléfono oficina</label>
            <input className={inputClass} name="telefono_oficina" value={form.telefono_oficina} onChange={handleClienteChange} />
          </div>
          <div><label>Teléfono casa</label>
            <input className={inputClass} name="telefono_casa" value={form.telefono_casa} onChange={handleClienteChange} />
          </div>
          <div><label>Teléfono móvil</label>
            <input className={inputClass} name="telefono_movil" value={form.telefono_movil} onChange={handleClienteChange} />
          </div>
          <div><label>Fecha nacimiento</label>
            <input className={inputClass} name="fecha_nacimiento" type="date" value={form.fecha_nacimiento || ""} onChange={handleClienteChange} />
          </div>
          <div><label>Notas</label>
            <input className={inputClass} name="notas" value={form.notas} onChange={handleClienteChange} />
          </div>
          <div><label>¿Es empresa?</label>
            <select className={inputClass} name="empresa" value={form.empresa} onChange={handleClienteChange}>
              {opcionesEmpresa.map(opt => (
                <option key={opt.label} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {/* Mostrar solo si es empresa */}
          {String(form.empresa) === "true" && (
            <div>
              <label>Nombre empresa</label>
              <input className={inputClass} name="nombre_empresa" value={form.nombre_empresa} onChange={handleClienteChange} />
            </div>
          )}
          <div><label>Estado</label>
            <select className={inputClass} name="estado" value={form.estado} onChange={handleClienteChange}>
              {opcionesEstado.map(opt => (
                <option key={opt.label} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div><label>Fecha de alta</label>
            <input className={inputClass} name="fecha_alta" type="date" value={form.fecha_alta || ""} onChange={handleClienteChange} />
          </div>
          <div><label>Calle</label>
            <input className={inputClass} name="calle" value={form.calle} onChange={handleClienteChange} />
          </div>
          <div><label>Nro casa</label>
            <input className={inputClass} name="nro_casa" value={form.nro_casa} onChange={handleClienteChange} />
          </div>
          <div><label>Código postal</label>
            <input className={inputClass} name="codigo_postal" value={form.codigo_postal} onChange={handleClienteChange} />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Guardar Cliente
            </button>
          </div>
        </form>
      </div>

      {/* Vehículos: tu lógica habitual aquí (como ya la tienes, puedes dejar los forms igual) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Vehículos del Cliente</h3>
        {/* ... Aquí va el listado, edición y alta de vehículos ... */}
      </div>
    </div>
  );
}
