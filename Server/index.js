require("dotenv").config();
const express = require("express");
const massive = require("massive");
const controller = require("./controller");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

app.use(express.json());

// * ENDPOINTS * //
app.post("/api/products", controller.create);
app.get("/api/products", controller.getAll);
app.get("/api/products/:id", controller.getOne);
app.put("/api/products/:id", controller.update);
app.delete("/api/products/:id", controller.delete);

app.listen(SERVER_PORT, () => {
  console.log(`welcome to the ${SERVER_PORT} party `);
});