# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# ESTRUCTURA TOTALCAR

total-car/
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
│   │   └── setup.js          # Script opcional para crear las tablas (por código)
│   ├── rutas/
│   │   ├── clientes.js       # Endpoints: GET, POST, PUT de clientes
│   │   ├── vehiculos.js      # Endpoints de vehículos
│   │   ├── login.js          # Login con verificación de contraseña
│   │   └── usuarios.js       # Crear/editar usuarios (admin)
│   ├── modelos/ (opcional)   # Definiciones SQL o esquemas de tablas
│   ├── controladores/ (opcional) # Lógica separada de las rutas
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
    ├── assets/               # Logos, imágenes, íconos
    ├── components/           # Componentes reutilizables
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   └── RutaProtegida.jsx # Autenticación por rol
    │
    ├── pages/                # Páginas completas
    │   ├── Inicio.jsx
    │   ├── Servicios.jsx
    │   ├── Promociones.jsx
    │   ├── Nosotros.jsx
    │   ├── Contacto.jsx
    │   ├── AdminLogin.jsx
    │   ├── AdminClientes.jsx
    │   ├── EditarClienteVehiculos.jsx
    │   ├── CrearClienteVehiculo.jsx
    │   ├── CrearUsuario.jsx
    │   └── AdminUsuarios.jsx
    │
    ├── utils/                # Funciones auxiliares
    │   └── auth.js           # Validación de token, roles, logout
    │
    └── data/ (opcional)      # Datos estáticos, mocks o listas locales
