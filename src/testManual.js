const { obtenerHorarios } = require("./services/horarios.service");

async function test() {
  const data = await obtenerHorarios();
  console.log(data);
}

test();