# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# ESTRUCTURA TOTALCAR

total-car/
│
├── .env                      # Variables de entorno frontend
├── .gitignore                # Archivos que Git no debe subir
├── index.html                # HTML principal de Vite
├── package.json              # Configuración y scripts del frontend
├── postcss.config.js         # Configuración PostCSS para Tailwind
├── tailwind.config.js        # Configuración Tailwind CSS
├── vite.config.js            # Configuración de Vite
├── README.md                 # Documentación del proyecto
│
├── backend/                  # 🔧 Servidor Express + PostgreSQL
│   ├── index.js              # Punto de entrada del backend (Express)
│   ├── db/
│   │   ├── pool.js
│   │   └── setup.js          # Script opcional para crear las tablas (por código)
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   ├── rutas/
│   │   ├── clientes.js       # Endpoints: GET, POST, PUT de clientes
│   │   ├── vehiculos.js      # Endpoints de vehículos
│   │   ├── ordenes.js        # Endpoints de ordenes
│   │   ├── login.js          # Login con verificación de contraseña
│   │   └── usuarios.js       # Crear/editar usuarios (admin)
│   │
│   ├── modelos/              # Definiciones SQL o esquemas de tablas
│   │   ├── citas.js
│   │   ├── clientes.js
│   │   ├── empleados.js
│   │   ├── empresas.js
│   │   ├── factura_detalles.js
│   │   ├── facturas.js
│   │   ├── historial_servicios.js
│   │   ├── index.js
│   │   ├── ordenes_trabajo.js
│   │   ├── usuarios.js
│   │   └── vehiculos.js
│   │
│   ├── controladores/        # Lógica separada de las rutas
│   │    ├── clientesController.js     → funciones para registrar y obtener clientes
│   │    ├── usuariosController.js     → funciones para listar usuarios
│   │    ├── vehiculosController.js    → funciones para obtener vehículos
│   │    └── loginController.js        → función para login y generar token
│   │
│   ├── package.json          # Configuración del backend (bcrypt, pg, etc.)
│   └── node_modules/
│
├── public/                   # 🌍 Recursos públicos
│   ├── favicon.ico
│   ├── vite.svg
│   └── img/                  # Imágenes de promociones, autos, etc.
│
└── src/                      # ⚛️ Aplicación React
    ├── App.jsx               # Rutas principales
    ├── main.jsx              # Punto de entrada (ReactDOM)
    ├── App.css               # Estilos globales personalizados
    ├── index.css             # Estilos de Tailwind
    │
    ├── data/
    │   ├── clientes.js
    │   └── usuarios.js
    │
    ├── assets/               # Logos, imágenes, íconos
    │
    ├── components/           # Componentes reutilizables
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── BannerPromocion.jsx
    │   ├── Logo.jsx
    │   ├── ServicioCard.jsx
    │   └── RutaProtegida.jsx # Autenticación por rol
    │
    ├── pages/                # Páginas completas
    │   ├── Inicio.jsx
    │   ├── Servicios.jsx
    │   ├── Promociones.jsx
    │   ├── Nosotros.jsx
    │   ├── Contacto.jsx
    │   ├── AdminLogin.jsx
    │   ├── AdminDashboard.jsx
    │   ├── AdminClientes.jsx
    │   ├── AdminUsuarios.jsx
    │   ├── AdminVehiculos.jsx
    │   ├── CrearCliente.jsx
    │   ├── CrearOrdenTrabajo.jsx    
    │   ├── CrearUsuario.jsx
    │   ├── CrearVehiculo.jsx
    │   ├── EditarClienteVehiculos.jsx
    │   ├── AdminOrdenes.jsx
    │   └── VehiculoDetalle.jsx
    │
    └── utils/
        └── auth.js

