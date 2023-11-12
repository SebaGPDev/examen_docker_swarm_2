const soap = require("soap");
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");

// Conexión a la base de datos con Sequelize
const sequelize = new Sequelize("personas_db", "root", "2021", {
  host: "examen-servicios_mysql-service",
  dialect: "mysql",
});

// Definición del modelo (Asegúrate de que coincida con tu esquema de base de datos)
const Persona = sequelize.define(
  "Persona",
  {
    Apellido: DataTypes.STRING,
    Nombre: DataTypes.STRING,
    DNI: DataTypes.STRING,
  },
  {
    tableName: "personas",
    timestamps: false,
  }
);

const myService = {
  PersonasService: {
    PersonasPort: {
      GetPersonas: async function (args, callback) {
        try {
          const personas = await Persona.findAll();
          callback({
            result: JSON.stringify(personas),
          });
        } catch (error) {
          console.error(error);
          callback({
            result: "Error al obtener datos",
          });
        }
      },
    },
  },
};

const xml = require("fs").readFileSync("servicio.wsdl", "utf8");

const app = express();
app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);
app.use(cors());
app.listen(8888, function () {
  soap.listen(app, "/consultar_con_soap", myService, xml);
  console.log("Servidor SOAP corriendo en el puerto 8888");
});
