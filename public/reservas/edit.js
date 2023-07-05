// Funcion para obtener los datos de la tarea cuando se carga la página
const updateReservaForm = document.querySelector("#updateReservaForm");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado");

  const reservaId = updateReservaForm.dataset.id;

  try {
    const response = await fetch(
      `http://localhost:4660/api/reservas/${reservaId}`
    );

    // Si hubo un error al obtener los datos de un usuario
    if (!response.ok) {
      throw {
        message: "Error al obtener datos de la reserva",
      };
    }

    // Se obtienen los datos de la respuesta (fetch)
    const { nombre, codigo, fecha } = await response.json();

    const inputnombre = document.querySelector("#nombre");
    const inputcodigo = document.querySelector("#codigo");
    const inputfecha = document.querySelector("#fecha");

    inputnombre.value = nombre;
    inputcodigo.value = codigo;
    inputfecha.value = fecha;
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});

updateReservaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const reservaId = updateReservaForm.dataset.id;

  const formData = {
    nombre: e.target.nombree.value,
    codigo: e.target.codigo.value,
    fecha: e.target.fecha.value,
  };

  try {
    const response = await fetch(
      `http://localhost:4660/api/reservas/${reservaId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const respToJson = await response.json();

    console.log(respToJson);

    if (response.status !== 201 && response.status !== 200) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: respToJson.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Reserva se editó Correctamente",
      text: respToJson.message,
    });

    updateReservaForm.reset();

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.message,
      timer: 2000,
    });
  }
});
