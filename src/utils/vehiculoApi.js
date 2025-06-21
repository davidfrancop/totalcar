// ========================
// Archivo: src/utils/vehiculoApi.js
// ========================

import axios from "axios";

const BACKEND = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

/**
 * GET /marcas → [ "ford", "bmw", ... ]
 */
export async function getMarcas() {
  try {
    const { data } = await BACKEND.get("/marcas");
    return data;
  } catch (err) {
    console.error("Error en getMarcas:", err);
    throw err;
  }
}

/**
 * GET /modelos?marca={marca} → [ "fiesta", "focus", ... ]
 */
export async function getModelos(marca) {
  try {
    const { data } = await BACKEND.get("/modelos", {
      params: { marca }
    });
    return data;
  } catch (err) {
    console.error(`Error en getModelos("${marca}"):`, err);
    throw err;
  }
}

/**
 * GET /anios → [ "2025", "2024", ... ]
 */
export async function getAnios() {
  try {
    const { data } = await BACKEND.get("/anios");
    return data;
  } catch (err) {
    console.error("Error en getAnios:", err);
    throw err;
  }
}
