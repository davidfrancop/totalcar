// Archivo: src/pages/RegistrarVehiculo.jsx
import { useState } from 'react';

export default function RegistrarVehiculo() {
  const [vehiculo, setVehiculo] = useState({
    id_cliente: '',
    matricula: '',
    marca: '',
    modelo: '',
    anio: '',
    vin: '',
    codigo_vehiculo_ale: '',
    fecha_alta: '',
    fecha_ingreso_taller: '',
    notas: '',
    estado: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://localhost:4000/vehiculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehiculo),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Vehículo registrado correctamente');
        setVehiculo({});
      } else {
        setMensaje(data.error || 'Error al registrar el vehículo');
      }
    } catch (error) {
      setMensaje('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      {/* .src/pages/RegistrarVehiculo.jsx */}
      <h2 className="text-2xl font-bold mb-6">Registrar Vehículo</h2>
      {mensaje && <p className="mb-4 text-red-500">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Campos de ejemplo */}
        <input name="id_cliente" placeholder="ID Cliente" value={vehiculo.id_cliente || ''} onChange={handleChange} className="input" />
        <input name="matricula" placeholder="Matrícula" value={vehiculo.matricula || ''} onChange={handleChange} className="input" />
        <input name="marca" placeholder="Marca" value={vehiculo.marca || ''} onChange={handleChange} className="input" />
        <input name="modelo" placeholder="Modelo" value={vehiculo.modelo || ''} onChange={handleChange} className="input" />
        <input name="anio" placeholder="Año" type="number" value={vehiculo.anio || ''} onChange={handleChange} className="input" />
        <input name="vin" placeholder="VIN" value={vehiculo.vin || ''} onChange={handleChange} className="input" />
        <input name="codigo_vehiculo_ale" placeholder="Código vehículo (Alemania)" value={vehiculo.codigo_vehiculo_ale || ''} onChange={handleChange} className="input" />
        <input name="tipo_combustible" placeholder="Combustible" value={vehiculo.tipo_combustible || ''} onChange={handleChange} className="input" />
        <input name="kilometraje" placeholder="Kilometraje" type="number" value={vehiculo.kilometraje || ''} onChange={handleChange} className="input" />
        <input name="color" placeholder="Color" value={vehiculo.color || ''} onChange={handleChange} className="input" />
        <input name="transmision" placeholder="Transmisión" value={vehiculo.transmision || ''} onChange={handleChange} className="input" />
        <input name="bateria_estado" placeholder="Estado batería" value={vehiculo.bateria_estado || ''} onChange={handleChange} className="input" />
        <input name="estado" placeholder="Estado del vehículo" value={vehiculo.estado || ''} onChange={handleChange} className="input" />
        <input name="ubicacion_actual" placeholder="Ubicación actual" value={vehiculo.ubicacion_actual || ''} onChange={handleChange} className="input" />
        <input name="imagen_url" placeholder="URL imagen" value={vehiculo.imagen_url || ''} onChange={handleChange} className="input" />
        <input name="ficha_tecnica_url" placeholder="URL ficha técnica" value={vehiculo.ficha_tecnica_url || ''} onChange={handleChange} className="input" />
        <input name="propietario_nombre" placeholder="Nombre del propietario" value={vehiculo.propietario_nombre || ''} onChange={handleChange} className="input" />
        <input name="propietario_dni" placeholder="DNI del propietario" value={vehiculo.propietario_dni || ''} onChange={handleChange} className="input" />
        <input name="hsn_tsn" placeholder="HSN/TSN" value={vehiculo.hsn_tsn || ''} onChange={handleChange} className="input" />
        <input name="umweltplakette" placeholder="Etiqueta ambiental" value={vehiculo.umweltplakette || ''} onChange={handleChange} className="input" />

        {/* Fechas */}
        <input name="fecha_alta" type="date" value={vehiculo.fecha_alta || ''} onChange={handleChange} className="input" />
        <input name="fecha_ingreso_taller" type="date" value={vehiculo.fecha_ingreso_taller || ''} onChange={handleChange} className="input" />
        <input name="fecha_ultimo_servicio" type="date" value={vehiculo.fecha_ultimo_servicio || ''} onChange={handleChange} className="input" />
        <input name="proximo_servicio" type="date" value={vehiculo.proximo_servicio || ''} onChange={handleChange} className="input" />
        <input name="revision_tecnica_fecha" type="date" value={vehiculo.revision_tecnica_fecha || ''} onChange={handleChange} className="input" />
        <input name="tuv_valido_hasta" type="date" value={vehiculo.tuv_valido_hasta || ''} onChange={handleChange} className="input" />
        <input name="fecha_entrega_estimada" type="date" value={vehiculo.fecha_entrega_estimada || ''} onChange={handleChange} className="input" />

        {/* Notas */}
        <textarea name="notas" placeholder="Notas" value={vehiculo.notas || ''} onChange={handleChange} className="input col-span-2" />

        <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2">
          Registrar Vehículo
        </button>
      </form>
    </div>
  );
}
