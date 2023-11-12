const express = require("express");
const { Sequelize, Model, DataTypes } = require("sequelize");
const cors = require("cors")

// Inicializar Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || "personas_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "2021",
  {
    host: process.env.DB_HOST || "examen-servicios_mysql-service",
    dialect: "mysql",
  }
);

// Definir el modelo Persona
class Persona extends Model {}

Persona.init(
  {
    Apellido: DataTypes.STRING,
    Nombre: DataTypes.STRING,
    DNI: DataTypes.STRING,
  },
  { sequelize, modelName: "Persona", tableName: "personas", timestamps: false }
);

// Esperar a que Sequelize sincronice el modelo con la base de datos
sequelize
  .authenticate()
  .then(() => console.log('Conexión establecida con la base de datos.'))
  .then(() => sequelize.sync())
  .then(() => {
    console.log("Modelo sincronizado con la base de datos.");

    const app = express();
    app.use(express.json());
    app.use(cors())

    // Endpoint para insertar una persona utilizando Sequelize
    app.post("/insertar_con_rest", async (req, res) => {
      try {
        const { Apellido, Nombre, DNI } = req.body;
        if (!Apellido || !Nombre || !DNI) {
          return res.status(400).send({ message: "Todos los campos son requeridos." });
        }
        
        const nuevaPersona = await Persona.create({ Apellido, Nombre, DNI });
        return res.status(201).send({ message: "Persona insertada", persona: nuevaPersona });
      } catch (err) {
        console.error('Error al insertar en la base de datos:', err);
        return res.status(500).send({ message: "Error al insertar datos", error: err });
      }
    });

    // Puerto donde se ejecutará el servidor
    const port = process.env.PORT || 8080;

    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar con la base de datos:", err);
  });
