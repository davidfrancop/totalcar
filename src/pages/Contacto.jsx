// src/pages/Contacto.jsx
export default function Contacto() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-totalcar-azul mb-8">
        Contáctanos
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulario */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-totalcar-azul"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-totalcar-azul"
          />
          <textarea
            rows="5"
            placeholder="Mensaje"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-totalcar-azul"
          ></textarea>
          <button
            type="submit"
            className="bg-totalcar-naranja text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Enviar mensaje
          </button>
        </form>

        {/* Información de contacto */}
        <div className="space-y-4 text-totalcar-grafito text-lg">
          <p><strong>Teléfono:</strong> +49 123 456 7890</p>
          <p><strong>Correo:</strong> contacto@totalcar.com</p>
          <p><strong>Dirección:</strong> Calle Ejemplo 123, Berlín, Alemania</p>
          <p><strong>Horario:</strong> Lunes a viernes de 9:00 a 18:00</p>

          {/* Mapa */}
          <div className="mt-4">
            <iframe
              className="w-full h-60 rounded-lg border"
              src="https://www.google.com/maps/embed?pb=!1m18!..." // reemplazar con tu ubicación real
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
