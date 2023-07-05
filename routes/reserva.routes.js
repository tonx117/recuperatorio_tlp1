// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const ctrlReservas = require("../controllers/reserva.controllers");

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas
// Formulario para crear una reserva
// Formulario para actualizar una reserva

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
