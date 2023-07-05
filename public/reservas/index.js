const listadoReservas = document.querySelector("#listadoReservas");

const fetchReservas = async () => {
  const response = await fetch("http://localhost:4660/api/reservas");

  if (response.status === 404) {
    return [];
  }

  const data = await response.json();
  return data;
};

const showReservas = (reservas) => {
  if (reservas.length === 0) {
    listadoReservas.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay reservas registradas aún.</td>
        </tr>
    `;
    return;
  }
  const tabla = document.querySelector("#listadoReservas");
  tabla.innerHTML = reservas
    .map((reserva) => {

      return `
          <tr>
              <th scope="row">${reserva.id}</th>
              <td>${reserva.nombre}</td>
              <td>${reserva.codigo}</td>
              <td>${dayjs(reserva.fecha).format("DD/MM/YYYY  HH:mm")}</td>
                <a href="/reservas/${reserva.id}/edit" class="btn btn-outline-success">Editar</a>
                <button onclick="deleteReserva(event)" class="btn btn-outline-danger" data-id="${reserva.id}">Eliminar</button>
              </td>
          </tr>
      `;
    })
    .join("");
};

const deleteReserva = async (event) => {
  const id = event.target.dataset.id;

  Swal.fire({
    title: "Estás seguro?",
    text: "Estás por eliminar una reserva del sistema!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Estoy seguro!",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:4660/api/reservas/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        Swal.fire({
          icon: "success",
          title: "Reserva eliminada",
          text: data.message,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2200);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al eliminar la reserva",
        });
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const reservas = await fetchReservas();
    return showReservas(reservas);
  } catch (error) {
    
console.log(error);
  }
});
