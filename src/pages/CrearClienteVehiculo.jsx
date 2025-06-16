// Archivo: src/pages/CrearClienteVehiculo.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const opcionesUmwelt = [
  { value: '', label: 'Seleccione...' },
  { value: 'verde (4)', label: 'Verde (4)' },
  { value: 'amarillo (3)', label: 'Amarillo (3)' },
  { value: 'rojo (2)', label: 'Rojo (2)' },
  { value: 'ninguna', label: 'Ninguna' },
];

const opcionesBateria = Array.from({ length: 11 }, (_, i) => ({
  value: i * 10,
  label: `${i * 10}%`,
}));

const opcionesEmpresa = [
  { value: false, label: 'No' },
  { value: true, label: 'Sí' },
];

const opcionesCombustible = [
  { value: '', label: 'Seleccione...' },
  { value: 'Gasolina', label: 'Gasolina' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Híbrido/Gasolina', label: 'Híbrido/Gasolina' },
  { value: 'Híbrido/Diesel', label: 'Híbrido/Diesel' },
  { value: 'Eléctrico', label: 'Eléctrico' },
];

const opcionesTransmision = [
  { value: '', label: 'Seleccione...' },
  { value: 'Automático', label: 'Automático' },
  { value: 'Manual', label: 'Manual' },
];

const opcionesColor = [
  { value: '', label: 'Seleccione...' },
  { value: 'Negro', label: 'Negro' },
  { value: 'Blanco', label: 'Blanco' },
  { value: 'Gris', label: 'Gris' },
  { value: 'Plata', label: 'Plata' },
  { value: 'Rojo', label: 'Rojo' },
  { value: 'Azul', label: 'Azul' },
  { value: 'Verde', label: 'Verde' },
  { value: 'Amarillo', label: 'Amarillo' },
  { value: 'Marrón', label: 'Marrón' },
  { value: 'Naranja', label: 'Naranja' },
  { value: 'Beige', label: 'Beige' },
  { value: 'Otro', label: 'Otro' },
];

const opcionesEstado = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
];

