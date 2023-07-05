// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const ctrlReservas = require("../controllers/reserva.controllers");

const router = require("express").Router();

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas
router.get("/", ctrlReservas.indexView);
// Formulario para crear una reserva
router.get("/reservas/create", ctrlReservas.createView);

// Formulario para actualizar una reserva
router.get("/reservas/:id/edit", ctrlReservas.editView);

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get("/api/reservas", ctrlReservas.index);

// Crear una reserva
router.post("/api/reservas", ctrlReservas.store);

// obtener una reserva
router.get("/api/reservas/:id", ctrlReservas.show);

// Actualizar una reserva
router.put("/api/reservas/:id", ctrlReservas.update);

// Eliminar una reserva de forma lógica
router.delete("/api/reservas/:id", ctrlReservas.destroy);

module.exports = router;
