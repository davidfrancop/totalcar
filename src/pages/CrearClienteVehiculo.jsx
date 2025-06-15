// Archivo: src/pages/CrearClienteVehiculo.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearClienteVehiculo() {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    ciudad: '',
    pais: '',
    email: '',
    telefono_oficina: '',
    telefono_casa: '',
    telefono_movil: '',
    fecha_nacimiento: '',
    notas: '',
    empresa: false,
    nombre_empresa: '',
    estado: 'activo',
  });

  const [vehiculo, setVehiculo] = useState({
    matricula: '',
    marca: '',
    modelo: '',
    anio: '',
    vin: '',
    codigo_vehiculo_ale: '',
    fecha_alta: '',
    fecha_ingreso_taller: '',
    notas: '',
    estado: 'activo',
    tipo_combustible: '',
    kilometraje: '',
    color: '',
    transmision: '',
    fecha_ultimo_servicio: '',
    imagen_url: '',
    proximo_servicio: '',
    ficha_tecnica_url: '',
    hsn_tsn: '',
    revision_tecnica_fecha: '',
    propietario_nombre: '',
    propietario_dni: '',
    bateria_estado: '',
    ubicacion_actual: '',
    fecha_entrega_estimada: '',
    umweltplakette: '',
    tuv_valido_hasta: '',
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleClienteChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleVehiculoChange = (e) => {
    const { name, value } = e.target;
    setVehiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://localhost:4000/cliente-con-vehiculo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente, vehiculo }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Cliente y vehículo registrados con éxito');
        setCliente({});
        setVehiculo({});
      } else {
        setMensaje(data.error || '❌ Error al registrar');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('❌ Error en la conexión con el servidor');
    }
  };

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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cliente */}
        <fieldset className="col-span-2 border p-4 rounded">
          <legend className="font-semibold text-lg mb-2">🧑 Datos del Cliente</legend>
          <input name="nombre" placeholder="Nombre" value={cliente.nombre || ''} onChange={handleClienteChange} className="input" />
          <input name="apellido" placeholder="Apellido" value={cliente.apellido || ''} onChange={handleClienteChange} className="input" />
          <input name="dni" placeholder="DNI" value={cliente.dni || ''} onChange={handleClienteChange} className="input" />
          <input name="direccion" placeholder="Dirección" value={cliente.direccion || ''} onChange={handleClienteChange} className="input" />
          <input name="ciudad" placeholder="Ciudad" value={cliente.ciudad || ''} onChange={handleClienteChange} className="input" />
          <input name="pais" placeholder="País" value={cliente.pais || ''} onChange={handleClienteChange} className="input" />
          <input name="email" type="email" placeholder="Email" value={cliente.email || ''} onChange={handleClienteChange} className="input" />
          <input name="telefono_movil" placeholder="Teléfono móvil" value={cliente.telefono_movil || ''} onChange={handleClienteChange} className="input" />
          <input name="telefono_casa" placeholder="Teléfono casa" value={cliente.telefono_casa || ''} onChange={handleClienteChange} className="input" />
          <input name="telefono_oficina" placeholder="Teléfono oficina" value={cliente.telefono_oficina || ''} onChange={handleClienteChange} className="input" />
          <input name="fecha_nacimiento" type="date" value={cliente.fecha_nacimiento || ''} onChange={handleClienteChange} className="input" />
          <textarea name="notas" placeholder="Notas" value={cliente.notas || ''} onChange={handleClienteChange} className="input col-span-2" />
          <label className="col-span-2">
            <input type="checkbox" name="empresa" checked={cliente.empresa || false} onChange={handleClienteChange} className="mr-2" />
            ¿Es empresa?
          </label>
          <input name="nombre_empresa" placeholder="Nombre empresa" value={cliente.nombre_empresa || ''} onChange={handleClienteChange} className="input" />
        </fieldset>

        {/* Vehículo */}
        <fieldset className="col-span-2 border p-4 rounded">
          <legend className="font-semibold text-lg mb-2">🚗 Datos del Vehículo</legend>
          <input name="matricula" placeholder="Matrícula" value={vehiculo.matricula || ''} onChange={handleVehiculoChange} className="input" />
          <input name="marca" placeholder="Marca" value={vehiculo.marca || ''} onChange={handleVehiculoChange} className="input" />
          <input name="modelo" placeholder="Modelo" value={vehiculo.modelo || ''} onChange={handleVehiculoChange} className="input" />
          <input name="anio" type="number" placeholder="Año" value={vehiculo.anio || ''} onChange={handleVehiculoChange} className="input" />
          <input name="vin" placeholder="VIN" value={vehiculo.vin || ''} onChange={handleVehiculoChange} className="input" />
          <input name="codigo_vehiculo_ale" placeholder="Código vehículo (Alemania)" value={vehiculo.codigo_vehiculo_ale || ''} onChange={handleVehiculoChange} className="input" />
          <input name="tipo_combustible" placeholder="Tipo de combustible" value={vehiculo.tipo_combustible || ''} onChange={handleVehiculoChange} className="input" />
          <input name="kilometraje" type="number" placeholder="Kilometraje" value={vehiculo.kilometraje || ''} onChange={handleVehiculoChange} className="input" />
          <input name="color" placeholder="Color" value={vehiculo.color || ''} onChange={handleVehiculoChange} className="input" />
          <input name="transmision" placeholder="Transmisión" value={vehiculo.transmision || ''} onChange={handleVehiculoChange} className="input" />
          <input name="estado" placeholder="Estado del vehículo" value={vehiculo.estado || ''} onChange={handleVehiculoChange} className="input" />
          <input name="bateria_estado" placeholder="Estado batería" value={vehiculo.bateria_estado || ''} onChange={handleVehiculoChange} className="input" />
          <input name="ubicacion_actual" placeholder="Ubicación actual" value={vehiculo.ubicacion_actual || ''} onChange={handleVehiculoChange} className="input" />
          <input name="imagen_url" placeholder="URL imagen" value={vehiculo.imagen_url || ''} onChange={handleVehiculoChange} className="input" />
          <input name="ficha_tecnica_url" placeholder="URL ficha técnica" value={vehiculo.ficha_tecnica_url || ''} onChange={handleVehiculoChange} className="input" />
          <input name="propietario_nombre" placeholder="Propietario (si distinto del cliente)" value={vehiculo.propietario_nombre || ''} onChange={handleVehiculoChange} className="input" />
          <input name="propietario_dni" placeholder="DNI propietario" value={vehiculo.propietario_dni || ''} onChange={handleVehiculoChange} className="input" />
          <input name="hsn_tsn" placeholder="HSN/TSN" value={vehiculo.hsn_tsn || ''} onChange={handleVehiculoChange} className="input" />
          <input name="umweltplakette" placeholder="Etiqueta ambiental" value={vehiculo.umweltplakette || ''} onChange={handleVehiculoChange} className="input" />

          {/* Fechas */}
          <input name="fecha_alta" type="date" value={vehiculo.fecha_alta || ''} onChange={handleVehiculoChange} className="input" />
          <input name="fecha_ingreso_taller" type="date" value={vehiculo.fecha_ingreso_taller || ''} onChange={handleVehiculoChange} className="input" />
          <input name="fecha_ultimo_servicio" type="date" value={vehiculo.fecha_ultimo_servicio || ''} onChange={handleVehiculoChange} className="input" />
          <input name="proximo_servicio" type="date" value={vehiculo.proximo_servicio || ''} onChange={handleVehiculoChange} className="input" />
          <input name="revision_tecnica_fecha" type="date" value={vehiculo.revision_tecnica_fecha || ''} onChange={handleVehiculoChange} className="input" />
          <input name="tuv_valido_hasta" type="date" value={vehiculo.tuv_valido_hasta || ''} onChange={handleVehiculoChange} className="input" />
          <input name="fecha_entrega_estimada" type="date" value={vehiculo.fecha_entrega_estimada || ''} onChange={handleVehiculoChange} className="input" />

          <textarea name="notas" placeholder="Notas del vehículo" value={vehiculo.notas || ''} onChange={handleVehiculoChange} className="input col-span-2" />
        </fieldset>

        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Registrar Cliente y Vehículo
        </button>
      </form>
    </div>
  );
}
