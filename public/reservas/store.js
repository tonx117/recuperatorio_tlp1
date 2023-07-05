const newReservaForm = document.querySelector("#newReservaForm");

newReservaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const codigo = document.querySelector("#codigo").value;
  const fecha = document.querySelector("#fecha").value;

  const response = await fetch("http://localhost:4660/api/reservas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      codigo,
      fecha,
    }),
  });

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
    title: "Reserva creada Correctamente",
    text: respToJson.message,
  });

  newReservaForm.reset();

  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
});
