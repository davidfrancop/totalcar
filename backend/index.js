// ========================
// Archivo: backend/index.js
// ========================
const app = require("./app");
const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Backend TotalCar escuchando en puerto", PORT, "y en todas las interfaces (0.0.0.0)");
});