export default function CrearClienteVehiculo() {
  const [cliente, setCliente] = useState({
    nombre: '', apellido: '', dni: '', ciudad: '', pais: '', email: '', telefono_oficina: '',
    telefono_casa: '', telefono_movil: '', fecha_nacimiento: '', notas: '', empresa: false,
    nombre_empresa: '', estado: 'activo', fecha_alta: '', calle: '', nro_casa: '', codigo_postal: ''
  });

  const [vehiculo, setVehiculo] = useState({
    matricula: '', marca: '', modelo: '', anio: '', vin: '', hsn_tsn: '',
    fecha_alta: '', fecha_ingreso_taller: '', notas: '', estado: 'activo', tipo_combustible: '',
    kilometraje: '', color: '', transmision: '', fecha_ultimo_servicio: '', imagen_url: '',
    proximo_servicio: '', ficha_tecnica_url: '', propietario_nombre: '', propietario_dni: '',
    bateria_estado: '', fecha_entrega_estimada: '', umweltplakette: '', tuv_valido_hasta: ''
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) navigate('/login');
  }, [navigate]);

  const handleClienteChange = (e) => {
    const { name, value, type } = e.target;
    let val = (type === "select-one" && name === "empresa") ? value === "true" : value;
    setCliente(prev => ({ ...prev, [name]: type === 'checkbox' ? e.target.checked : val }));
  };

  const handleVehiculoChange = (e) => {
    const { name, value } = e.target;
    setVehiculo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    let vehiculoFormateado = { ...vehiculo };
    if (
      vehiculoFormateado.tuv_valido_hasta &&
      vehiculoFormateado.tuv_valido_hasta.length === 7
    ) {
      vehiculoFormateado.tuv_valido_hasta += '-01';
    }

    try {
      const res = await fetch(`${BASE_URL}/cliente-con-vehiculo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente, vehiculo: vehiculoFormateado }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Cliente y vehículo registrados con éxito');
        setCliente({
          nombre: '', apellido: '', dni: '', ciudad: '', pais: '', email: '', telefono_oficina: '',
          telefono_casa: '', telefono_movil: '', fecha_nacimiento: '', notas: '', empresa: false,
          nombre_empresa: '', estado: 'activo', fecha_alta: '', calle: '', nro_casa: '', codigo_postal: ''
        });
        setVehiculo({
          matricula: '', marca: '', modelo: '', anio: '', vin: '', hsn_tsn: '',
          fecha_alta: '', fecha_ingreso_taller: '', notas: '', estado: 'activo', tipo_combustible: '',
          kilometraje: '', color: '', transmision: '', fecha_ultimo_servicio: '', imagen_url: '',
          proximo_servicio: '', ficha_tecnica_url: '', propietario_nombre: '', propietario_dni: '',
          bateria_estado: '', fecha_entrega_estimada: '', umweltplakette: '', tuv_valido_hasta: ''
        });
      } else {
        setMensaje(data.error || '❌ Error al registrar');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('❌ Error en la conexión con el servidor');
    }
  };

  const inputClass = "input w-full mb-2 border border-gray-300 p-2 rounded";

  const mostrarBateria =
    vehiculo.tipo_combustible === 'Eléctrico' ||
    vehiculo.tipo_combustible === 'Híbrido/Gasolina' ||
    vehiculo.tipo_combustible === 'Híbrido/Diesel';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* .src/pages/CrearClienteVehiculo.jsx */}
      <button
        type="button"
        onClick={() => navigate('/admin')}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Volver al Panel
      </button>

      <h2 className="text-2xl font-bold mb-4">Registrar Cliente y Vehículo</h2>
      {mensaje && <p className="mb-4 text-red-600">{mensaje}</p>}

      {/* DATOS DEL CLIENTE */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Datos del Cliente</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label>Nombre</label>
              <input className={inputClass} name="nombre" value={cliente.nombre} onChange={handleClienteChange} required />
            </div>
            <div><label>Apellido</label>
              <input className={inputClass} name="apellido" value={cliente.apellido} onChange={handleClienteChange} required />
            </div>
            <div><label>DNI</label>
              <input className={inputClass} name="dni" value={cliente.dni} onChange={handleClienteChange} required />
            </div>
            <div><label>Ciudad</label>
              <input className={inputClass} name="ciudad" value={cliente.ciudad} onChange={handleClienteChange} />
            </div>
            <div><label>País</label>
              <input className={inputClass} name="pais" value={cliente.pais} onChange={handleClienteChange} />
            </div>
            <div><label>Email</label>
              <input className={inputClass} name="email" value={cliente.email} onChange={handleClienteChange} />
            </div>
            <div><label>Teléfono oficina</label>
              <input className={inputClass} name="telefono_oficina" value={cliente.telefono_oficina} onChange={handleClienteChange} />
            </div>
            <div><label>Teléfono casa</label>
              <input className={inputClass} name="telefono_casa" value={cliente.telefono_casa} onChange={handleClienteChange} />
            </div>
            <div><label>Teléfono móvil</label>
              <input className={inputClass} name="telefono_movil" value={cliente.telefono_movil} onChange={handleClienteChange} />
            </div>
            <div><label>Fecha nacimiento</label>
              <input className={inputClass} name="fecha_nacimiento" type="date" value={cliente.fecha_nacimiento} onChange={handleClienteChange} />
            </div>
            <div><label>Notas</label>
              <input className={inputClass} name="notas" value={cliente.notas} onChange={handleClienteChange} />
            </div>
            <div><label>¿Es empresa?</label>
              <select className={inputClass} name="empresa" value={cliente.empresa} onChange={handleClienteChange}>
                {opcionesEmpresa.map(opt => (
                  <option key={opt.label} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {/* Mostrar solo si es empresa */}
            {String(cliente.empresa) === "true" && (
              <div>
                <label>Nombre empresa</label>
                <input className={inputClass} name="nombre_empresa" value={cliente.nombre_empresa} onChange={handleClienteChange} />
              </div>
            )}
            <div><label>Estado</label>
              <select className={inputClass} name="estado" value={cliente.estado} onChange={handleClienteChange}>
                {opcionesEstado.map(opt => (
                  <option key={opt.label} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div><label>Fecha de alta</label>
              <input className={inputClass} name="fecha_alta" type="date" value={cliente.fecha_alta} onChange={handleClienteChange} />
            </div>
            <div><label>Calle</label>
              <input className={inputClass} name="calle" value={cliente.calle} onChange={handleClienteChange} />
            </div>
            <div><label>Nro casa</label>
              <input className={inputClass} name="nro_casa" value={cliente.nro_casa} onChange={handleClienteChange} />
            </div>
            <div><label>Código postal</label>
              <input className={inputClass} name="codigo_postal" value={cliente.codigo_postal} onChange={handleClienteChange} />
            </div>
          </div>

          {/* DATOS DEL VEHÍCULO */}
          <h3 className="text-xl font-semibold mb-2 mt-8">Datos del Vehículo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label>Matrícula</label>
              <input className={inputClass} name="matricula" value={vehiculo.matricula} onChange={handleVehiculoChange} required />
            </div>
            <div><label>Marca</label>
              <input className={inputClass} name="marca" value={vehiculo.marca} onChange={handleVehiculoChange} />
            </div>
            <div><label>Modelo</label>
              <input className={inputClass} name="modelo" value={vehiculo.modelo} onChange={handleVehiculoChange} />
            </div>
            <div><label>Año</label>
              <input className={inputClass} name="anio" type="number" value={vehiculo.anio} onChange={handleVehiculoChange} />
            </div>
            <div><label>VIN</label>
              <input className={inputClass} name="vin" value={vehiculo.vin} onChange={handleVehiculoChange} />
            </div>
            <div><label>HSN/TSN</label>
              <input className={inputClass} name="hsn_tsn" value={vehiculo.hsn_tsn} onChange={handleVehiculoChange} />
            </div>
            <div><label>Fecha alta</label>
              <input className={inputClass} name="fecha_alta" type="date" value={vehiculo.fecha_alta} onChange={handleVehiculoChange} />
            </div>
            <div><label>Fecha ingreso taller</label>
              <input className={inputClass} name="fecha_ingreso_taller" type="date" value={vehiculo.fecha_ingreso_taller} onChange={handleVehiculoChange} />
            </div>
            <div><label>Notas</label>
              <input className={inputClass} name="notas" value={vehiculo.notas} onChange={handleVehiculoChange} />
            </div>
            <div><label>Estado</label>
              <select className={inputClass} name="estado" value={vehiculo.estado} onChange={handleVehiculoChange}>
                {opcionesEstado.map(opt => (
                  <option key={opt.label} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div><label>Tipo combustible</label>
              <select className={inputClass} name="tipo_combustible" value={vehiculo.tipo_combustible} onChange={handleVehiculoChange}>
                {opcionesCombustible.map(opt => (
                  <option key={opt.label} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div><label>Kilometraje</label>
              <input className={inputClass} name="kilometraje" type="number" value={vehiculo.kilometraje} onChange={handleVehiculoChange} />
            </div>
            <div><label>Color</label>
              <select className={inputClass} name="color" value={vehiculo.color} onChange={handleVehiculoChange}>
                {opcionesColor.map(opt => (
                  <option key={opt.label} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div><label>Transmisión</label>
              <select className={inputClass} name="transmision" value={vehiculo.transmision} onChange={handleVehiculoChange}>
                {opcionesTransmision.map(opt => (
                  <option key={opt.label} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div><label>Fecha último servicio</label>
              <input className={inputClass} name="fecha_ultimo_servicio" type="date" value={vehiculo.fecha_ultimo_servicio} onChange={handleVehiculoChange} />
            </div>
            <div><label>Imagen URL</label>
              <input className={inputClass} name="imagen_url" value={vehiculo.imagen_url} onChange={handleVehiculoChange} />
            </div>
            <div><label>Próximo servicio</label>
              <input className={inputClass} name="proximo_servicio" type="date" value={vehiculo.proximo_servicio} onChange={handleVehiculoChange} />
            </div>
            <div><label>Ficha técnica URL</label>
              <input className={inputClass} name="ficha_tecnica_url" value={vehiculo.ficha_tecnica_url} onChange={handleVehiculoChange} />
            </div>
            <div><label>Propietario nombre</label>
              <input className={inputClass} name="propietario_nombre" value={vehiculo.propietario_nombre} onChange={handleVehiculoChange} />
            </div>
            <div><label>Propietario DNI</label>
              <input className={inputClass} name="propietario_dni" value={vehiculo.propietario_dni} onChange={handleVehiculoChange} />
            </div>
            {/* Select batería si corresponde */}
            {mostrarBateria && (
              <div>
                <label>Estado batería (%)</label>
                <select className={inputClass} name="bateria_estado" value={vehiculo.bateria_estado} onChange={handleVehiculoChange}>
                  <option value="">Seleccione...</option>
                  {opcionesBateria.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            )}
            <div><label>Fecha entrega estimada</label>
              <input className={inputClass} name="fecha_entrega_estimada" type="date" value={vehiculo.fecha_entrega_estimada} onChange={handleVehiculoChange} />
            </div>
            <div><label>Umweltplakette</label>
              <select className={inputClass} name="umweltplakette" value={vehiculo.umweltplakette} onChange={handleVehiculoChange}>
                {opcionesUmwelt.map(opt => (
                  <option key={opt.label} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div><label>TÜV válido hasta</label>
              <input className={inputClass} name="tuv_valido_hasta" value={vehiculo.tuv_valido_hasta} onChange={handleVehiculoChange} placeholder="YYYY-MM" />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
