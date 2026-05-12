const createApp = require("./src/bootstrap/createApp");
const { PORT } = require("./src/config");

const app = createApp();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;